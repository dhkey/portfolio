export const person = {
  name: "denys yazan",
  displayName: "Denys Yazan",
  role: "software engineer · systems architect",
  location: "Prague, Czech Republic",
  host: "yazan",
  user: "denys",
  tagline:
    "I design and ship full-stack products end to end - Next.js frontends, Python backends on Django and FastAPI, REST APIs and the infrastructure under them.",
  status: "Software Engineer Intern at make.com · studying Software Engineering at CTU Prague.",
  email: "denys-work@seznam.cz",
  phone: "+420 722 133 964",
  github: "https://github.com/dhkey",
  githubHandle: "github.com/dhkey",
  linkedin: "https://www.linkedin.com/in/denys-yazan",
  linkedinHandle: "linkedin.com/in/denys-yazan",
  avatar: "/denys.jpg",
};

export type Project = {
  name: string;
  summary: string;
  tags: string[];
  href: string;
  linkLabel: string;
};

export const projects: Project[] = [
  {
    name: "smstogo.net",
    summary:
      "SMS verification platform built from zero - Next.js frontend, FastAPI backend on PostgreSQL, custom auth system, public API, payment gateway integration and CDN setup.",
    tags: ["next.js", "fastapi", "postgresql", "payments"],
    href: "https://smstogo.net",
    linkLabel: "smstogo.net",
  },
  {
    name: "fabrics.od.ua",
    summary:
      "Full-stack e-commerce site for a fabric store. Built with Django, featuring automated product parsing and migration from the legacy website.",
    tags: ["python", "django", "web-scraping", "full-stack"],
    href: "https://fabrics.od.ua",
    linkLabel: "fabrics.od.ua",
  },
  {
    name: "denys-yazan.lol",
    summary:
      "This site. Terminal-styled personal portfolio with an interactive prompt - ls, cd, tab completion and history. Next.js App Router on React 19 and TypeScript, fully prerendered, no dependencies beyond the framework.",
    tags: ["next.js", "react", "typescript", "static-site"],
    href: "https://denys-yazan.lol",
    linkLabel: "denys-yazan.lol",
  },
  {
    name: "stav-pro.cz",
    summary:
      "Single-page promotional site for a construction company. Custom responsive UI plus an integration that pipes contact form submissions straight into a Telegram chat.",
    tags: ["html/css", "javascript", "telegram-api", "landing"],
    href: "https://stav-pro.cz",
    linkLabel: "stav-pro.cz",
  },
  {
    name: "sms-ready.com",
    summary:
      "SMS verification platform. Designed and built the complete product - design, frontend, backend, API provision, payment gateway and email system.",
    tags: ["python", "django", "rest-api", "payments"],
    href: "https://sms-ready.com",
    linkLabel: "sms-ready.com",
  },
  {
    name: "smscheck.net",
    summary:
      "SMS verification service sharing the sms-ready.com architecture. Full design, frontend, backend and integration stack built independently.",
    tags: ["python", "django", "rest-api", "payments"],
    href: "https://smscheck.net",
    linkLabel: "smscheck.net",
  },
  {
    name: "@fabricscomuaBot",
    summary:
      "AI support bot for fabrics.od.ua. Answers customer questions about the full product catalogue pulled live from the website database.",
    tags: ["python", "telegram-api", "chatgpt", "openai"],
    href: "https://t.me/fabricscomuaBot",
    linkLabel: "t.me/fabricscomuaBot",
  },
  {
    name: "@Rubedohealth_platformbot",
    summary:
      "Telegram bot selling paid access to private channels. Automated subscription management with WayForPay payment integration.",
    tags: ["python", "asyncio", "telegram-api", "wayforpay"],
    href: "https://t.me/Rubedohealth_platformbot",
    linkLabel: "t.me/Rubedohealth_platformbot",
  },
  {
    name: "@SonsOfWar_UA_bot",
    summary:
      "E-commerce Telegram bot with a full product catalogue, shopping cart flow and automated order processing.",
    tags: ["python", "asyncio", "telegram-api", "e-commerce"],
    href: "https://t.me/SonsOfWar_UA_bot",
    linkLabel: "t.me/SonsOfWar_UA_bot",
  },
  {
    name: "@sms_usa_bot",
    summary:
      "Telegram bot backend for US SMS verification, wired into the same core API infrastructure as sms-ready.com.",
    tags: ["python", "asyncio", "telegram-api"],
    href: "https://t.me/sms_usa_bot",
    linkLabel: "t.me/sms_usa_bot",
  },
  {
    name: "@codes_verify_bot",
    summary:
      "Telegram bot for code verification. Backend built on shared API infrastructure for real-time code delivery.",
    tags: ["python", "asyncio", "telegram-api"],
    href: "https://t.me/codes_verify_bot",
    linkLabel: "t.me/codes_verify_bot",
  },
  {
    name: "SideMouseButtons",
    summary:
      "Desktop utility for remapping side mouse buttons to custom actions and hotkeys for faster workflow automation.",
    tags: ["c++", "desktop", "automation"],
    href: "https://github.com/dhkey/SideMouseButtons",
    linkLabel: "github.com/dhkey/SideMouseButtons",
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "languages",
    items: [
      "Python", "C++", "Java", "Swift", "PHP", "JavaScript",
      "TypeScript", "Bash / Shell", "SQL", "HTML / CSS",
    ],
  },
  {
    label: "frameworks",
    items: [
      "Next.js", "React", "Django", "FastAPI", "Flask",
      "Spring Boot", "Qt", "SwiftUI / UIKit", "Asyncio",
      "Aiogram", "Jinja2",
    ],
  },
  {
    label: "infra",
    items: [
      "Docker & CI/CD", "Git & Linux", "Nginx", "PostgreSQL / MySQL",
      "Redis", "REST / GraphQL", "Payment systems", "SQL / NoSQL",
    ],
  },
  {
    label: "practices",
    items: [
      "Clean architecture", "SOLID", "Design patterns", "System design",
      "API design", "Agile / Scrum", "Code review", "Debugging & profiling",
    ],
  },
];

