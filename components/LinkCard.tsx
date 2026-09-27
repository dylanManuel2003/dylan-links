"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { LinkItem } from "@/lib/links";
import { track } from "@/lib/analytics";
import {
  ArrowIcon,
  InstagramIcon,
  LinkedInIcon,
  TerminalIcon,
  WhatsAppIcon,
} from "./icons";

function Glyph({ icon }: { icon: LinkItem["icon"] }) {
  const cls = "h-5 w-5";
  switch (icon) {
    case "scalo":
      return (
        <Image
          src="/scalo.png"
          alt=""
          width={22}
          height={22}
          className="h-5 w-5 object-contain"
        />
      );
    case "portfolio":
      return <TerminalIcon className={cls} />;
    case "linkedin":
      return <LinkedInIcon className={cls} />;
    case "whatsapp":
      return <WhatsAppIcon className={cls} />;
    case "instagram":
      return <InstagramIcon className={cls} />;
  }
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function LinkCard({ link }: { link: LinkItem }) {
  const reduce = useReducedMotion();

  return (
    <motion.a
      variants={item}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("click", link.label)}
      whileHover={reduce ? undefined : { y: -3 }}
      whileTap={reduce ? undefined : { scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-border bg-card/70 px-4 py-3.5 backdrop-blur-sm transition-colors hover:border-accent/60 hover:bg-card"
    >
      {/* sheen que barre en hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-accent/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-bg/60 text-fg transition-colors group-hover:border-accent/50 group-hover:text-accent">
        <Glyph icon={link.icon} />
      </span>

      <span className="flex min-w-0 flex-col">
        <span className="font-sans text-[15px] font-semibold leading-tight text-fg">
          {link.label}
        </span>
        <span className="truncate text-xs text-muted">{link.sub}</span>
      </span>

      <ArrowIcon className="ml-auto h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
    </motion.a>
  );
}
