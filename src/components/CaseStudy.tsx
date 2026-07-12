"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import type { CaseStudy } from "@/lib/caseStudies";
import { FadeUp, LineGrow, Reveal, WordReveal } from "./ScrollFx";

type Shot = { src: string; caption: string };

function ProjectCarousel({
  shots,
  title,
}: {
  shots: Shot[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const count = shots.length;
  const current = shots[index];

  const goTo = useCallback(
    (next: number, dir?: number) => {
      const wrapped = ((next % count) + count) % count;
      setDirection(dir ?? (wrapped > index ? 1 : -1));
      setIndex(wrapped);
    },
    [count, index],
  );

  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);

  useEffect(() => {
    if (count < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, prev, next]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (count < 2) return;
    const swipe = Math.abs(info.offset.x) > 60 || Math.abs(info.velocity.x) > 400;
    if (!swipe) return;
    if (info.offset.x < 0) next();
    else prev();
  };

  if (count === 0) return null;

  return (
    <FadeUp delay={0.1} className="mt-14">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-[#0d0d0d]">
        {/* slide stage — contain keeps UI screenshots sharp; cover was cropping & softening them */}
        <div className="relative aspect-16/10 w-full touch-pan-y select-none bg-[#080808]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current.src}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? "55%" : "-55%", opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d > 0 ? "-55%" : "55%", opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 320, damping: 34, mass: 0.8 }}
              drag={count > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={onDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <Image
                src={current.src}
                alt={current.caption || `${title} — screenshot ${index + 1}`}
                fill
                priority={index === 0}
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1400px"
                className="pointer-events-none object-contain"
              />
            </motion.div>
          </AnimatePresence>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-black/80 md:left-4 md:h-11 md:w-11"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-black/80 md:right-4 md:h-11 md:w-11"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="absolute bottom-3 right-3 z-10 rounded-full border border-white/10 bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md md:bottom-4 md:right-4">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </div>
            </>
          )}
        </div>

        {/* caption + dots */}
        <div className="flex flex-col gap-4 border-t border-line px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <p className="min-h-5 text-xs text-muted md:text-sm">
            {current.caption}
          </p>
          {count > 1 && (
            <div className="flex items-center gap-2">
              {shots.map((shot, i) => (
                <button
                  key={shot.src}
                  type="button"
                  aria-label={`Go to image ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 bg-foreground"
                      : "w-1.5 bg-foreground/25 hover:bg-foreground/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* thumbnails */}
      {count > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => goTo(i, i > index ? 1 : -1)}
              aria-label={`Show ${shot.caption || `image ${i + 1}`}`}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 md:h-20 md:w-32 ${
                i === index
                  ? "border-foreground/70 opacity-100"
                  : "border-line opacity-45 hover:opacity-80"
              }`}
            >
              <Image
                src={shot.src}
                alt=""
                fill
                sizes="128px"
                className="object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}
    </FadeUp>
  );
}

export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  const heroCaption =
    study.gallery?.find((shot) => shot.src === study.image)?.caption ??
    `${study.title} — overview`;

  const shots: Shot[] = [
    { src: study.image, caption: heroCaption },
    ...(study.gallery ?? []).filter((shot) => shot.src !== study.image),
  ];

  return (
    <main className="px-6 pb-28 pt-32 md:px-10 md:pt-40">
      {/* hero */}
      <header className="mx-auto max-w-6xl">
        <FadeUp>
          <p className="label mb-6">
            Case study · {study.year} · {study.status}
          </p>
        </FadeUp>
        <h1 className="display text-[16vw] leading-[0.95] md:text-[10vw]">
          <Reveal>
            {study.title.split(" ")[0]}{" "}
            <span className="grad-text">
              {study.title.split(" ").slice(1).join(" ")}
            </span>
          </Reveal>
        </h1>
        <FadeUp delay={0.15}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/85 md:text-xl">
            {study.tagline}
          </p>
        </FadeUp>

        {/* meta row */}
        <FadeUp delay={0.2}>
          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-8 md:grid-cols-4">
            <div>
              <p className="label mb-2.5">Role</p>
              <p className="text-sm text-foreground/85">{study.role}</p>
            </div>
            <div>
              <p className="label mb-2.5">Type</p>
              <p className="text-sm text-foreground/85">{study.type}</p>
            </div>
            <div>
              <p className="label mb-2.5">Year</p>
              <p className="text-sm text-foreground/85">{study.year}</p>
            </div>
            <div>
              <p className="label mb-2.5">Links</p>
              <div className="flex flex-wrap gap-4">
                {study.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm text-foreground/85"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        {/* stack chips */}
        <FadeUp delay={0.25}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {study.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/75"
              >
                {tech}
              </span>
            ))}
          </div>
        </FadeUp>

        <ProjectCarousel shots={shots} title={study.title} />
      </header>

      {/* overview */}
      <section className="mx-auto mt-28 max-w-3xl md:mt-36">
        <p className="label mb-6">Overview</p>
        <div className="space-y-6">
          {study.overview.map((para, i) => (
            <WordReveal
              key={i}
              text={para}
              className="text-base leading-relaxed text-foreground/85 md:text-lg"
            />
          ))}
        </div>
      </section>

      {/* stats */}
      <section className="mx-auto mt-20 max-w-6xl">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {study.stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-line bg-[#0d0d0d] p-6 transition-colors duration-300 hover:border-foreground/40">
                <p className="display grad-text text-4xl md:text-5xl">{stat.value}</p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-muted">
                  {stat.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* problem */}
      <section className="mx-auto mt-28 max-w-3xl md:mt-36">
        <h2 className="display mb-8 text-4xl md:text-6xl">
          <Reveal>{study.problem.heading}</Reveal>
        </h2>
        <div className="space-y-6">
          {study.problem.paragraphs.map((para, i) => (
            <WordReveal
              key={i}
              text={para}
              className="text-base leading-relaxed text-foreground/85 md:text-lg"
            />
          ))}
        </div>
      </section>

      {/* what I built */}
      <section className="mx-auto mt-28 max-w-6xl md:mt-36">
        <h2 className="display mb-6 text-center text-4xl md:text-6xl">
          <Reveal>{study.built.heading}</Reveal>
        </h2>
        <FadeUp>
          <p className="mx-auto mb-14 max-w-2xl text-center text-base leading-relaxed text-muted md:text-lg">
            {study.built.intro}
          </p>
        </FadeUp>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {study.built.categories.map((cat, i) => (
            <FadeUp key={cat.name} delay={i * 0.05}>
              <div className="h-full rounded-3xl border border-line bg-[#0d0d0d] p-7 transition-colors duration-300 hover:border-foreground/40">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="display text-xl md:text-2xl">{cat.name}</h3>
                  <span className="display grad-text text-3xl md:text-4xl">
                    {cat.count}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {cat.examples}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* docs engine features */}
      <section className="mx-auto mt-28 max-w-4xl md:mt-36">
        <h2 className="display mb-12 text-4xl md:text-6xl">
          <Reveal>{study.features.heading}</Reveal>
        </h2>
        <div>
          {study.features.items.map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.04}>
              <LineGrow />
              <div className="grid gap-3 py-8 md:grid-cols-[1fr_1.4fr] md:gap-10">
                <h3 className="display text-lg md:text-xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted md:text-base">
                  {item.desc}
                </p>
              </div>
            </FadeUp>
          ))}
          <LineGrow />
        </div>
      </section>

      {/* challenges */}
      <section className="mx-auto mt-28 max-w-4xl md:mt-36">
        <h2 className="display mb-12 text-4xl md:text-6xl">
          <Reveal>{study.challenges.heading}</Reveal>
        </h2>
        <div className="space-y-6">
          {study.challenges.items.map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.04}>
              <article className="rounded-[1.75rem] border border-line bg-[#0d0d0d] p-6 md:p-8">
                <div className="flex items-center gap-5">
                  <span className="display text-3xl leading-none text-foreground/40 md:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display text-lg md:text-2xl">{item.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                  {item.desc}
                </p>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* outcome */}
      <section className="mx-auto mt-28 max-w-3xl md:mt-36">
        <h2 className="display mb-8 text-4xl md:text-6xl">
          <Reveal>{study.outcome.heading}</Reveal>
        </h2>
        <div className="space-y-6">
          {study.outcome.paragraphs.map((para, i) => (
            <WordReveal
              key={i}
              text={para}
              className="text-base leading-relaxed text-foreground/85 md:text-lg"
            />
          ))}
        </div>

        <FadeUp className="mt-12">
          <p className="label mb-5">{study.next.heading}</p>
          <div className="flex flex-wrap gap-2.5">
            {study.next.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/75"
              >
                {item}
              </span>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-28 max-w-3xl text-center md:mt-36">
        <FadeUp>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {study.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="grad-pill rounded-full px-9 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white"
              >
                {l.label}
              </a>
            ))}
            <Link
              href="/#work"
              className="pill-outline inline-block px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em]"
            >
              ← All projects
            </Link>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="grad-bg mx-auto mt-20 h-14 w-56 rounded-full opacity-70 blur-2xl md:w-72" />
        </FadeUp>
      </section>
    </main>
  );
}
