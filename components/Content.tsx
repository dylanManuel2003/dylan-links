"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { links } from "@/lib/links";
import LinkCard from "./LinkCard";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Content() {
  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-5 py-16 sm:py-20"
    >
      {/* Avatar */}
      <motion.div variants={fadeUp} className="relative">
        <div className="absolute -inset-2 rounded-full bg-accent/20 blur-2xl" />
        <Image
          src="/avatar.jpg"
          alt="Dylan Peralta"
          width={112}
          height={112}
          priority
          className="relative h-28 w-28 rounded-full border border-border object-cover shadow-xl"
        />
        <span className="absolute bottom-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-bg bg-accent">
          <span className="h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        </span>
      </motion.div>

      {/* Nombre + bio */}
      <motion.h1
        variants={fadeUp}
        className="mt-5 font-sans text-2xl font-bold tracking-tight text-fg"
      >
        Dylan Peralta
      </motion.h1>
      <motion.p variants={fadeUp} className="mt-1 text-sm text-muted">
        <span className="text-accent">&gt;</span> Emprendedor & Dev
      </motion.p>

      {/* Links */}
      <div className="mt-9 flex w-full flex-col gap-3">
        {links.map((link) => (
          <LinkCard key={link.href} link={link} />
        ))}
      </div>

      <motion.footer
        variants={fadeUp}
        className="mt-12 text-center text-[11px] text-muted/70"
      >
        © {new Date().getFullYear()} Dylan Peralta · Córdoba, AR
      </motion.footer>
    </motion.main>
  );
}
