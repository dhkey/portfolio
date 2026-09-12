import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/PageShell";
import { person, about, experience, education, languages } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Denys Yazan - software engineer and systems architect in Prague. Software Engineer Intern at make.com, studying Software Engineering at CTU Prague.",
};

export default function About() {
  return (
    <PageShell
      path="~/about"
      cmd="cat about.md"
      title="about"
    >
      <div className="stack-m">
        <section className="bio">
          <Image
            className="avatar"
            src={person.avatar}
            alt={`Portrait of ${person.displayName}`}
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

        <section className="stack-s">
          <h2 className="section-head">experience</h2>
          <ul className="tl-list">
            {experience.map((e) => (
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
        </section>

        <section className="stack-s">
          <h2 className="section-head">education</h2>
          <ul className="tl-list">
            {education.map((e) => (
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
        </section>

        <section className="stack-s">
          <h2 className="section-head">languages</h2>
          <ul className="kv-list">
            {languages.map((l) => (
              <li key={l.name} className="kv">
                <span className="kv-key">{l.name.toLowerCase()}</span>
                <span className="kv-lead" aria-hidden="true" />
                <span className="kv-val">{l.level}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
