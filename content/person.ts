const city = "Prague";
const country = "Czech Republic";

export const person = {
  name: "denys yazan",
  displayName: "Denys Yazan",
  role: "software engineer · systems architect",
  city,
  countryCode: "CZ",
  location: `${city}, ${country}`,
  host: "yazan",
  user: "denys",
  tagline: "I design and ship full-stack products end to end - Next.js frontends, Python backends on Django and FastAPI, REST APIs and the infrastructure under them.",
  status: "Software Engineer Intern at make.com · studying Software Engineering at CTU Prague.",
  email: "denys-work@seznam.cz",
  phone: "+420 722 133 964",
  github: "https://github.com/dhkey",
  githubHandle: "github.com/dhkey",
  linkedin: "https://www.linkedin.com/in/denys-yazan",
  linkedinHandle: "linkedin.com/in/denys-yazan",
  avatar: "/denys.jpg",
};

export const contacts: { key: string; label: string; href?: string }[] = [
  { key: "email", label: person.email, href: `mailto:${person.email}` },
  { key: "phone", label: person.phone, href: `tel:${person.phone.replace(/\s/g, "")}` },
  { key: "location", label: person.location },
  { key: "linkedin", label: person.linkedinHandle, href: person.linkedin },
  { key: "github", label: person.githubHandle, href: person.github },
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
