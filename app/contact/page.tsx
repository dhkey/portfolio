import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { person } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Denys Yazan - email, phone, LinkedIn and GitHub. Based in Prague, open to new opportunities and collaboration.",
};

const rows: { key: string; value: React.ReactNode }[] = [
  {
    key: "email",
    value: (
      <a className="link" href={`mailto:${person.email}`}>
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
  {
    key: "linkedin",
    value: (
      <a className="link" href={person.linkedin} target="_blank" rel="noopener noreferrer">
        {person.linkedinHandle} <span className="arrow">↗</span>
      </a>
    ),
  },
  {
    key: "github",
    value: (
      <a className="link" href={person.github} target="_blank" rel="noopener noreferrer">
        {person.githubHandle} <span className="arrow">↗</span>
      </a>
    ),
  },
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

        <section className="stack-s">
          <h2 className="section-head">let&rsquo;s work together</h2>
          <div className="chip-row">
            <a className="chip" href={`mailto:${person.email}`}>
              ./send-email
            </a>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
