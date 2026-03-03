"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getSessionId() {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem("etqan-sid");
  if (!sid) {
    sid = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem("etqan-sid", sid);
  }
  return sid;
}

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin pages
    if (pathname.startsWith("/admin")) return;

    const sessionId = getSessionId();
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer || null,
        sessionId,
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
