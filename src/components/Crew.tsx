"use client";

/**
 * "Crew" — a swarm of 10 named multiplayer cursors that rebuilds the page,
 * inspired by the Swarm Rebuild extension (adapted from Joel Califa's Swarm).
 *
 * Elements start blank. When one needs to appear, it is broken into build ops
 * and the swarm works through them top-down, each cursor using the right tool:
 *   box   – crosshair drags a frame top-left → bottom-right, fill appears
 *   type  – I-beam types text out left → right
 *   pen   – pen tool draws hairlines / rules
 *   dup   – repeated siblings: a cursor alt-drags a copy of the first one
 * Cursors live behind the quick-menu bell: they fly out of it to build and fly
 * back into it afterwards. Finished elements are marked on
 * the DOM node itself so they can never replay.
 *
 * Imperative rAF engine (no per-frame React state).
 */

import { useEffect, useRef } from "react";

const PEERS = [
  { name: "Claude", color: "#d97757" },
  { name: "Aarav", color: "#18a0fb" },
  { name: "Maya", color: "#0acf83" },
  { name: "Kabir", color: "#ff3d77" },
  { name: "Zoya", color: "#f5b400" },
  { name: "Neel", color: "#a259ff" },
  { name: "Ira", color: "#00c2c7" },
  { name: "Dev", color: "#ff7a1a" },
  { name: "Sana", color: "#7ed957" },
  { name: "Tara", color: "#e879f9" },
];

const EDGE = 24; // keep cursors this far inside the viewport
const PAD = 4;
const MAX_OPS = 40;
const MAX_WORKERS = 4; // cursors that may work on one element at once

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/* ------------------------------ public API ------------------------------ */

type Job = { el: HTMLElement; readyAt: number };

let enqueue: ((job: Job) => void) | null = null;
const pending: Job[] = [];
const seen = new WeakSet<HTMLElement>();

function revealNow(el: HTMLElement) {
  el.style.clipPath = "";
  el.style.transition = "";
  el.removeAttribute("data-crew");
  el.removeAttribute("data-crew-busy");
}

/** True when an ancestor is still masked — its build will reveal this too. */
const insideHidden = (el: HTMLElement) =>
  !!el.parentElement?.closest('[data-crew="hidden"]');

export function requestReveal(el: HTMLElement, delay = 0) {
  // Guard lives on the DOM node (not just module memory) so Fast Refresh /
  // StrictMode re-runs can never replay an element that's already visible.
  if (seen.has(el)) return;
  seen.add(el);
  if (el.getAttribute("data-crew") !== "hidden") return;
  if (el.hasAttribute("data-crew-busy")) return;
  el.setAttribute("data-crew-busy", "");

  if (insideHidden(el) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealNow(el);
    return;
  }
  const job = { el, readyAt: performance.now() + delay * 1000 };
  if (enqueue) enqueue(job);
  else {
    pending.push(job);
    // overlay never mounted — don't leave the element hidden forever
    setTimeout(() => {
      if (!enqueue && pending.includes(job)) {
        pending.splice(pending.indexOf(job), 1);
        revealNow(el);
      }
    }, 3000 + delay * 1000);
  }
}

/** Build an element via the swarm on scroll-in (`view`) or after a delay (`mount`). */
export function useCrewReveal<T extends HTMLElement>(
  delay = 0,
  trigger: "view" | "mount" = "view",
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (trigger === "mount") {
      requestReveal(el, delay);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          requestReveal(el, delay);
        }
      },
      { rootMargin: "-8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, trigger]);
  return ref;
}

/* ------------------------------ build model ------------------------------ */

type Rect = { x: number; y: number; w: number; h: number };

type Op = {
  kind: "box" | "type" | "pen" | "dup";
  r: Rect; // bounds, relative to the element's top-left
  lines: Rect[]; // type: one rect per text line
  total: number; // type: summed line widths
  master?: Rect; // dup: the rect being copied
  deps?: Op[]; // dup: master ops that must finish first
  p: number; // 0..1 progress of what is revealed
  claimed: boolean;
  done: boolean;
};

