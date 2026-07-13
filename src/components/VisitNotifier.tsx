"use client";

import { useEffect } from "react";

const SESSION_KEY = "yc-visit-notified";

function devicePlatform() {
  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };
  return nav.userAgentData?.platform || nav.platform || "unknown";
}

/** Fires once per browser tab session — emails you device/visit clues (not their email). */
export default function VisitNotifier() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, "1");

    const payload = {
      path: window.location.pathname + window.location.search,
      referrer: document.referrer || "Direct / unknown",
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: `${window.screen.width}×${window.screen.height}`,
      viewport: `${window.innerWidth}×${window.innerHeight}`,
      platform: devicePlatform(),
      userAgent: navigator.userAgent,
    };

    // fire-and-forget; never block the UI
    void fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}
