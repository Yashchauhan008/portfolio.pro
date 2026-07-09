"use client";

import { useEffect, useRef, useState } from "react";
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

/** Slides children up from behind an overflow mask.
 * The observer sits on the (unclipped) mask — a translated child inside
 * overflow-hidden never intersects, so it must not carry whileInView itself. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      className={`block overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      <motion.span
        className="block"
        variants={{
          hidden: { y: "110%" },
          visible: {
            y: "0%",
            transition: { duration: 0.9, ease: EASE, delay },
          },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
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
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
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

/** Hairline that draws itself across when in view. */
export function LineGrow({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`h-px w-full origin-left bg-line ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
    />
  );
}
