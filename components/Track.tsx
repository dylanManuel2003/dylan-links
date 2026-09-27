"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export default function Track() {
  useEffect(() => {
    const KEY = "dp_viewed";
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, "1");
    track("view");
  }, []);

  return null;
}
