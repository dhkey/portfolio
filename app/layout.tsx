import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Terminal } from "@/components/Terminal";
import { person } from "@/content/person";
import { seo, siteUrl } from "@/content/site";
import "@/styles/globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: `%s - ${person.displayName}`},
  description: seo.description,
  authors: [{ name: person.displayName, url: siteUrl }],
  creator: person.displayName,
  keywords: seo.keywords,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
