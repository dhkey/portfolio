import type { Metadata } from "next";
import { UrlLink } from "@/components/ExternalLink";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { mailto, person } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Denys Yazan - email, phone, LinkedIn and GitHub. Based in Prague, open to new opportunities and collaboration.",
};

const rows: { key: string; value: React.ReactNode }[] = [
  {
    key: "email",
    value: (
      <a className="link" href={mailto}>
        {person.email}
      </a>
    ),
  },
  {
    key: "phone",
    value: (
      <a className="link" href={`tel:${person.phone.replace(/\s/g, "")}`}>
        {person.phone}
      </a>
    ),
  },
  { key: "location", value: <span className="muted">{person.location}</span> },
  { key: "linkedin", value: <UrlLink href={person.linkedin} /> },
  { key: "github", value: <UrlLink href={person.github} /> },
];

export default function Contact() {
  return (
    <PageShell
      path="~/contact"
      cmd="cat contact.env"
      title="contact"
      intro="Open to new opportunities and collaboration. Always eager to learn from experienced engineers and sharpen my grasp of industry practice."
    >
      <div className="stack-m">
        <ul>
          {rows.map((r) => (
            <li key={r.key} className="kv">
              <span className="kv-key">{r.key}</span>
              <span className="kv-val">{r.value}</span>
            </li>
          ))}
        </ul>

        <Section label="let’s work together">
          <div className="chip-row">
            <a className="chip" href={mailto}>
              ./send-email
            </a>
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
