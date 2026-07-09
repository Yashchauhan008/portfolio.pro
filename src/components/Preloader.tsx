"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="display block text-4xl md:text-6xl"
            >
              Hi, I&apos;m <span className="grad-text">Yash</span>
            </motion.span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
