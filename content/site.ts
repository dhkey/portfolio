import { person } from "./person";

export const routes: { path: string; label: string }[] = [
  { path: "/projects", label: "what I have shipped" },
  { path: "/blog", label: "notes and write-ups" },
  { path: "/skills", label: "the toolkit" },
  { path: "/about", label: "background" },
  { path: "/contact", label: "how to reach me" },
];

export const externals: { path: string; href: string }[] = [
  { path: "/github", href: person.github },
  { path: "/linkedin", href: person.linkedin },
  { path: "/email", href: `mailto:${person.email}` },
];

export const siteUrl = "https://denys-yazan.dev";

export const seo = {
  title: `${person.displayName} - Software Engineer & Systems Architect`,
  description:
    "Denys Yazan - Software Engineer & Systems Architect in Prague. Full-stack engineer building frontend, connecting it with the backend, Telegram bots and the infrastructure behind them. Software Engineer Intern at make.com.",
  keywords: [
    person.displayName,
    "software engineer",
    "Prague",
    "full-stack",
    "systems architect",
    "engineering",
  ],
};
