export type Project = {
  name: string;
  type: ProjectType;
  summary: string;
  tags: string[];
  href: string;
  linkLabel: string;
};

export type ProjectType = (typeof projectTypes)[number];

export const projectTypes = ["web", "macos", "bot"] as const;

export const projects: Project[] = [
  {
    name: "smstogo.net",
    type: "web",
    summary:
      "SMS verification platform built from zero - Next.js frontend, FastAPI backend on PostgreSQL, custom auth system, public API, payment gateway integration and CDN setup.",
    tags: ["next.js", "fastapi", "postgresql", "payments"],
    href: "https://smstogo.net",
    linkLabel: "smstogo.net",
  },
  {
    name: "Beacon - Better MacOS's Spotlight.",
    type: "macos",
    summary:
      "Native macOS application launcher. Menu-bar SwiftUI/AppKit app with a global hotkey, diacritic-insensitive fuzzy search across installed apps, keyboard navigation and web-search fallback - shipped as universal DMG/PKG builds from a tagged GitHub Actions release pipeline.",
    tags: ["swift", "swiftui", "macos", "desktop", "next.js", "react", "typescript", "static-site"],
    href: "https://beacon.denys-yazan.dev",
    linkLabel: "beacon.denys-yazan.dev",
  },
  {
    name: "fabrics.od.ua",
    type: "web",
    summary:
      "Full-stack e-commerce site for a fabric store. Built with Django, featuring automated product parsing and migration from the legacy website.",
    tags: ["python", "django", "web-scraping", "full-stack"],
    href: "https://fabrics.od.ua",
    linkLabel: "fabrics.od.ua",
  },
  {
    name: "denys-yazan.dev",
    type: "web",
    summary:
      "This site. Terminal-styled personal portfolio with an interactive prompt - ls, cd, tab completion and history. Next.js App Router on React 19 and TypeScript, fully prerendered, no dependencies beyond the framework.",
    tags: ["next.js", "react", "typescript", "static-site"],
    href: "https://denys-yazan.dev",
    linkLabel: "denys-yazan.dev",
  },
  {
    name: "stav-pro.cz",
    type: "web",
    summary:
      "Single-page promotional site for a construction company. Custom responsive UI plus an integration that pipes contact form submissions straight into a Telegram chat.",
    tags: ["html/css", "javascript", "telegram-api", "landing"],
    href: "https://stav-pro.cz",
    linkLabel: "stav-pro.cz",
  },
  {
    name: "SideMouseButtons",
    type: "macos",
    summary:
      "macOS utility for remapping the side mouse buttons - switch between desktops or bind custom actions and hotkeys without reaching for the keyboard.",
    tags: ["swift", "macos", "desktop", "automation"],
    href: "https://github.com/dhkey/SideMouseButtons",
    linkLabel: "github.com/dhkey/SideMouseButtons",
  },
  {
    name: "sms-ready.com",
    type: "web",
    summary:
      "SMS verification platform. Designed and built the complete product - design, frontend, backend, API provision, payment gateway and email system.",
    tags: ["python", "django", "rest-api", "payments"],
    href: "https://sms-ready.com",
    linkLabel: "sms-ready.com",
  },
  {
    name: "smscheck.net",
    type: "web",
    summary:
      "SMS verification service sharing the sms-ready.com architecture. Full design, frontend, backend and integration stack built independently.",
    tags: ["python", "django", "rest-api", "payments"],
    href: "https://smscheck.net",
    linkLabel: "smscheck.net",
  },
  {
    name: "@fabricscomuaBot",
    type: "bot",
    summary:
      "AI support bot for fabrics.od.ua. Answers customer questions about the full product catalogue pulled live from the website database.",
    tags: ["python", "telegram-api", "chatgpt", "openai"],
    href: "https://t.me/fabricscomuaBot",
    linkLabel: "t.me/fabricscomuaBot",
  },
  {
    name: "@Rubedohealth_platformbot",
    type: "bot",
    summary:
      "Telegram bot selling paid access to private channels. Automated subscription management with WayForPay payment integration.",
    tags: ["python", "asyncio", "telegram-api", "wayforpay"],
    href: "https://t.me/Rubedohealth_platformbot",
    linkLabel: "t.me/Rubedohealth_platformbot",
  },
  {
    name: "@SonsOfWar_UA_bot",
    type: "bot",
    summary:
      "E-commerce Telegram bot with a full product catalogue, shopping cart flow and automated order processing.",
    tags: ["python", "asyncio", "telegram-api", "e-commerce"],
    href: "https://t.me/SonsOfWar_UA_bot",
    linkLabel: "t.me/SonsOfWar_UA_bot",
  },
  {
    name: "@sms_usa_bot",
    type: "bot",
    summary:
      "Telegram bot backend for US SMS verification, wired into the same core API infrastructure as sms-ready.com.",
    tags: ["python", "asyncio", "telegram-api"],
    href: "https://t.me/sms_usa_bot",
    linkLabel: "t.me/sms_usa_bot",
  },
  {
    name: "@codes_verify_bot",
    type: "bot",
    summary:
      "Telegram bot for code verification. Backend built on shared API infrastructure for real-time code delivery.",
    tags: ["python", "asyncio", "telegram-api"],
    href: "https://t.me/codes_verify_bot",
    linkLabel: "t.me/codes_verify_bot",
  },
];
