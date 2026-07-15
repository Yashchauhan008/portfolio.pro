"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { siteConfig, skills } from "@/lib/data";
import { FadeUp, Reveal, WordReveal } from "./ScrollFx";
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

        <FadeUp delay={0.08} className="mt-10">
          <a
            href={siteConfig.resume}
            download="yash-chauhan-resume.pdf"
            className="grad-pill inline-block rounded-full px-9 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white"
          >
            Download resume
          </a>
        </FadeUp>
      </div>

      {/* How I Work — process timeline */}
      <div className="mx-auto mt-24 max-w-6xl md:mt-32">
        <h3 className="display mb-14 text-center text-4xl md:mb-20 md:text-6xl">
          <Reveal>
            How I <span className="grad-text">Work</span>
          </Reveal>
        </h3>

        {/* desktop: horizontal journey */}
        <ol className="relative hidden md:grid md:grid-cols-5">
          <motion.span
            aria-hidden
            className="absolute left-[10%] right-[10%] top-7 h-px origin-left bg-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
          />

          {siteConfig.workProcess.map((item, i) => (
            <FadeUp key={item.step} delay={0.15 + i * 0.08}>
              <li className="relative flex flex-col items-center px-3 text-center">
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-line bg-[#0d0d0d]">
                  <span className="display grad-text text-lg leading-none">{item.step}</span>
                </span>
                {i === 0 ? (
                  <a
                    href="/#contact"
                    className="link-underline mt-6 display text-base text-foreground md:text-lg"
                  >
                    {item.title}
                  </a>
                ) : (
                  <h4 className="mt-6 display text-base md:text-lg">{item.title}</h4>
                )}
              </li>
            </FadeUp>
          ))}
        </ol>

        {/* mobile: vertical journey */}
        <ol className="relative mx-auto max-w-sm md:hidden">
          <motion.span
            aria-hidden
            className="absolute bottom-6 left-7 top-6 w-px origin-top bg-line"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          />

          {siteConfig.workProcess.map((item, i) => (
            <FadeUp key={item.step} delay={i * 0.06}>
              <li
                className={`relative flex items-center gap-5 ${
                  i === siteConfig.workProcess.length - 1 ? "" : "pb-10"
                }`}
              >
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-[#0d0d0d]">
                  <span className="display grad-text text-lg leading-none">{item.step}</span>
                </span>
                {i === 0 ? (
                  <a
                    href="/#contact"
                    className="link-underline display text-lg text-foreground"
                  >
                    {item.title}
                  </a>
                ) : (
                  <h4 className="display text-lg">{item.title}</h4>
                )}
              </li>
            </FadeUp>
          ))}
        </ol>
      </div>

      {/* skills as chips, matching the project stack pills */}
      <div className="mx-auto mt-20 max-w-3xl space-y-10 text-center md:mt-24">
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

      <FadeUp delay={0.1}>
        <div className="grad-bg mx-auto mt-20 h-14 w-56 rounded-full opacity-70 blur-2xl md:w-72" />
      </FadeUp>
    </section>
  );
}
