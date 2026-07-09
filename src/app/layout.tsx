import type { Metadata } from "next";
import { Anton, Geist } from "next/font/google";
import { siteConfig } from "@/lib/data";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Fullstack Developer`,
    template: `%s — ${siteConfig.name}`,
  },
  description:
    "Yash Chauhan is a fullstack developer from Gujarat, India, building scalable web applications with React, Next.js, and Node.js — from enterprise inventory systems to expressive UI component libraries.",
  keywords: [
    "Yash Chauhan",
    "Fullstack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer Gujarat",
    "MERN Stack Developer",
    "UI/UX",
    "Freelance Web Developer India",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Fullstack Developer`,
    description:
      "Fullstack developer crafting scalable web applications with precision & soul. React, Next.js, Node.js, and motion design.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Fullstack Developer`,
    description:
      "Fullstack developer crafting scalable web applications with precision & soul.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: "Fullstack Developer",
  email: `mailto:${siteConfig.email}`,
  url: siteConfig.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Morbi",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Darshan University, Rajkot",
  },
  sameAs: [
    siteConfig.socials.github,
    siteConfig.socials.linkedin,
    siteConfig.socials.instagram,
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "UI/UX Design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${anton.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
