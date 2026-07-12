"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

const links = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#work" },
  { label: "Journey", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 300);
    setScrolled(y > 40);
  });

  useEffect(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: hidden ? -90 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1], delay: hidden ? 0 : 1.3 }}
      className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-line" : ""
      }`}
    >
      {/* links spread edge-to-edge like the reference */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-16">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/80 transition-colors duration-300 hover:text-foreground md:text-[11px]"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
