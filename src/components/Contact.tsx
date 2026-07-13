"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/data";
import { FadeUp, Reveal } from "./ScrollFx";
import { BoltIcon, HeartIcon } from "./Icons";

const socials = [
  { label: "GitHub", href: siteConfig.socials.github },
  { label: "LinkedIn", href: siteConfig.socials.linkedin },
  { label: "Instagram", href: siteConfig.socials.instagram },
];

const inputClass =
  "w-full border-b border-black/20 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-black/40 focus:border-black disabled:opacity-60";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const year = new Date().getFullYear();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setForm({ name: "", email: "", phone: "", message: "" });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <footer
      id="contact"
      className="relative mt-10 overflow-hidden rounded-t-[2.5rem] bg-[#f3f3ee] px-6 pb-8 pt-24 text-[#111] md:px-10 md:pt-32"
    >
      {/* floating shapes like the reference's contact section */}
      <span aria-hidden className="floaty pointer-events-none absolute right-[6%] top-[10%] block w-12 select-none md:w-[4.5rem]" style={{ "--float-dur": "6.5s" } as React.CSSProperties}>
        <BoltIcon className="h-auto w-full drop-shadow-[0_10px_24px_rgba(168,85,247,0.3)]" />
      </span>
      <span aria-hidden className="floaty pointer-events-none absolute left-[4%] bottom-[30%] block w-9 select-none md:w-14" style={{ "--float-dur": "8s", "--float-delay": "1s" } as React.CSSProperties}>
        <HeartIcon className="h-auto w-full drop-shadow-[0_10px_24px_rgba(255,61,119,0.3)]" />
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
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="link-underline transition-colors hover:text-black"
              >
                {siteConfig.phone}
              </a>
              {" · "}
              {siteConfig.location}
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.15}>
          <form onSubmit={handleSubmit} className="space-y-6 md:pt-4">
            <input
              type="text"
              required
              name="name"
              autoComplete="name"
              placeholder="Your name"
              value={form.name}
              disabled={status === "sending"}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
            <input
              type="email"
              required
              name="email"
              autoComplete="email"
              placeholder="Your email"
              value={form.email}
              disabled={status === "sending"}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
            <input
              type="tel"
              required
              name="phone"
              autoComplete="tel"
              placeholder="Your mobile number"
              value={form.phone}
              disabled={status === "sending"}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
            <textarea
              required
              name="message"
              rows={4}
              placeholder="Tell me about your project…"
              value={form.message}
              disabled={status === "sending"}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputClass} resize-none`}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <button
                type="submit"
                disabled={status === "sending"}
                className="grad-pill rounded-full px-10 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? "Sending…" : "Send"}
              </button>
              {status === "success" && (
                <p className="text-sm text-emerald-700" role="status">
                  Message sent — I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600" role="alert">
                  {errorMessage}
                </p>
              )}
            </div>
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
