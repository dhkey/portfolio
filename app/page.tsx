import Link from "next/link";
import { Prompt } from "@/components/Prompt";
import { person, routes, externals } from "@/lib/content";

const s = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function Home() {
  return (
    <main className="page stack-l">
      <header className="stack-s rise" style={s(0)}>
        <Prompt path="~" cmd="whoami" />
        <h1 className="title">{person.name}</h1>
        <p className="subtitle">{person.role}</p>
      </header>

      <section className="stack rise" style={s(1)}>
        <p className="lede">{person.tagline}</p>
        <p className="muted">{person.status}</p>
      </section>

      <section className="stack-s rise" style={s(2)}>
        <Prompt path="~" cmd="ls" />
        <ul className="chip-row">
          {routes.map((r) => (
            <li key={r.path}>
              <Link className="chip" href={r.path}>
                {r.path}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="chip-row">
          {externals.map((e) => (
            <li key={e.path}>
              <a
                className="chip"
                data-variant="ghost"
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {e.path}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
