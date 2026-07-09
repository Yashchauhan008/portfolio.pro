"use client";

import { siteConfig, skills } from "@/lib/data";
import { CountUp, FadeUp, Reveal, WordReveal } from "./ScrollFx";

const skillGroups = [
  { title: "Languages", items: skills.languages },
  { title: "Frontend", items: skills.frontend },
  { title: "Backend", items: skills.backend },
  { title: "Tools", items: skills.tools },
];

/* floating 3D-style emoji decorations, like the chrome shapes in the reference */
const floaters = [
  { emoji: "✨", className: "left-[6%] top-[10%] text-5xl md:text-7xl", dur: "6s", delay: "0s" },
  { emoji: "🔮", className: "right-[7%] top-[16%] text-4xl md:text-6xl", dur: "7.5s", delay: "0.8s" },
  { emoji: "⚡", className: "left-[10%] bottom-[24%] text-4xl md:text-6xl", dur: "5.5s", delay: "1.4s" },
  { emoji: "🌸", className: "right-[9%] bottom-[18%] text-5xl md:text-7xl", dur: "8s", delay: "0.4s" },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-28 md:px-10 md:py-44">
      {floaters.map((f) => (
        <span
          key={f.emoji}
          aria-hidden
          className={`floaty pointer-events-none absolute select-none ${f.className}`}
          style={{ "--float-dur": f.dur, "--float-delay": f.delay } as React.CSSProperties}
        >
          {f.emoji}
        </span>
      ))}

      {/* gradient glow behind the section */}
      <div className="grad-bg pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-[120px]" />

      <div className="mx-auto max-w-3xl text-center">
        <h2 className="display text-[15vw] leading-none md:text-[9vw]">
          <Reveal>About me</Reveal>
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

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {siteConfig.stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.06}>
              <p className="display text-4xl md:text-5xl">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">
                {stat.label}
              </p>
            </FadeUp>
          ))}
        </div>

        <div className="mt-16 space-y-5 text-left">
          {skillGroups.map((group, gi) => (
            <FadeUp key={group.title} delay={gi * 0.05}>
              <div className="grid grid-cols-[110px_1fr] items-baseline gap-4 border-t border-line pt-5">
                <h3 className="label">{group.title}</h3>
                <p className="text-sm leading-loose text-muted">
                  {group.items.join(" · ")}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