export const about = {
  bio: [
    "Software developer and systems architect with hands-on experience designing, building and shipping complex high-performance applications - independently, end to end.",
    "I work across the stack - Next.js and TypeScript on the front, Python on Django and FastAPI behind it - with a strong emphasis on clean architecture, scalable systems and long-term reliability. Currently studying Software Engineering at CTU Prague while working as a Software Engineer Intern at make.com, growing inside a team environment.",
  ],
};

export type TimelineEntry = { period: string; title: string; detail: string };

export const experience: TimelineEntry[] = [
  {
    period: "may 2026 - now",
    title: "make.com",
    detail: "Software Engineer Intern",
  },
];

export const education: TimelineEntry[] = [
  {
    period: "2025 - 2028",
    title: "Czech Technical University in Prague",
    detail: "Software Engineering",
  },
  {
    period: "2024 - 2028",
    title: "Central Ukrainian Technical University",
    detail: "Cybersecurity",
  },
];

export const languages: { name: string; level: string }[] = [
  { name: "English", level: "B2" },
  { name: "Czech", level: "B2" },
  { name: "Ukrainian", level: "native" },
  { name: "Russian", level: "native" },
];

export const routes: { path: string; label: string }[] = [
  { path: "/projects", label: "what I have shipped" },
  { path: "/skills", label: "the toolkit" },
  { path: "/about", label: "background" },
  { path: "/contact", label: "how to reach me" },
];

export const externals: { path: string; href: string }[] = [
  { path: "/github", href: person.github },
  { path: "/linkedin", href: person.linkedin },
  { path: "/email", href: `mailto:${person.email}` },
];

export const siteUrl = "https://denys-yazan.lol";
