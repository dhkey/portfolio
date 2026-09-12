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
    "Denys Yazan - Software Engineer & Systems Architect in Prague. Full-stack engineer building Next.js frontends, Python APIs on Django and FastAPI, Telegram bots and the infrastructure behind them. Software Engineer Intern at make.com.",
  authors: [{ name: person.displayName, url: siteUrl }],
  creator: person.displayName,
  keywords: [
    "Denys Yazan", "software engineer", "Prague", "full-stack",
    "Next.js", "React", "TypeScript", "Python", "Django", "FastAPI",
    "Telegram bots", "systems architect",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: person.displayName,
    title: `${person.displayName} - Software Engineer & Systems Architect`,
    description:
      "Full-stack engineer in Prague building Next.js frontends, Python APIs on Django and FastAPI, Telegram bots and the infrastructure behind them. Software Engineer Intern at make.com.",
  },
  twitter: {
    card: "summary",
    title: `${person.displayName} - Software Engineer & Systems Architect`,
    description:
      "Full-stack engineer in Prague building Next.js frontends, Python APIs on Django and FastAPI, and Telegram bots.",
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
