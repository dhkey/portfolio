import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import {
  person,
  about,
  experience,
  education,
  languages,
  type TimelineEntry,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Denys Yazan - software engineer and systems architect in Prague. Software Engineer Intern at make.com, studying Software Engineering at CTU Prague.",
};

/** Dated entries hung off a vertical spine; the first one gets the lit node. */
function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ul className="tl-list">
      {entries.map((e) => (
        <li key={e.title} className="tl">
          <span className="tl-period">{e.period}</span>
          <span>
            <span className="tl-title">{e.title}</span>
            <br />
            <span className="tl-detail">{e.detail}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function About() {
  return (
    <PageShell path="~/about" cmd="cat about.md" title="about">
      <div className="stack-m">
        <section className="bio">
          <Image
            className="avatar"
            src={person.avatar}
            alt={`Portrait of ${person.name}`}
            width={88}
            height={88}
            priority
          />
          <div className="stack-s prose">
            {about.bio.map((para) => (
              <p key={para.slice(0, 24)} className="muted">
                {para}
              </p>
            ))}
          </div>
        </section>

        <Section label="experience">
          <Timeline entries={experience} />
        </Section>

        <Section label="education">
          <Timeline entries={education} />
        </Section>

        <Section label="languages">
          <ul className="kv-list">
            {languages.map((l) => (
              <li key={l.name} className="kv">
                <span className="kv-key">{l.name.toLowerCase()}</span>
                <span className="kv-lead" aria-hidden="true" />
                <span className="kv-val">{l.level}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </PageShell>
  );
}
