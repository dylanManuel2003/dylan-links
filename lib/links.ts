export type LinkIcon =
  | "scalo"
  | "portfolio"
  | "linkedin"
  | "whatsapp"
  | "instagram";

export type LinkItem = {
  label: string;
  sub: string;
  href: string;
  icon: LinkIcon;
};

export const links: LinkItem[] = [
  {
    label: "Scalo",
    sub: "Sistemas & Marketing",
    href: "https://scalo.tech",
    icon: "scalo",
  },
  {
    label: "Portfolio",
    sub: "Quién soy y qué estoy construyendo",
    href: "https://dylanpe.vercel.app/",
    icon: "portfolio",
  },
  {
    label: "LinkedIn",
    sub: "Conectemos",
    href: "https://www.linkedin.com/in/dylan-peralta-a947a4217/",
    icon: "linkedin",
  },
  {
    label: "WhatsApp",
    sub: "Charlemos",
    href: "https://wa.me/3515578148?text=Hola%2C%20quiero%20charlar%20contigo",
    icon: "whatsapp",
  },
  {
    label: "Instagram",
    sub: "@dylanpe_",
    href: "https://www.instagram.com/dylanpe_",
    icon: "instagram",
  },
];
