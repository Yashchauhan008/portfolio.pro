"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { siteConfig, skills } from "@/lib/data";
import { CountUp, FadeUp, Reveal, WordReveal } from "./ScrollFx";
import { BoltIcon, DiscIcon, FlowerIcon, OrbIcon, RingIcon, SparkleIcon } from "./Icons";

const skillGroups = [
  { title: "Languages", items: skills.languages },
  { title: "Frontend", items: skills.frontend },
  { title: "Backend", items: skills.backend },
  { title: "Tools", items: skills.tools },
];

/* floating 3D-style shapes with scroll parallax, like the chrome shapes in the reference */
const floaters = [
  { name: "sparkle", Icon: SparkleIcon, className: "left-[6%] top-[8%] w-12 md:w-[4.5rem]", dur: "6s", delay: "0s", depth: 90 },
  { name: "orb", Icon: OrbIcon, className: "right-[7%] top-[14%] w-9 md:w-14", dur: "7.5s", delay: "0.8s", depth: -70 },
  { name: "disc", Icon: DiscIcon, className: "left-[13%] top-[42%] w-9 md:w-14", dur: "9s", delay: "2s", depth: 55 },
  { name: "bolt", Icon: BoltIcon, className: "left-[8%] bottom-[22%] w-9 md:w-14", dur: "5.5s", delay: "1.4s", depth: -85 },
  { name: "flower", Icon: FlowerIcon, className: "right-[9%] bottom-[30%] w-12 md:w-[4.5rem]", dur: "8s", delay: "0.4s", depth: 70 },
  { name: "ring", Icon: RingIcon, className: "right-[14%] bottom-[8%] w-9 md:w-14", dur: "7s", delay: "1s", depth: -50 },
];

function Floater({
  floater,
  progress,
}: {
  floater: (typeof floaters)[number];
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [0, 1], [floater.depth, -floater.depth]);
  return (
    <motion.span
      aria-hidden
      style={{ y }}
      className={`pointer-events-none absolute select-none ${floater.className}`}
    >
      <span
        className="floaty block"
        style={{ "--float-dur": floater.dur, "--float-delay": floater.delay } as React.CSSProperties}
      >
        <floater.Icon className="h-auto w-full drop-shadow-[0_0_22px_rgba(168,85,247,0.35)]" />
      </span>
    </motion.span>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      id="about"
      className="relative overflow-hidden px-6 py-28 md:px-10 md:py-44"
    >
      {floaters.map((f) => (
        <Floater key={f.name} floater={f} progress={scrollYProgress} />
      ))}

      {/* gradient glow behind the section */}
      <div className="grad-bg pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-[120px]" />

      <div className="mx-auto max-w-3xl text-center">
        <p className="label mb-5">
          {siteConfig.role} · {siteConfig.location}
        </p>
        <h2 className="display text-[15vw] leading-none md:text-[9vw]">
          <Reveal>
            About <span className="grad-text">me</span>
          </Reveal>
        </h2>

        <div className="mt-12 space-y-6">
          {siteConfig.about.map((para, i) => (
            <WordReveal
              key={i}
              text={para}
              className="text-base leading-relaxed text-foreground/85 md:text-lg"
            />
          ))}
        </div>

        {/* stats as outlined cards, matching the project/journey cards */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {siteConfig.stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.06}>
              <div className="group h-full rounded-3xl border border-line bg-[#0d0d0d] p-6 transition-colors duration-300 hover:border-foreground/40">
                <p className="display grad-text text-4xl md:text-5xl">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-muted">
                  {stat.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* skills as chips, matching the project stack pills */}
        <div className="mt-16 space-y-10">
          {skillGroups.map((group, gi) => (
            <FadeUp key={group.title} delay={gi * 0.05}>
              <p className="label mb-4">{group.title}</p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/75 transition-colors duration-300 hover:border-foreground/50 hover:text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>

        {/* gradient glow bar, like the reference's about footer */}
        <FadeUp delay={0.1}>
          <div className="grad-bg mx-auto mt-20 h-14 w-56 rounded-full opacity-70 blur-2xl md:w-72" />
        </FadeUp>
      </div>
    </section>
  );
}
