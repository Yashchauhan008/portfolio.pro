"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { siteConfig } from "@/lib/data";

const EASE = [0.65, 0, 0.35, 1] as const;

const actions = [
  {
    label: "Home",
    href: "/#home",
    className: "bg-[#e8d5ff] text-[#1a0a28] hover:brightness-110",
  },
  {
    label: "See projects",
    href: "/projects",
    className: "bg-[#9be7a8] text-[#0f1f14] hover:brightness-110",
  },
  {
    label: "Download CV",
    href: siteConfig.resume,
    download: "yash-chauhan-resume.pdf",
    className: "bg-[#ffb28a] text-[#2a1208] hover:brightness-110",
  },
  {
    label: "Contact me",
    href: "/#contact",
    className: "bg-[#9ec5ff] text-[#0a1628] hover:brightness-110",
  },
] as const;

export default function QuickMenu() {
  const [open, setOpen] = useState(false);
  const [ringing, setRinging] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLButtonElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const magnetX = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const magnetY = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });
  const magnetScale = useSpring(1, { stiffness: 260, damping: 20 });

  const onBellMove = (e: React.MouseEvent) => {
    const rect = bellRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
    magnetScale.set(1.08);
  };

  const onBellLeave = () => {
    mx.set(0);
    my.set(0);
    magnetScale.set(1);
  };

  useEffect(() => {
    audioRef.current = new Audio("/sounds/bell4.mp3");
    audioRef.current.preload = "auto";
    audioRef.current.volume = 0.7;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const playBell = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => {});
    setRinging(true);
    window.setTimeout(() => setRinging(false), 650);
  }, []);

  const onBellClick = () => {
    playBell();
    setOpen((v) => !v);
  };

  const close = () => setOpen(false);

  return (
    <div className="fixed bottom-0 right-0 z-[90]">
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close guide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 cursor-pointer bg-black/55 backdrop-blur-[2px]"
              onClick={close}
            />

            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="guide-title"
              initial={{ opacity: 0, y: 72 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 56 }}
              transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.9 }}
              className="pointer-events-auto fixed inset-x-4 bottom-[5.5rem] z-[91] mx-auto max-w-3xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#121014] shadow-[0_30px_80px_rgba(0,0,0,0.55)] md:inset-x-auto md:right-8 md:bottom-28 md:w-[min(640px,calc(100vw-4rem))]"
            >
              {/* soft theme aura */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full opacity-40 blur-3xl"
                style={{ background: "var(--grad)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-[#4f7cff] opacity-25 blur-3xl"
              />

              <div className="relative p-5 md:p-7">
                <div className="mb-8 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 py-1.5 pl-1.5 pr-4 backdrop-blur-md">
                    <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                      <span aria-hidden className="grad-bg absolute inset-0" />
                      <span className="relative h-4 w-4">
                        <Image
                          src="/images/service-bell.png?v=2"
                          alt=""
                          fill
                          unoptimized
                          className="object-contain"
                          sizes="16px"
                        />
                      </span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/85">
                      Yash · guide
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-white/5 text-foreground/80 transition-colors hover:bg-white/10 hover:text-foreground"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path
                        d="M2 2l10 10M12 2 2 12"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                <h2
                  id="guide-title"
                  className="display text-4xl leading-[0.95] text-foreground md:text-5xl"
                >
                  Hello visitor
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/75 md:text-base">
                  I&apos;m {siteConfig.firstName}, your guide. What would you like
                  to do on my site?
                </p>

                <div className="mt-8 flex flex-wrap gap-2.5 md:gap-3">
                  {actions.map((action, i) => (
                    <motion.a
                      key={action.label}
                      href={action.href}
                      {...("download" in action && action.download
                        ? { download: action.download }
                        : {})}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.05, duration: 0.4, ease: EASE }}
                      onClick={close}
                      className={`inline-flex cursor-pointer items-center rounded-full px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] transition-[transform,filter] duration-300 hover:scale-[1.03] md:px-5 md:py-3 md:text-[11px] ${action.className}`}
                    >
                      {action.label}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed bottom-6 right-6 md:bottom-8 md:right-8">
        <motion.button
          ref={bellRef}
          type="button"
          aria-label={open ? "Close guide" : "Open guide — ring the bell"}
          aria-expanded={open}
          onClick={onBellClick}
          onMouseMove={onBellMove}
          onMouseLeave={onBellLeave}
          whileTap={{ scale: 0.92 }}
          style={{ x: magnetX, y: magnetY, scale: magnetScale }}
          className="pointer-events-auto relative z-[92] flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/20 text-white outline-none will-change-transform focus-visible:ring-2 focus-visible:ring-white/40 md:h-[4.5rem] md:w-[4.5rem]"
        >
          <span aria-hidden className="grad-bg absolute inset-0" />
          <motion.span
            className="relative z-10 -translate-y-0.5 block h-8 w-8"
            animate={
              ringing
                ? { rotate: [0, -18, 16, -12, 8, -4, 0], y: [0, -2, 0] }
                : { rotate: 0 }
            }
            transition={
              ringing
                ? { duration: 0.65, ease: "easeOut" }
                : { type: "spring", stiffness: 320, damping: 18 }
            }
          >
            <Image
              src="/images/service-bell.png?v=2"
              alt=""
              fill
              unoptimized
              priority
              className="object-contain"
              sizes="40px"
            />
          </motion.span>

          <AnimatePresence>
            {ringing && (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full border-2 border-white/50"
                initial={{ scale: 0.85, opacity: 0.7 }}
                animate={{ scale: 1.85, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: EASE }}
              />
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