type Build = {
  el: HTMLElement;
  ops: Op[];
  remaining: number;
  workers: number;
  finished: boolean;
  paused: Animation[]; // looping CSS animations held still while building
};

type Task = {
  build: Build;
  op: Op;
  phase: "travel" | "act" | "drop" | "wait";
  t: number;
  fromX: number;
  fromY: number;
  dur: number;
};

type Agent = {
  x: number;
  y: number;
  opacity: number;
  idleSince: number;
  task: Task | null;
  cursor: HTMLDivElement;
  frame: HTMLDivElement;
  size: HTMLSpanElement;
};

/* ------------------- turning an element into build ops -------------------- */

const REPLACED = new Set([
  "IMG", "SVG", "CANVAS", "VIDEO", "PICTURE", "IFRAME",
  "INPUT", "TEXTAREA", "BUTTON", "SELECT",
]);

function hasChrome(cs: CSSStyleDeclaration) {
  const bg = cs.backgroundColor;
  return (
    (bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") ||
    cs.backgroundImage !== "none" ||
    parseFloat(cs.borderTopWidth) > 0 ||
    parseFloat(cs.borderBottomWidth) > 0 ||
    parseFloat(cs.borderLeftWidth) > 0 ||
    cs.boxShadow !== "none"
  );
}

/** One DOMRect per visual line of text inside `el`. */
function textLines(el: Element): DOMRect[] {
  const range = document.createRange();
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const words: DOMRect[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const text = n.textContent ?? "";
    const re = /\S+/g;
    for (let m = re.exec(text); m; m = re.exec(text)) {
      range.setStart(n, m.index);
      range.setEnd(n, m.index + m[0].length);
      for (const r of range.getClientRects())
        if (r.width > 1 && r.height > 1) words.push(r);
    }
  }
  words.sort((a, b) => a.top - b.top || a.left - b.left);
  const lines: DOMRect[] = [];
  let cur: { l: number; t: number; r: number; b: number } | null = null;
  const flush = () =>
    cur && lines.push(new DOMRect(cur.l, cur.t, cur.r - cur.l, cur.b - cur.t));
  for (const w of words) {
    if (cur && Math.abs(w.top - cur.t) < w.height * 0.5) {
      cur.l = Math.min(cur.l, w.left);
      cur.r = Math.max(cur.r, w.right);
      cur.b = Math.max(cur.b, w.bottom);
    } else {
      flush();
      cur = { l: w.left, t: w.top, r: w.right, b: w.bottom };
    }
  }
  flush();
  return lines;
}

function collectOps(root: HTMLElement): Op[] {
  const base = root.getBoundingClientRect();
  const rel = (r: DOMRect): Rect => ({
    x: r.left - base.left - PAD,
    y: r.top - base.top - PAD,
    w: r.width + PAD * 2,
    h: r.height + PAD * 2,
  });
  const make = (kind: Op["kind"], r: Rect, extra: Partial<Op> = {}): Op => ({
    kind,
    r,
    lines: [],
    total: 0,
    p: 0,
    claimed: false,
    done: false,
    ...extra,
  });

  const run = (maxDepth: number) => {
    const out: Op[] = [];
    const walk = (el: Element, depth: number, sink: Op[]) => {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return;
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      const tag = el.tagName.toUpperCase();

      // hairline → pen tool
      if (
        !REPLACED.has(tag) &&
        (r.width <= 3 || r.height <= 3) &&
        !el.children.length &&
        !(el.textContent ?? "").trim()
      ) {
        sink.push(make("pen", rel(r)));
        return;
      }
      // image / button / card → crosshair box
      if (REPLACED.has(tag) || hasChrome(cs)) {
        sink.push(make("box", rel(r)));
        return;
      }
      const kids = [...el.children];
      const inlineOnly = kids.every((k) =>
        getComputedStyle(k).display.startsWith("inline"),
      );
      // text → I-beam typing
      if (!kids.length || inlineOnly) {
        const lines = textLines(el).map(rel);
        if (lines.length) {
          const x = Math.min(...lines.map((l) => l.x));
          const y = Math.min(...lines.map((l) => l.y));
          sink.push(
            make(
              "type",
              {
                x,
                y,
                w: Math.max(...lines.map((l) => l.x + l.w)) - x,
                h: Math.max(...lines.map((l) => l.y + l.h)) - y,
              },
              { lines, total: lines.reduce((s, l) => s + l.w, 0) },
            ),
          );
        }
        kids.forEach((k) => {
          if (REPLACED.has(k.tagName.toUpperCase()))
            sink.push(make("box", rel(k.getBoundingClientRect())));
        });
        return;
      }
      if (depth >= maxDepth) {
        sink.push(make("box", rel(r)));
        return;
      }

      // repeated siblings → build the first, alt-drag copies of it
      const sig = (k: Element) => `${k.tagName}.${k.getAttribute("class") ?? ""}`;
      const groups = new Map<string, Element[]>();
      for (const k of kids) {
        const kr = k.getBoundingClientRect();
        if (kr.width * kr.height < 2500) continue;
        const s = sig(k);
        groups.set(s, [...(groups.get(s) ?? []), k]);
      }
      const copyOf = new Map<Element, Element>();
      groups.forEach((g) => {
        const m = g[0];
        const mr = m.getBoundingClientRect();
        const same = g.filter((k) => {
          const kr = k.getBoundingClientRect();
          return (
            Math.max(kr.height, mr.height) / Math.min(kr.height, mr.height) < 1.8 &&
            Math.max(kr.width, mr.width) / Math.min(kr.width, mr.width) < 1.6
          );
        });
        if (same.length >= 2) same.slice(1).forEach((k) => copyOf.set(k, m));
      });
      const masters = new Set(copyOf.values());
      const masterOps = new Map<Element, Op[]>();
      const masterRect = new Map<Element, Rect>();
      for (const k of kids) {
        const m = copyOf.get(k);
        if (m) {
          sink.push(
            make("dup", rel(k.getBoundingClientRect()), {
              master: masterRect.get(m),
              deps: masterOps.get(m) ?? [],
            }),
          );
        } else {
          const before = sink.length;
          walk(k, depth + 1, sink);
          if (masters.has(k)) {
            masterOps.set(k, sink.slice(before));
            masterRect.set(k, rel(k.getBoundingClientRect()));
          }
        }
      }
    };
    walk(root, 0, out);
    return out;
  };

  let ops: Op[] = [];
  for (let d = 5; d >= 1; d--) {
    ops = run(d);
    if (ops.length <= MAX_OPS) break;
  }
  if (!ops.length)
    ops = [make("box", { x: 0, y: 0, w: base.width, h: base.height })];
  // top-down, left → right
  ops.sort(
    (a, b) => Math.round(a.r.y / 14) - Math.round(b.r.y / 14) || a.r.x - b.r.x,
  );
  return ops;
}

/** How much of one op is currently revealed, as a path of rects. */
function opPath(o: Op): string {
  if (o.p <= 0) return "";
  const f = (x: number, y: number, w: number, h: number) =>
    `M${x} ${y}h${w}v${h}h${-w}z`;
  switch (o.kind) {
    case "box":
      return f(o.r.x, o.r.y, o.r.w * o.p, o.r.h * o.p);
    case "pen":
      return o.r.w >= o.r.h
        ? f(o.r.x, o.r.y, o.r.w * o.p, o.r.h)
        : f(o.r.x, o.r.y, o.r.w, o.r.h * o.p);
    case "dup":
      return f(o.r.x, o.r.y, o.r.w, o.r.h);
    case "type": {
      let rem = o.p * o.total;
      let d = "";
      for (const l of o.lines) {
        const w = Math.min(l.w, rem);
        if (w > 0) d += f(l.x, l.y, w, l.h);
        rem -= l.w;
      }
      return d;
    }
  }
}

function clipFor(b: Build): string {
  const d = b.ops.map(opPath).join("");
  return d ? `path("${d}")` : "inset(0 100% 100% 0)";
}

/** Where the typing caret is, relative to the element. */
function caretAt(o: Op) {
  let rem = o.p * o.total;
  for (const l of o.lines) {
    if (rem <= l.w) return { x: l.x + rem, y: l.y, h: l.h };
    rem -= l.w;
  }
  const l = o.lines[o.lines.length - 1];
  return { x: l.x + l.w, y: l.y, h: l.h };
}

/* -------------------------------- overlay -------------------------------- */

function Handle({ pos }: { pos: string }) {
  return (
    <span
      className={`absolute block size-[7px] bg-white ${pos}`}
      style={{ border: "1px solid var(--c)" }}
    />
  );
}

const tool = (c: string) => `tool ${c} absolute left-0 top-0`;

export default function CrewOverlay() {
  const cursors = useRef<(HTMLDivElement | null)[]>([]);
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const sizes = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pending.splice(0).forEach((j) => revealNow(j.el));
      enqueue = (j) => revealNow(j.el);
      return () => {
        enqueue = null;
      };
    }

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;
    const now0 = performance.now();
    /** The bell is home: cursors fly out of it and back behind it. */
    const home = () => {
      const r = document
        .querySelector("[data-crew-home]")
        ?.getBoundingClientRect();
      return r
        ? { x: r.left + r.width / 2, y: r.top + r.height / 2 }
        : { x: W() - 56, y: H() - 56 };
    };
    const h0 = home();

    const agents: Agent[] = PEERS.map((_, i) => ({
      x: h0.x,
      y: h0.y,
      opacity: 0,
      idleSince: now0,
      task: null,
      cursor: cursors.current[i]!,
      frame: frames.current[i]!,
      size: sizes.current[i]!,
    }));

    const builds: Build[] = [];
    const queue: Job[] = [];
    enqueue = (j) => queue.push(j);
    pending.splice(0).forEach((j) => queue.push(j));

    const finalize = (b: Build) => {
      b.finished = true;
      builds.splice(builds.indexOf(b), 1);
      b.paused.forEach((an) => an.play());
      // everything is drawn: drop the mask (lets glows / shadows through)
      b.el.style.clipPath = "inset(-120px)";
      setTimeout(() => revealNow(b.el), 300);
    };

    /** Screen point where a cursor should start working on `op`. */
    const startPoint = (b: Build, op: Op) => {
      const base = b.el.getBoundingClientRect();
      let x = op.r.x;
      let y = op.r.y;
      if (op.kind === "type") {
        x = op.lines[0].x;
        y = op.lines[0].y + op.lines[0].h / 2;
      } else if (op.kind === "pen") {
        if (op.r.w >= op.r.h) y = op.r.y + op.r.h / 2;
        else x = op.r.x + op.r.w / 2;
      } else if (op.kind === "dup" && op.master) {
        x = op.master.x + op.master.w / 2;
        y = op.master.y + op.master.h / 2;
      }
      return {
        x: clamp(base.left + x, EDGE, W() - EDGE),
        y: clamp(base.top + y, EDGE, H() - EDGE),
      };
    };

    const setTool = (a: Agent, t: string) => {
      a.cursor.dataset.tool = t;
    };

    const beginTravel = (a: Agent, now: number) => {
      const task = a.task!;
      const target = startPoint(task.build, task.op);
      task.phase = "travel";
      task.t = now;
      task.fromX = a.x;
      task.fromY = a.y;
      task.dur = clamp(240 + Math.hypot(a.x - target.x, a.y - target.y) * 0.45, 260, 1000);
      setTool(a, "arrow");
    };

    const complete = (a: Agent, now: number) => {
      const task = a.task!;
      const b = task.build;
      task.op.p = 1;
      task.op.done = true;
      b.remaining--;
      b.workers--;
      a.task = null;
      a.idleSince = now;
      a.frame.style.opacity = "0";
      setTool(a, "arrow");
      if (b.remaining <= 0 && !b.finished) finalize(b);
    };

    const claim = (a: Agent, now: number): boolean => {
      for (const b of builds) {
        if (b.finished || b.workers >= MAX_WORKERS) continue;
        const op = b.ops.find(
          (o) => !o.claimed && (!o.deps || o.deps.every((d) => d.done)),
        );
        if (!op) continue;
        op.claimed = true;
        b.workers++;
        a.task = { build: b, op, phase: "travel", t: now, fromX: a.x, fromY: a.y, dur: 400 };
        beginTravel(a, now);
        return true;
      }
      return false;
    };

    let last = now0;
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      /* intake: ready elements become builds */
      for (let q = queue.length - 1; q >= 0; q--) {
        const job = queue[q];
        if (job.readyAt > now) continue;
        if (!job.el.isConnected) {
          queue.splice(q, 1);
          continue;
        }
        if (job.el.getAttribute("data-crew") !== "hidden") {
          queue.splice(q, 1);
          continue;
        }
        if (insideHidden(job.el)) {
          queue.splice(q, 1);
          revealNow(job.el);
          continue;
        }
        const r = job.el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > H() || r.width < 2 || r.height < 2) {
          queue.splice(q, 1); // scrolled past / empty — just show it
          revealNow(job.el);
          continue;
        }
        queue.splice(q, 1);
        const ops = collectOps(job.el);
        const build: Build = {
          el: job.el,
          ops,
          remaining: ops.length,
          workers: 0,
          finished: false,
          paused: [],
        };
        // hold looping CSS animations (marquees, floaty) still so the pieces
        // we measured stay lined up while they are drawn
        if (typeof CSSAnimation !== "undefined") {
          job.el
            .getAnimations({ subtree: true })
            .filter(
              (an) =>
                an instanceof CSSAnimation &&
                an.effect?.getComputedTiming().iterations === Infinity &&
                an.playState === "running",
            )
            .forEach((an) => {
              an.pause();
              build.paused.push(an);
            });
        }
        // pieces fully off-screen sideways (scrolling rows) need no cursor
        for (const o of ops) {
          const left = r.left + o.r.x;
          if (left + o.r.w < -40 || left > W() + 40) {
            o.p = 1;
            o.claimed = true;
            o.done = true;
            build.remaining--;
          }
        }
        builds.push(build);
        job.el.style.clipPath = clipFor(build);
        if (build.remaining <= 0) finalize(build);
      }

      /* idle cursors pick up work; busy ones advance their op */
      for (let i = 0; i < agents.length; i++) {
        const a = agents[i];
        if (!a.task) claim(a, now);

        const task = a.task;
        if (!task) {
          /* idle: fly back behind the bell and vanish there */
          const hp = home();
          const jx = hp.x + Math.sin(i * 2.1) * 6;
          const jy = hp.y + Math.cos(i * 1.7) * 6;
          const k = 1 - Math.exp(-dt * (2.2 + (i % 4) * 0.5));
          a.x += (jx - a.x) * k;
          a.y += (jy - a.y) * k;
          const near = Math.hypot(a.x - hp.x, a.y - hp.y) < 26;
          a.opacity += ((near ? 0 : 1) - a.opacity) * (1 - Math.exp(-dt * 10));
        } else {
          const b = task.build;
          const op = task.op;
          const base = b.el.getBoundingClientRect();
          const f = a.frame.style;
          a.opacity += (1 - a.opacity) * (1 - Math.exp(-dt * 8));

          if (task.phase === "travel") {
            const p = clamp((now - task.t) / task.dur, 0, 1);
            const e = easeInOut(p);
            const s = startPoint(b, op);
            a.x = task.fromX + (s.x - task.fromX) * e;
            a.y = task.fromY + (s.y - task.fromY) * e;
            if (p >= 1) {
              task.phase = "act";
              task.t = now;
              if (op.kind === "box") {
                setTool(a, "cross");
                task.dur = clamp(380 + (op.r.w + op.r.h) * 0.35, 420, 1100);
                a.size.textContent = `${Math.round(op.r.w - PAD * 2)} × ${Math.round(op.r.h - PAD * 2)}`;
                f.borderStyle = "solid";
              } else if (op.kind === "type") {
                setTool(a, "ibeam");
                const chars = (op.total / 9) | 0;
                task.dur = clamp(chars * 16, 350, 1700);
              } else if (op.kind === "pen") {
                setTool(a, "pen");
                task.dur = clamp(250 + Math.max(op.r.w, op.r.h) * 0.5, 300, 900);
              } else {
                setTool(a, "dup");
                task.dur = 650;
                a.size.textContent = `${Math.round(op.r.w - PAD * 2)} × ${Math.round(op.r.h - PAD * 2)}`;
                f.borderStyle = "dashed";
              }
            }
          } else if (task.phase === "act") {
            const raw = clamp((now - task.t) / task.dur, 0, 1);

            if (op.kind === "box") {
              const p = easeOut(raw);
              op.p = p;
              const left = base.left + op.r.x;
              const top = base.top + op.r.y;
              a.x = clamp(left + op.r.w * p, EDGE, W() - EDGE);
              a.y = clamp(top + op.r.h * p, EDGE, H() - EDGE);
              f.opacity = "1";
              f.transform = `translate3d(${left}px,${top}px,0)`;
              f.width = `${op.r.w * p}px`;
              f.height = `${op.r.h * p}px`;
            } else if (op.kind === "type") {
              op.p = raw;
              const c = caretAt(op);
              a.x = clamp(base.left + c.x, EDGE, W() - EDGE);
              a.y = clamp(base.top + c.y + c.h / 2, EDGE, H() - EDGE);
            } else if (op.kind === "pen") {
              const p = easeInOut(raw);
              op.p = p;
              const horiz = op.r.w >= op.r.h;
              a.x = clamp(
                base.left + (horiz ? op.r.x + op.r.w * p : op.r.x + op.r.w / 2),
                EDGE,
                W() - EDGE,
              );
              a.y = clamp(
                base.top + (horiz ? op.r.y + op.r.h / 2 : op.r.y + op.r.h * p),
                EDGE,
                H() - EDGE,
              );
            } else {
              // alt-drag: carry a ghost copy from the master to its slot
              const m = op.master ?? op.r;
              const e = easeInOut(raw);
              const sx = m.x + m.w / 2;
              const sy = m.y + m.h / 2;
              const ex = op.r.x + op.r.w / 2;
              const ey = op.r.y + op.r.h / 2;
              const cx = sx + (ex - sx) * e;
              const cy = sy + (ey - sy) * e;
              const w = m.w + (op.r.w - m.w) * e;
              const h = m.h + (op.r.h - m.h) * e;
              a.x = clamp(base.left + cx, EDGE, W() - EDGE);
              a.y = clamp(base.top + cy, EDGE, H() - EDGE);
              f.opacity = "1";
              f.transform = `translate3d(${base.left + cx - w / 2}px,${base.top + cy - h / 2}px,0)`;
              f.width = `${w}px`;
              f.height = `${h}px`;
            }

            if (raw >= 1) {
              if (op.kind === "dup") {
                task.phase = "drop";
                task.t = now;
                op.p = 1; // copy lands: its region is revealed
              } else {
                op.p = 1;
                task.phase = "wait";
                task.t = now;
              }
            }
          } else if (task.phase === "drop") {
            const p = clamp((now - task.t) / 280, 0, 1);
            f.opacity = String(1 - p);
            if (p >= 1) {
              task.phase = "wait";
              task.t = now;
            }
          } else {
            // wait: brief beat so the work reads before the cursor moves on
            f.opacity = String(Math.max(0, parseFloat(f.opacity || "0") - dt * 6));
            if (now - task.t > (op.kind === "box" ? 260 : 140)) complete(a, now);
          }
        }

        a.cursor.style.transform = `translate3d(${a.x}px,${a.y}px,0)`;
        a.cursor.style.opacity = String(a.opacity < 0.02 ? 0 : a.opacity);
      }

      /* each element shows exactly what its ops have drawn so far */
      for (const b of builds) b.el.style.clipPath = clipFor(b);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      enqueue = null;
      // StrictMode / Fast Refresh re-run this effect: keep waiting jobs for the
      // next run instead of flashing them on screen; settle in-flight builds
      queue.splice(0).forEach((j) => pending.push(j));
      builds.slice().forEach((b) => {
        b.paused.forEach((an) => an.play());
        revealNow(b.el);
      });
      agents.forEach((a) => {
        a.frame.style.opacity = "0";
        a.cursor.style.opacity = "0";
      });
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[89] overflow-hidden"
    >
      {PEERS.map((p, i) => (
        <div key={p.name} style={{ "--c": p.color } as React.CSSProperties}>
          {/* crosshair frame / dup ghost */}
          <div
            ref={(n) => {
              frames.current[i] = n;
            }}
            className="absolute left-0 top-0 opacity-0"
            style={{
              border: "1px solid var(--c)",
              background: "color-mix(in srgb, var(--c) 8%, transparent)",
            }}
          >
            <Handle pos="-left-1 -top-1" />
            <Handle pos="-right-1 -top-1" />
            <Handle pos="-bottom-1 -left-1" />
            <Handle pos="-bottom-1 -right-1" />
            <span
              ref={(n) => {
                sizes.current[i] = n;
              }}
              className="absolute left-1/2 top-full mt-2 block -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-[3px] font-mono text-[10px] leading-none text-white"
              style={{ background: "var(--c)" }}
            />
          </div>

          {/* the cursor — its shape follows the tool in use (see globals.css) */}
          <div
            ref={(n) => {
              cursors.current[i] = n;
            }}
            data-tool="arrow"
            className="crew-cur absolute left-0 top-0 opacity-0 will-change-transform"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" className={tool("t-arrow") + " -translate-x-[2px] -translate-y-[1px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"}>
              <path d="M2 1.5 15 8l-5.6 1.7L7.6 15.5 2 1.5Z" fill="var(--c)" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            <svg width="20" height="20" viewBox="0 0 20 20" className={tool("t-cross") + " -translate-x-[10px] -translate-y-[10px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"}>
              <path d="M10 1v18M1 10h18" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              <path d="M10 1v18M1 10h18" stroke="var(--c)" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <svg width="14" height="22" viewBox="0 0 14 22" className={tool("t-ibeam") + " -translate-x-[7px] -translate-y-[11px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"}>
              <path d="M3 2h8M7 2v18M3 20h8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              <path d="M3 2h8M7 2v18M3 20h8" stroke="var(--c)" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <svg width="20" height="20" viewBox="0 0 20 20" className={tool("t-pen") + " -translate-x-[2px] -translate-y-[18px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"}>
              <path d="M2 18 4 10 12 2l6 6-8 8-8 2Z" fill="var(--c)" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
              <circle cx="6" cy="14" r="1.6" fill="#fff" />
            </svg>
            <svg width="26" height="26" viewBox="0 0 26 26" className={tool("t-dup") + " -translate-x-[2px] -translate-y-[1px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"}>
              <path d="M2 1.5 15 8l-5.6 1.7L7.6 15.5 2 1.5Z" fill="var(--c)" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
              <circle cx="18" cy="18" r="6" fill="#fff" />
              <path d="M18 14.5v7M14.5 18h7" stroke="var(--c)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span
              className="absolute left-3.5 top-4 whitespace-nowrap rounded-md rounded-tl-none px-1.5 py-[3px] text-[10px] font-semibold leading-none text-white shadow-lg"
              style={{ background: "var(--c)" }}
            >
              {p.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
