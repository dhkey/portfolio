import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Terminal } from "@/components/Terminal";
import { person, siteUrl } from "@/lib/content";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${person.displayName} - Software Engineer & Systems Architect`,
    template: `%s - ${person.displayName}`,
  },
  description:
    "Denys Yazan - Software Engineer & Systems Architect in Prague. Python/Django backend specialist building full-stack apps, Telegram bots and APIs. Software Engineer Intern at make.com.",
  authors: [{ name: person.displayName, url: siteUrl }],
  creator: person.displayName,
  keywords: [
    "Denys Yazan", "software engineer", "Prague", "Python", "Django",
    "backend developer", "Telegram bots", "full-stack", "systems architect",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: person.displayName,
    title: `${person.displayName} - Software Engineer & Systems Architect`,
    description:
      "Python/Django backend specialist in Prague building full-stack apps, Telegram bots and APIs. Software Engineer Intern at make.com.",
  },
  twitter: {
    card: "summary",
    title: `${person.displayName} - Software Engineer & Systems Architect`,
    description:
      "Python/Django backend specialist in Prague building full-stack apps, Telegram bots and APIs.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.displayName,
  jobTitle: "Software Engineer",
  email: `mailto:${person.email}`,
  telephone: person.phone,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Prague", addressCountry: "CZ" },
  sameAs: [person.github, person.linkedin],
  worksFor: { "@type": "Organization", name: "make.com" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Czech Technical University in Prague" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={mono.variable}>
      <body>
        <div className="shell">
          {children}
          <Terminal />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
