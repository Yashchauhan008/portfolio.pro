"use client";

import { useId } from "react";

/* decorative icons drawn with the site gradient (--grad) so the floating
   shapes read as part of the design system instead of OS emojis */

type IconProps = { className?: string };

const GRAD_STOPS = (
  <>
    <stop offset="0%" stopColor="#ff8a3d" />
    <stop offset="34%" stopColor="#ff3d77" />
    <stop offset="68%" stopColor="#a855f7" />
    <stop offset="100%" stopColor="#4f7cff" />
  </>
);

function Grad({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
        {GRAD_STOPS}
      </linearGradient>
    </defs>
  );
}

export function SparkleIcon({ className }: IconProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <Grad id={id} />
      <path
        d="M32 2c2.2 16.4 13.6 27.8 30 30-16.4 2.2-27.8 13.6-30 30-2.2-16.4-13.6-27.8-30-30C18.4 29.8 29.8 18.4 32 2Z"
        fill={`url(#${id})`}
      />
    </svg>
  );
}

export function OrbIcon({ className }: IconProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <defs>
        <radialGradient id={id} cx="32%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#ffb1cf" />
          <stop offset="45%" stopColor="#ff3d77" />
          <stop offset="80%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#4f7cff" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill={`url(#${id})`} />
      <ellipse cx="23" cy="20" rx="9" ry="5.5" fill="#fff" opacity="0.45" transform="rotate(-24 23 20)" />
    </svg>
  );
}

export function DiscIcon({ className }: IconProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <Grad id={id} />
      <path
        fillRule="evenodd"
        d="M32 2a30 30 0 1 1 0 60 30 30 0 0 1 0-60Zm0 22a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"
        fill={`url(#${id})`}
      />
      <circle cx="32" cy="32" r="19" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="14" stroke="#fff" strokeOpacity="0.2" strokeWidth="1.5" />
    </svg>
  );
}

export function BoltIcon({ className }: IconProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <Grad id={id} />
      <path d="M37 2 8 36h17.5L27 62l29-34H38.5L37 2Z" fill={`url(#${id})`} />
    </svg>
  );
}

export function FlowerIcon({ className }: IconProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <Grad id={id} />
      <g fill={`url(#${id})`}>
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse key={deg} cx="32" cy="15" rx="8.5" ry="14" transform={`rotate(${deg} 32 32)`} />
        ))}
      </g>
      <circle cx="32" cy="32" r="8" fill="#ffcf6b" />
    </svg>
  );
}

export function RingIcon({ className }: IconProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <Grad id={id} />
      <circle cx="32" cy="32" r="24" stroke={`url(#${id})`} strokeWidth="11" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <Grad id={id} />
      <path
        d="M32 58C13.5 44 4 31.6 4 19.5 4 9.8 11.4 3 19.8 3 25.4 3 30 6.2 32 11c2-4.8 6.6-8 12.2-8C52.6 3 60 9.8 60 19.5 60 31.6 50.5 44 32 58Z"
        fill={`url(#${id})`}
      />
    </svg>
  );
}

export function RocketIcon({ className }: IconProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <Grad id={id} />
      <path d="M18 37 8 51l11-2.5V37H18Z" fill="#a855f7" />
      <path d="M46 37l10 14-11-2.5V37h1Z" fill="#4f7cff" />
      <path d="M26 48c0 8 6 14 6 14s6-6 6-14H26Z" fill="#ff8a3d" />
      <path
        d="M32 2c9.6 7.8 14 19 14 29v17H18V31C18 21 22.4 9.8 32 2Z"
        fill={`url(#${id})`}
      />
      <circle cx="32" cy="24" r="6" fill="#0a0a0a" />
      <circle cx="32" cy="24" r="6" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" />
    </svg>
  );
}

export function TrophyIcon({ className }: IconProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <Grad id={id} />
      <path
        d="M17 8c-6 0-11 4-11 10.5C6 25 11 29.5 18 30M47 8c6 0 11 4 11 10.5C58 25 53 29.5 46 30"
        stroke={`url(#${id})`}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M17 4h30v17c0 10-6.5 17-15 17s-15-7-15-17V4Z"
        fill={`url(#${id})`}
      />
      <path d="M28 38h8v8h-8v-8Z" fill="#a855f7" />
      <rect x="20" y="46" width="24" height="8" rx="2.5" fill={`url(#${id})`} />
    </svg>
  );
}
