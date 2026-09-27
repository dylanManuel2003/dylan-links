export type TrackType = "view" | "click";

export function track(type: TrackType, link?: string) {
  try {
    const body = JSON.stringify({ type, link });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
      return;
    }
    fetch("/api/track", {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    });
  } catch {
    // el tracking nunca debe romper la UX
  }
}
