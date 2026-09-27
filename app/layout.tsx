import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const url = "https://dylan-links-seven.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: "Dylan Peralta · Links",
  description: "Emprendedor & Dev. Todos mis links en un solo lugar.",
  openGraph: {
    title: "Dylan Peralta · Links",
    description: "Emprendedor & Dev. Todos mis links en un solo lugar.",
    url,
    images: [{ url: "/avatar.jpg", width: 800, height: 800, alt: "Dylan Peralta" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dylan Peralta · Links",
    description: "Emprendedor & Dev. Todos mis links en un solo lugar.",
    images: ["/avatar.jpg"],
  },
  icons: { icon: "/avatar.jpg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
