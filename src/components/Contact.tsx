"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/data";
import { FadeUp, Reveal } from "./ScrollFx";

const socials = [
  { label: "GitHub", href: siteConfig.socials.github },
  { label: "LinkedIn", href: siteConfig.socials.linkedin },
  { label: "Instagram", href: siteConfig.socials.instagram },
];

const inputClass =
  "w-full border-b border-black/20 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-black/40 focus:border-black";

export default function Contact() {
  const year = new Date().getFullYear();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  /* no backend — hand the message to the visitor's mail client */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry — ${form.name || "hello"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <footer
      id="contact"
      className="relative mt-10 overflow-hidden rounded-t-[2.5rem] bg-[#f3f3ee] px-6 pb-8 pt-24 text-[#111] md:px-10 md:pt-32"
    >
      {/* floating shapes like the reference's contact section */}
      <span aria-hidden className="floaty pointer-events-none absolute right-[6%] top-[10%] select-none text-5xl md:text-7xl" style={{ "--float-dur": "6.5s" } as React.CSSProperties}>
        ⚡
      </span>
      <span aria-hidden className="floaty pointer-events-none absolute left-[4%] bottom-[30%] select-none text-4xl md:text-6xl" style={{ "--float-dur": "8s", "--float-delay": "1s" } as React.CSSProperties}>
        💜
      </span>

      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:gap-10">
        <div>
          <h2 className="display text-[15vw] leading-[0.95] md:text-[6.5vw]">
            <Reveal>Let&apos;s</Reveal>
            <Reveal delay={0.08}>Get in</Reveal>
            <Reveal delay={0.16}>Touch</Reveal>
          </h2>
          <FadeUp delay={0.25} className="mt-8">
            <a
              href={`mailto:${siteConfig.email}`}
              className="link-underline text-base font-medium md:text-xl"
            >
              {siteConfig.email}
            </a>
            <p className="mt-3 text-sm text-black/50">
              {siteConfig.phone} · {siteConfig.location}
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.15}>
          <form onSubmit={handleSubmit} className="space-y-6 md:pt-4">
            <input
              type="text"
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
            <input
              type="email"
              required
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
            <textarea
              required
              rows={4}
              placeholder="Tell me about your project…"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputClass} resize-none`}
            />
            <button
              type="submit"
              className="grad-pill rounded-full px-10 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white"
            >
              Send
            </button>
          </form>
        </FadeUp>
      </div>

      <div className="mx-auto mt-24 flex max-w-6xl flex-col justify-between gap-6 border-t border-black/15 pt-8 md:flex-row md:items-center">
        <div className="flex gap-7">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-xs font-semibold uppercase tracking-[0.18em] text-black/60 transition-colors hover:text-black"
            >
              {s.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-black/50">
          © {year} {siteConfig.name} — {siteConfig.location}
        </p>
      </div>
    </footer>
  );
}
