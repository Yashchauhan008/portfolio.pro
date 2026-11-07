"use client";

import { useEffect, useRef, useState } from "react";
import { useCrewReveal } from "./Crew";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  type Variants,
} from "motion/react";

const EASE = [0.65, 0, 0.35, 1] as const;

/** Thin accent progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      className="grad-bg fixed inset-x-0 top-0 z-[90] h-[2.5px] origin-left"
      style={{ scaleX }}
    />
  );
}

/* Reveals are performed by the swarm (see Crew.tsx). `data-crew="hidden"`
 * keeps an element blank (see globals.css) until cursors have built it. */

/** Any block, built by the swarm. `trigger="mount"` starts after `delay` s. */
export function Collab({
  children,
  delay = 0,
  className = "",
  trigger = "view",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  trigger?: "view" | "mount";
}) {
  const ref = useCrewReveal<HTMLDivElement>(delay, trigger);
  return (
    <div ref={ref} data-crew="hidden" className={className}>
      {children}
    </div>
  );
}

/** Heading / line of text — typed out by the swarm. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useCrewReveal<HTMLSpanElement>(delay);
  return (
    <span ref={ref} data-crew="hidden" className={`block ${className}`}>
      {children}
    </span>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Collab delay={delay} className={className}>
      {children}
    </Collab>
  );
}

const wordContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.018 } },
};

const word: Variants = {
  hidden: { opacity: 0.1 },
  visible: { opacity: 1, transition: { duration: 0.45 } },
};

/** Paragraph that brightens word by word as it enters the viewport. */
export function WordReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.p
      className={className}
      variants={wordContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-18% 0px" }}
    >
      {text.split(" ").map((w, i) => (
        <motion.span key={i} variants={word} className="inline">
          {w}{" "}
        </motion.span>
      ))}
    </motion.p>
  );
}

/** Number that counts up when scrolled into view. Handles "80+", "₹4Cr", "8.53". */
export function CountUp({
  value,
  className = "",
  duration = 1.6,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/[\d.]+/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(match[0]);
    const decimals = match[0].includes(".") ? match[0].split(".")[1].length : 0;
    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index ?? 0) + match[0].length);
    const start = performance.now();

    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/** Hairline — drawn by a pen-tool cursor. */
export function LineGrow({ className = "" }: { className?: string }) {
  const ref = useCrewReveal<HTMLDivElement>(0);
  return (
    <div
      ref={ref}
      data-crew="hidden"
      className={`h-px w-full bg-line ${className}`}
    />
  );
}
