"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { projects } from "@/lib/data";
import { Reveal } from "./ScrollFx";

/* Big magnetic CTA to the archive — glows, breathes, and leans toward the cursor. */
function ArchiveCta() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 160, damping: 16 });
  const y = useSpring(my, { stiffness: 160, damping: 16 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="inline-block p-8"
    >
      <motion.div style={{ x, y }} className="relative">
        {/* breathing glow behind the pill */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="grad-bg absolute -inset-2 rounded-full blur-xl"
        />
        <Link
          href="/projects"
          className="grad-pill relative inline-flex items-center gap-3 rounded-full px-10 py-5 text-[12px] font-bold uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:scale-[1.04] md:px-12 md:text-[13px]"
        >
          Explore the full archive
          <motion.span
            aria-hidden
            animate={{ x: [0, 7, 0] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
}

/* Outlined cards pin below the header and stack over each other as you scroll,
 * each led by a huge number like the reference's 01 / 02 / 03 client cards. */
function StackCard({
  project,
  index,
  total,
  progress,
}: {
  project: (typeof projects)[number];
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const scale = useTransform(progress, [start, 1], [1, 0.94 - (total - index - 1) * 0.012]);
  const imgY = useTransform(progress, [start - 1 / total, end], ["-6%", "6%"]);

  return (
    <div className="sticky" style={{ top: `calc(84px + ${index * 30}px)` }}>
      <motion.article
        style={{ scale }}
        className="origin-top overflow-hidden rounded-[1.75rem] border border-line bg-[#0d0d0d] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
      >
        {/* header row — number, name, actions (stacks on mobile) */}
        <div className="flex flex-col gap-4 border-b border-line px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:px-9">
          <div className="flex min-w-0 items-center gap-4 md:gap-5">
            <span className="display shrink-0 text-4xl leading-[0.8] md:text-6xl">
              {project.index}
            </span>
            <div className="min-w-0 flex-1">
              <p className="label leading-none">Project · {project.year}</p>
              <h3 className="display mt-1.5 truncate text-xl leading-none md:text-3xl">
                {project.title}
              </h3>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto sm:justify-end sm:gap-3">
            {project.caseStudy && (
              <Link
                href={project.caseStudy}
                className="grad-pill flex-1 rounded-full px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:flex-none sm:px-6 sm:py-3 sm:tracking-[0.22em] md:text-[11px]"
              >
                Case study
              </Link>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-outline flex-1 px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.18em] sm:flex-none sm:px-6 sm:py-3 sm:tracking-[0.22em] md:text-[11px]"
              >
                <span className="sm:hidden">Live</span>
                <span className="hidden sm:inline">Live project</span>
              </a>
            )}
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[1.6fr_1fr] md:p-9">
          <a
            href={project.link || project.caseStudy || "#"}
            {...(project.link
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group relative block overflow-hidden rounded-2xl border border-line"
          >
            <motion.div style={{ y: imgY }}>
              <Image
                src={project.image}
                alt={`${project.title} — screenshot`}
                width={1440}
                height={900}
                className="h-60 w-full scale-[1.13] object-cover object-top transition-transform duration-700 group-hover:scale-[1.18] md:h-[380px]"
              />
            </motion.div>
          </a>

          <div className="flex flex-col justify-between gap-6">
            <p className="text-sm leading-relaxed text-muted md:text-base">
              {project.description}
            </p>
            <div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-line px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-5 inline-block text-xs uppercase tracking-[0.18em] text-muted hover:text-foreground"
                >
                  Source code ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="px-6 py-24 md:px-10 md:py-36">
      <h2 className="display mb-16 text-center text-[16vw] leading-none md:mb-24 md:text-[11vw]">
        <Reveal>Projects</Reveal>
      </h2>

      <div ref={ref} className="mx-auto max-w-6xl space-y-20 md:space-y-28">
        {projects.map((project, i) => (
          <StackCard
            key={project.title}
            project={project}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      <div className="mt-20 text-center">
        <p className="label mb-2">This is just the highlight reel</p>
        <ArchiveCta />
        <p className="mt-2 text-xs text-muted">
          client work · products · experiments —{" "}
          <a
            href="https://github.com/Yashchauhan008?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hover:text-foreground"
          >
            + 74 more on GitHub ↗
          </a>
        </p>
      </div>
    </section>
  );
}
