"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const LINES = [
  "> booting dp_os v1.0.0 ...",
  "> loading kernel modules ......... ok",
  "> mounting /profile .............. ok",
  "> decrypting identity ............ ok",
  "> uplink → scalo.tech ............ ok",
  "> ACCESS GRANTED",
];

const LINE_AT = [0, 280, 560, 840, 1180, 1600]; // ms
const TOTAL = 2200;

export default function BootSequence() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState(0);
  const finished = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || sessionStorage.getItem("dp_booted")) {
      setShow(false);
      return;
    }

    document.body.style.overflow = "hidden";
    const timers: ReturnType<typeof setTimeout>[] = [];

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      sessionStorage.setItem("dp_booted", "1");
      document.body.style.overflow = "";
      setShow(false);
    };

    LINE_AT.forEach((t, i) => timers.push(setTimeout(() => setLines(i + 1), t)));

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / (TOTAL - 250)) * 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    timers.push(setTimeout(finish, TOTAL));

    const skip = () => finish();
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          exit={{ opacity: 0, filter: "blur(6px)", scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="scanlines fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-[#05070c]"
        >
          <div className="boot-grid" />
          {/* viñeta */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 35%, #05070c 85%)",
            }}
          />

          <div className="relative z-10 flex w-full max-w-sm flex-col items-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glitch boot-flicker font-sans text-7xl font-extrabold tracking-tighter"
              data-text="dp"
            >
              dp
            </motion.div>

            {/* consola */}
            <div className="mt-8 h-28 w-full self-start text-left text-[12px] leading-relaxed text-accent/90">
              {LINES.slice(0, lines).map((l, i) => (
                <div
                  key={i}
                  className={
                    l.includes("ACCESS GRANTED")
                      ? "font-bold text-emerald-400"
                      : ""
                  }
                >
                  {l}
                  {i === lines - 1 && (
                    <span className="ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 animate-pulse bg-accent" />
                  )}
                </div>
              ))}
            </div>

            {/* barra de progreso */}
            <div className="mt-4 w-full">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[10px] uppercase tracking-widest text-muted">
                <span>loading</span>
                <span className="tabular-nums text-accent">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-muted/50">
              tap para saltar
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
