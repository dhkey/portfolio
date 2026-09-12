import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { skillGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Languages, frameworks, infrastructure and engineering practices Denys Yazan works with - Next.js, React, TypeScript, Python, Django, FastAPI, Docker, PostgreSQL and more.",
};

export default function Skills() {
  return (
    <PageShell
      path="~/skills"
      cmd="cat stack.txt"
      title="skills"
      intro="The tools I reach for, grouped by what they are for."
    >
      <div className="stack-m">
        {skillGroups.map((group) => (
          <Section key={group.label} label={group.label}>
            <ul className="chip-row">
              {group.items.map((item) => (
                <li key={item} className="chip" data-variant="ghost">
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        ))}
      </div>
    </PageShell>
  );
}
