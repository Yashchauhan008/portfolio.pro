"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { highlights, timeline } from "@/lib/data";
import { FadeUp, Reveal } from "./ScrollFx";
import { RocketIcon, TrophyIcon } from "./Icons";

const CARD_GAP = 16; /* keep in sync with the track's gap-4 */
const DRIFT_SPEED = 42; /* auto-scroll px per second */

/* Infinite auto-drifting, draggable card loop.
 * Two identical sets sit side by side; a per-frame modulo keeps the offset
 * inside one set's width, so drag and drift wrap seamlessly forever. */
function HighlightsCarousel() {
  const x = useMotionValue(0);
  const setRef = useRef<HTMLDivElement>(null);
  const loopWidth = useRef(0);
  const hovering = useRef(false);
  const dragging = useRef(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const measure = () => {
      if (setRef.current) loopWidth.current = setRef.current.offsetWidth + CARD_GAP;
    };
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    const w = loopWidth.current;
    if (!w) return;
    let next = x.get();
    const paused = hovering.current || dragging.current || reducedMotion.current;
    if (!paused) next -= (DRIFT_SPEED * delta) / 1000;
    /* wrap into (-w, 0] — the two sets are identical, so the jump is invisible.
       True modulo handles any overshoot from fast drags in a single frame. */
    if (next <= -w || next > 0) next = -(((-next % w) + w) % w);
    x.set(next);
  });

  const cards = highlights.map((item) => (
    <figure
      key={item.title}
      className="group w-[290px] shrink-0 select-none overflow-hidden rounded-3xl border border-line bg-[#0d0d0d] transition-colors duration-300 hover:border-foreground/40 md:w-[360px]"
    >
      <div className="overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          width={1200}
          height={900}
          draggable={false}
          className="pointer-events-none aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <figcaption className="p-6">
        <p className="font-semibold">{item.title}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.detail}</p>
        <p className="label mt-4">{item.year}</p>
      </figcaption>
    </figure>
  ));

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <motion.div
        drag="x"
        dragMomentum={false}
        onDragStart={() => (dragging.current = true)}
        onDragEnd={() => (dragging.current = false)}
        style={{ x }}
        className="flex w-max cursor-grab gap-4 active:cursor-grabbing"
      >
        <div ref={setRef} className="flex gap-4">
          {cards}
        </div>
        <div aria-hidden className="flex gap-4">
          {cards}
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="overflow-hidden px-6 py-24 md:px-10 md:py-36">
      <h2 className="display mb-16 text-center text-[13vw] leading-none md:mb-24 md:text-[8.5vw]">
        <Reveal>
          My journey
          <RocketIcon className="ml-[0.14em] inline-block h-auto w-[0.6em] rotate-45 align-[0.06em] drop-shadow-[0_0_18px_rgba(168,85,247,0.4)]" />
        </Reveal>
      </h2>

      <div className="mx-auto max-w-4xl space-y-6">
        {timeline.map((item, i) => (
          <FadeUp key={item.title} delay={i * 0.04}>
            <article className="rounded-[1.75rem] border border-line bg-[#0d0d0d] p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-5">
                  <span className="display text-3xl leading-none text-foreground/40 md:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="display text-lg md:text-2xl">{item.title}</h3>
                    <p className="label mt-1.5">{item.org}</p>
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${
                    item.status === "current"
                      ? "grad-bg text-white"
                      : "border border-line text-muted"
                  }`}
                >
                  {item.period}
                  {item.status === "current" && " · now"}
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                {item.description}
              </p>
              {item.links.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-5">
                  {item.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-xs uppercase tracking-[0.16em] text-foreground/80"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </article>
          </FadeUp>
        ))}
      </div>

      {/* photo highlights — hackathon wins, startup, teaching & more */}
      <FadeUp className="mt-24">
        <p className="label mb-3 flex items-center justify-center gap-2 text-center">
          Highlights & milestones <TrophyIcon className="h-auto w-4" />
        </p>
        <p className="mb-10 text-center text-[10px] uppercase tracking-[0.2em] text-muted">
          Drag to explore →
        </p>
      </FadeUp>
      <FadeUp className="mx-auto max-w-6xl">
        <HighlightsCarousel />
      </FadeUp>
    </section>
  );
}
