"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { siteConfig } from "@/lib/data";
import { SparkleIcon } from "./Icons";

const EASE = [0.65, 0, 0.35, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pt-28 md:px-10 md:pt-32"
    >
      <motion.div style={{ y, opacity }}>
        {/* giant condensed headline spanning the full width */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: EASE, delay: 1.3 }}
            className="display text-center text-[17.5vw] leading-[0.95] md:text-[15.5vw]"
          >
            Hi, I&apos;m Yash
          </motion.h1>
        </div>

        <div className="relative mx-auto mt-0 grid max-w-6xl grid-cols-1 items-center gap-10 md:mt-[-3vw] md:grid-cols-[1fr_auto_1fr]">
          {/* left — small uppercase tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.9 }}
            className="order-2 max-w-[240px] text-[11px] font-semibold uppercase leading-[1.9] tracking-[0.18em] text-foreground/80 max-md:mx-auto max-md:text-center md:order-1 md:justify-self-start"
          >
            A fullstack engineer passionate about crafting bold and memorable
            Software Solutions{" "}
            <SparkleIcon className="inline-block h-auto w-[1.1em] align-[-0.2em]" />
          </motion.p>

          {/* center — avatar with gradient glow, floating like the 3D head */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 1.55 }}
            style={{ y: avatarY }}
            className="order-1 justify-self-center md:order-2"
          >
            <div
              className="floaty relative"
              style={{ "--float-dur": "7s" } as React.CSSProperties}
            >
              {/* true alpha cutout — the glow hugs the head's shape, not a circle */}
              <Image
                src={siteConfig.avatar}
                alt="Yash Chauhan"
                width={692}
                height={821}
                priority
                className="h-auto w-[48vw] max-w-[320px] md:w-[21vw]"
                style={{
                  transform: "rotate(5deg)",
                  filter:
                    "drop-shadow(0 0 55px rgba(168,85,247,0.4)) drop-shadow(0 30px 40px rgba(0,0,0,0.6))",
                }}
              />
            </div>
          </motion.div>

          {/* right — Download CV */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 2.05 }}
            className="order-3 max-md:mx-auto md:justify-self-end"
          >
            <a
              href={siteConfig.resume}
              download="yash-chauhan-resume.pdf"
              className="grad-pill inline-block rounded-full px-9 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="label mt-14 text-center"
        >
          {siteConfig.role} — {siteConfig.location} · scroll ↓
        </motion.p>
      </motion.div>
    </section>
  );
}
