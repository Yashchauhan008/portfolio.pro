"use client";

import Image from "next/image";
import { marqueeSkills, projects } from "@/lib/data";
import { FadeUp } from "./ScrollFx";

/* Skills strip + two counter-scrolling rows of work, like the reference's
 * client-logo bar and image wall. Content is duplicated once for a seamless loop. */

function GalleryRow({
  images,
  reverse = false,
  duration,
}: {
  images: { src: string; alt: string }[];
  reverse?: boolean;
  duration: string;
}) {
  const doubled = [...images, ...images];
  return (
    <div className="flex overflow-hidden">
      <div
        className={`animate-marquee flex w-max shrink-0 gap-4 pr-4 ${reverse ? "reverse" : ""}`}
        style={{ "--marquee-dur": duration } as React.CSSProperties}
      >
        {doubled.map((img, i) => (
          <Image
            key={`${img.src}-${i}`}
            src={img.src}
            alt={img.alt}
            width={720}
            height={450}
            className="h-40 w-64 rounded-2xl border border-line object-cover object-top md:h-52 md:w-[22rem]"
          />
        ))}
      </div>
    </div>
  );
}

export default function Showcase() {
  const shots = projects.map((p) => ({ src: p.image, alt: p.title }));
  const rowA = shots;
  const rowB = [...shots.slice(3), ...shots.slice(0, 3)];

  return (
    <section className="overflow-hidden py-20 md:py-28">
      {/* tech strip — stands in for the client-logo bar */}
      <FadeUp>
        <div className="flex overflow-hidden border-y border-line py-5">
          <div
            className="animate-marquee flex w-max shrink-0 items-center gap-10 pr-10"
            style={{ "--marquee-dur": "40s" } as React.CSSProperties}
          >
            {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="display flex items-center gap-10 whitespace-nowrap text-xl text-foreground/70 md:text-2xl"
              >
                {skill}
                <span className="grad-text text-base">✦</span>
              </span>
            ))}
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.15} className="mt-14 space-y-4">
        <GalleryRow images={rowA} duration="46s" />
        <GalleryRow images={rowB} reverse duration="56s" />
      </FadeUp>
    </section>
  );
}
