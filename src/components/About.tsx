"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { siteConfig, skills } from "@/lib/data";
import { FadeUp, Reveal, WordReveal } from "./ScrollFx";
import {
  BoltIcon,
  DiscIcon,
  FlowerIcon,
  OrbIcon,
  RingIcon,
  SparkleIcon,
} from "./Icons";

const skillGroups = [
  { title: "Languages", items: skills.languages },
  { title: "Frontend", items: skills.frontend },
  { title: "Backend", items: skills.backend },
  { title: "Tools", items: skills.tools },
];

/* floating 3D-style shapes with scroll parallax, like the chrome shapes in the reference */
const floaters = [
  {
    name: "sparkle",
    Icon: SparkleIcon,
    className: "left-[6%] top-[8%] w-12 md:w-[4.5rem]",
    dur: "6s",
    delay: "0s",
    depth: 90,
  },
  {
    name: "orb",
    Icon: OrbIcon,
    className: "right-[7%] top-[14%] w-9 md:w-14",
    dur: "7.5s",
    delay: "0.8s",
    depth: -70,
  },
  {
    name: "disc",
    Icon: DiscIcon,
    className: "left-[13%] top-[42%] w-9 md:w-14",
    dur: "9s",
    delay: "2s",
    depth: 55,
  },
  {
    name: "bolt",
    Icon: BoltIcon,
    className: "left-[8%] bottom-[22%] w-9 md:w-14",
    dur: "5.5s",
    delay: "1.4s",
    depth: -85,
  },
  {
    name: "flower",
    Icon: FlowerIcon,
    className: "right-[9%] bottom-[30%] w-12 md:w-[4.5rem]",
    dur: "8s",
    delay: "0.4s",
    depth: 70,
  },
  {
    name: "ring",
    Icon: RingIcon,
    className: "right-[14%] bottom-[8%] w-9 md:w-14",
    dur: "7s",
    delay: "1s",
    depth: -50,
  },
];

