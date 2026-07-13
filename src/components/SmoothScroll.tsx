"use client";

import { ReactLenis } from "lenis/react";
import VisitNotifier from "./VisitNotifier";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.4 }}>
      <VisitNotifier />
      {children}
    </ReactLenis>
  );
}
