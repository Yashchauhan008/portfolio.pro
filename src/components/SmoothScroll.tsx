"use client";

import { useLayoutEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import VisitNotifier from "./VisitNotifier";

/** Jump to the top before anything can be revealed, so a page opened from a
 * scrolled-down page starts (and builds) at its top, not where the old page
 * left the scrollbar. Layout effects run before the reveal observers do. */
function TopOnMount() {
  const lenis = useLenis();
  useLayoutEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [lenis]);
  return null;
}

export default function SmoothScroll({
  children,
  startAtTop = false,
}: {
  children: React.ReactNode;
  startAtTop?: boolean;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.4 }}>
      {startAtTop && <TopOnMount />}
      <VisitNotifier />
      {children}
    </ReactLenis>
  );
}
