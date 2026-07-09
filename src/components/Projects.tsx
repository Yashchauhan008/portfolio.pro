"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { projects } from "@/lib/data";
import { Reveal } from "./ScrollFx";

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
        {/* header row — number, name, live pill */}
        <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-5 md:px-9">
          <div className="flex items-baseline gap-5">
            <span className="display text-4xl leading-none md:text-6xl">
              {project.index}
            </span>
            <div>
              <p className="label">Project · {project.year}</p>
              <h3 className="display mt-1 text-xl md:text-3xl">{project.title}</h3>
            </div>
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-outline shrink-0 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] md:text-[11px]"
          >
            Live project
          </a>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[1.6fr_1fr] md:p-9">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-2xl border border-line"
          >
            <motion.div style={{ y: imgY }}>
              <Image
                src={project.image}
                alt={`${project.title} — live site screenshot`}
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
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-5 inline-block text-xs uppercase tracking-[0.18em] text-muted hover:text-foreground"
              >
                Source code ↗
              </a>
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

      <div className="mt-24 text-center">
        <a
          href="https://github.com/Yashchauhan008?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="pill-outline inline-block px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em]"
        >
          + 74 more experiments on GitHub
        </a>
      </div>
    </section>
  );
}
