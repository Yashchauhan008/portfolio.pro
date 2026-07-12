"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects, moreProjects, type ArchiveProject } from "@/lib/data";
import { FadeUp, LineGrow, Reveal } from "./ScrollFx";

/* featured projects first, then everything else — one flat archive */
const rows: ArchiveProject[] = [
  ...projects.map((p) => ({
    title: p.title,
    year: p.year,
    stack: p.stack,
    link: p.link,
    repo: p.repo,
    image: p.image,
    caseStudy: p.caseStudy,
  })),
  ...moreProjects,
];

function Row({ row, index }: { row: ArchiveProject; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
    >
      <LineGrow />
      <div className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 md:grid-cols-[3rem_1.4fr_1fr_auto_auto] md:gap-8 md:py-7">
        <span className="display text-lg text-foreground/40 md:text-2xl">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h2 className="display text-xl transition-colors duration-300 group-hover:text-foreground md:text-3xl">
          {row.title}
        </h2>

        <div className="hidden flex-wrap gap-2 md:flex">
          {row.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/60"
            >
              {tech}
            </span>
          ))}
        </div>

        <span className="label hidden md:block">{row.year}</span>

        <div className="flex items-center gap-4">
          {row.caseStudy && (
            <Link
              href={row.caseStudy}
              className="link-underline text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80"
            >
              Case study
            </Link>
          )}
          {row.link && (
            <a
              href={row.link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80"
            >
              Live ↗
            </a>
          )}
          {row.repo && (
            <a
              href={row.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[11px] font-semibold uppercase tracking-[0.18em] text-muted hover:text-foreground"
            >
              Code ↗
            </a>
          )}
        </div>
      </div>

      {/* screenshot preview — floats above the row on hover (desktop only) */}
      <AnimatePresence>
        {hovered && row.image && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
            className="pointer-events-none absolute right-[8%] top-1/2 z-20 hidden -translate-y-1/2 md:block"
          >
            <Image
              src={row.image}
              alt={`${row.title} — preview`}
              width={480}
              height={300}
              className="h-44 w-72 rounded-xl border border-line object-cover object-top shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProjectArchive() {
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
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Everything I&apos;ve shipped — client work, products, and
            experiments. The flagship builds live on the{" "}
            <Link href="/#work" className="link-underline text-foreground/85">
              home page
            </Link>
            .
          </p>
        </FadeUp>
      </header>

      <section className="mx-auto mt-16 max-w-6xl md:mt-24">
        {rows.map((row, i) => (
          <FadeUp key={row.title} delay={Math.min(i * 0.03, 0.3)}>
            <Row row={row} index={i} />
          </FadeUp>
        ))}
        <LineGrow />
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