function MapPin({
  color,
  label,
  flag = false,
}: {
  color: string;
  label: string;
  flag?: boolean;
}) {
  return (
    <span className="relative inline-flex h-16 w-12 shrink-0 items-end justify-center">
      {/* flag on finish pin */}
      {flag && (
        <span
          aria-hidden
          className="floaty absolute -right-3 top-0 h-4 w-5 origin-left"
          style={
            {
              "--float-dur": "3.5s",
              background: "var(--grad)",
              clipPath: "polygon(0 0, 100% 20%, 100% 80%, 0 100%)",
            } as React.CSSProperties
          }
        />
      )}
      <svg
        viewBox="0 0 48 64"
        className="h-16 w-12 drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
        aria-hidden
      >
        <path
          d="M24 2c11 0 20 9 20 20 0 14-20 40-20 40S4 36 4 22C4 11 13 2 24 2Z"
          fill={color}
        />
        <circle cx="24" cy="22" r="9" fill="#0d0d0d" />
        <text
          x="24"
          y="26"
          textAnchor="middle"
          fill="#f2f2ee"
          fontSize="9"
          fontWeight="700"
          fontFamily="var(--font-anton), Impact, sans-serif"
        >
          {label}
        </text>
      </svg>
    </span>
  );
}

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
        style={
          {
            "--float-dur": floater.dur,
            "--float-delay": floater.delay,
          } as React.CSSProperties
        }
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
      </div>

      {/* How I Work — map pins / route */}
      <div className="mx-auto mt-24 max-w-5xl md:mt-32">
        <h3 className="display mb-4 text-center text-4xl md:text-6xl">
          <Reveal>
            How I <span className="grad-text">Work</span>
          </Reveal>
        </h3>
        <FadeUp>
          <p className="label mb-12 text-center md:mb-14">
            Project route · 5 stops
          </p>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="relative overflow-hidden rounded-4xl border border-line bg-[#0d0d0d]">
            {/* map grid texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.09]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.45) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div
              aria-hidden
              className="grad-bg pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full opacity-[0.12] blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-[#4f7cff] opacity-[0.1] blur-3xl"
            />

            {/* map chrome */}
            <div className="relative border-b border-line px-5 py-4 md:px-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/80">
                Route YC-01
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted">
                Contact → Delivery
              </p>
            </div>

            {/* desktop: pins planted on the route */}
            <div className="relative hidden px-8 pb-10 pt-16 md:block md:px-12">
              <div className="relative mx-auto h-[148px] w-full max-w-4xl">
                <svg
                  aria-hidden
                  className="absolute inset-0 h-full w-full overflow-visible"
                  viewBox="0 0 1000 140"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M100 95 C 180 48, 220 48, 300 55 S 420 120, 500 110 S 620 50, 700 58 S 820 105, 900 90"
                    fill="none"
                    stroke="url(#mapRouteGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="7 9"
                    initial={{ pathLength: 0, opacity: 0.5 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
                  />
                  <defs>
                    <linearGradient
                      id="mapRouteGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#ff8a3d" />
                      <stop offset="35%" stopColor="#ff3d77" />
                      <stop offset="70%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#4f7cff" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* tip at path points: (100,95) (300,55) (500,110) (700,58) (900,90) */}
                {(
                  [
                    { x: 10, y: (95 / 140) * 100 },
                    { x: 30, y: (55 / 140) * 100 },
                    { x: 50, y: (110 / 140) * 100 },
                    { x: 70, y: (58 / 140) * 100 },
                    { x: 90, y: (90 / 140) * 100 },
                  ] as const
                ).map((pos, i) => {
                  const item = siteConfig.workProcess[i];
                  const isFirst = i === 0;
                  const isLast = i === siteConfig.workProcess.length - 1;
                  const pinColor = isFirst
                    ? "#ff8a3d"
                    : isLast
                      ? "#4f7cff"
                      : i === 2
                        ? "#a855f7"
                        : "#ff3d77";

                  const pin = (
                    <span
                      className="absolute z-10 -translate-x-1/2 -translate-y-[calc(100%-8px)]"
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    >
                      <MapPin
                        color={pinColor}
                        label={item.step}
                        flag={isLast}
                      />
                    </span>
                  );

                  return isFirst ? (
                    <a key={item.step} href="/#contact" aria-label={item.title}>
                      {pin}
                    </a>
                  ) : (
                    <span key={item.step}>{pin}</span>
                  );
                })}
              </div>

              <ol className="relative z-10 mx-auto mt-8 grid max-w-4xl grid-cols-5 gap-3">
                {siteConfig.workProcess.map((item, i) => (
                  <li key={item.step} className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                      Stop {item.step}
                    </p>
                    {i === 0 ? (
                      <a
                        href="/#contact"
                        className="link-underline mt-2 inline-block display text-base leading-tight md:text-lg"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <p className="mt-2 display text-base leading-tight md:text-lg">
                        {item.title}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            {/* mobile: vertical route with planted pins */}
            <div className="relative px-6 py-10 md:hidden">
              {/* dashed path through pin tips (center of w-12 pin column) */}
              <motion.div
                aria-hidden
                className="absolute left-[3rem] top-[calc(2.5rem+4rem-2px)] bottom-[calc(2.5rem)] w-[2.5px] origin-top -translate-x-1/2"
                style={{
                  background:
                    "linear-gradient(180deg, #ff8a3d 0%, #ff3d77 35%, #a855f7 70%, #4f7cff 100%)",
                  WebkitMaskImage:
                    "repeating-linear-gradient(to bottom, #000 0 7px, transparent 7px 14px)",
                  maskImage:
                    "repeating-linear-gradient(to bottom, #000 0 7px, transparent 7px 14px)",
                }}
                initial={{ scaleY: 0, opacity: 0.55 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
              />

              <ol className="relative z-10 space-y-10">
                {siteConfig.workProcess.map((item, i) => {
                  const isFirst = i === 0;
                  const isLast = i === siteConfig.workProcess.length - 1;
                  const pinColor = isFirst
                    ? "#ff8a3d"
                    : isLast
                      ? "#4f7cff"
                      : i === 2
                        ? "#a855f7"
                        : "#ff3d77";

                  const body = (
                    <div className="flex items-end gap-5">
                      <span className="relative z-10">
                        <MapPin
                          color={pinColor}
                          label={item.step}
                          flag={isLast}
                        />
                      </span>
                      <div className="pb-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                          Stop {item.step}
                        </p>
                        <p className="mt-1.5 display text-xl leading-tight">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  );

                  return (
                    <li key={item.step}>
                      {isFirst ? <a href="/#contact">{body}</a> : body}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </FadeUp>
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
