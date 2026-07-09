"use client";

import { awards, timeline } from "@/lib/data";
import { FadeUp, Reveal } from "./ScrollFx";

export default function Experience() {
  return (
    <section id="experience" className="overflow-hidden px-6 py-24 md:px-10 md:py-36">
      <h2 className="display mb-16 text-center text-[13vw] leading-none md:mb-24 md:text-[8.5vw]">
        <Reveal>
          My journey <span className="align-middle text-[0.55em]">🚀</span>
        </Reveal>
      </h2>

      <div className="mx-auto max-w-4xl space-y-6">
        {timeline.map((item, i) => (
          <FadeUp key={item.title} delay={i * 0.04}>
            <article className="rounded-[1.75rem] border border-line bg-[#0d0d0d] p-6 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-5">
                  <span className="display text-3xl text-foreground/40 md:text-5xl">
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

      {/* awards marquee — echoes the reference's testimonial card rows */}
      <FadeUp className="mt-24">
        <p className="label mb-8 text-center">Awards & activities 🏆</p>
        <div className="flex overflow-hidden">
          <div
            className="animate-marquee flex w-max shrink-0 gap-4 pr-4"
            style={{ "--marquee-dur": "36s" } as React.CSSProperties}
          >
            {[...awards, ...awards].map((award, i) => (
              <div
                key={`${award.title}-${i}`}
                className="w-[320px] shrink-0 rounded-3xl border border-line bg-[#0d0d0d] p-6 md:w-[380px]"
              >
                <p className="font-semibold">{award.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{award.detail}</p>
                <p className="label mt-4">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
