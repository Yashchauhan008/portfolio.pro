"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects, moreProjects, type ArchiveProject } from "@/lib/data";
import { FadeUp, Reveal } from "./ScrollFx";

/* featured projects first, then everything else — one flat archive */
const rows: ArchiveProject[] = [
  ...projects.map((p) => ({
    title: p.title,
    year: p.year,
    stack: p.stack,
    link: p.link || undefined,
    repo: p.repo || undefined,
    image: p.image,
    caseStudy: p.caseStudy,
  })),
  ...moreProjects,
];

export default function ProjectArchive() {
  const [active, setActive] = useState(0);
  const current = rows[active] ?? rows[0];

  return (
    <main className="px-6 pb-28 pt-32 md:px-10 md:pt-40">
      <header className="mx-auto max-w-6xl">
        <FadeUp>
          <p className="label mb-6">Archive · {rows.length} projects</p>
        </FadeUp>
        <h1 className="display text-[16vw] leading-[0.95] md:text-[10vw]">
          <Reveal>
            All <span className="grad-text">projects</span>
          </Reveal>
        </h1>
        <FadeUp delay={0.15}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Hover a project to preview it. Flagship builds also live on the{" "}
            <Link href="/#work" className="link-underline text-foreground/85">
              home page
            </Link>
            .
          </p>
        </FadeUp>
      </header>

      <section className="mx-auto mt-14 grid max-w-6xl gap-10 md:mt-20 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.95fr)] md:gap-14 lg:gap-20">
        {/* left — list */}
        <div>
          <ul className="border-t border-line">
            {rows.map((row, i) => {
              const isActive = i === active;
              return (
                <li key={row.title} className="border-b border-line">
                  <div
                    onMouseEnter={() => setActive(i)}
                    onFocusCapture={() => setActive(i)}
                    className={`group grid grid-cols-[2.75rem_1fr_auto] items-center gap-3 py-5 transition-colors duration-300 md:grid-cols-[3.5rem_1fr_auto] md:gap-5 md:py-6 ${
                      isActive ? "text-foreground" : "text-foreground/45 hover:text-foreground/80"
                    }`}
                  >
                    <span
                      className={`display text-lg md:text-2xl ${
                        isActive ? "text-foreground" : "text-foreground/30"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        className="display w-full text-left text-xl leading-none tracking-wide md:text-3xl"
                      >
                        {row.title}
                      </button>
                      <p
                        className={`mt-2 text-[11px] uppercase tracking-[0.16em] transition-opacity duration-300 md:text-xs ${
                          isActive ? "text-muted opacity-100" : "opacity-0 md:opacity-60"
                        }`}
                      >
                        {row.year}
                        <span className="mx-2 text-foreground/20">·</span>
                        {row.stack.slice(0, 3).join(" · ")}
                      </p>
                    </div>

                    <div
                      className={`flex shrink-0 flex-col items-end gap-2 text-right transition-opacity duration-300 sm:flex-row sm:items-center sm:gap-4 ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70 md:opacity-40"
                      }`}
                    >
                      {row.caseStudy && (
                        <Link
                          href={row.caseStudy}
                          className="link-underline text-[10px] font-semibold uppercase tracking-[0.18em]"
                        >
                          Case study
                        </Link>
                      )}
                      {row.link && (
                        <a
                          href={row.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline text-[10px] font-semibold uppercase tracking-[0.18em]"
                        >
                          Live ↗
                        </a>
                      )}
                      {row.repo && (
                        <a
                          href={row.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline text-[10px] font-semibold uppercase tracking-[0.18em] text-muted"
                        >
                          Code ↗
                        </a>
                      )}
                    </div>
                  </div>

                  {/* mobile preview under active row */}
                  {isActive && row.image && (
                    <div className="pb-5 md:hidden">
                      <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-line">
                        <Image
                          src={row.image}
                          alt=""
                          fill
                          sizes="100vw"
                          quality={90}
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* right — sticky synced preview */}
        <div className="relative hidden md:block">
          <div className="sticky top-28">
            <div className="relative aspect-4/3 overflow-hidden rounded-[1.75rem] border border-line bg-[#111]">
              <AnimatePresence mode="wait">
                {current?.image && (
                  <motion.div
                    key={current.image}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={current.image}
                      alt={`${current.title} — preview`}
                      fill
                      sizes="45vw"
                      quality={92}
                      className="object-cover object-top"
                      priority
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-6 pt-20">
                <p className="label text-white/55">
                  {String(active + 1).padStart(2, "0")} / {String(rows.length).padStart(2, "0")}
                </p>
                <p className="display mt-2 text-2xl text-white lg:text-3xl">
                  {current?.title}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-4">
              {current?.caseStudy && (
                <Link
                  href={current.caseStudy}
                  className="grad-pill rounded-full px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white"
                >
                  Case study
                </Link>
              )}
              {current?.link && (
                <a
                  href={current.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-outline px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em]"
                >
                  Live project ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl text-center">
        <FadeUp>
          <a
            href="https://github.com/Yashchauhan008?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-outline inline-block px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em]"
          >
            More experiments on GitHub ↗
          </a>
        </FadeUp>
      </section>
    </main>
  );
}
