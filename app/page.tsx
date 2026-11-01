import Link from "next/link";
import { Prompt } from "@/components/Prompt";
import { person } from "@/content/person";
import { routes, externals } from "@/content/site";

export default function Home() {
  return (
    <main className="page stack-l">
      <header className="stack-s rise">
        <Prompt path="~" cmd="whoami" />
        <h1 className="title">{person.name}</h1>
        <p className="subtitle">{person.role}</p>
      </header>

      <section className="stack rise">
        <p className="lede">{person.tagline}</p>
        <p className="muted">{person.status}</p>
      </section>

      <section className="stack-s rise">
        <Prompt path="~" cmd="ls" />
        <ul className="chip-row">
          {routes.map((route) => (
            <li key={route.path}>
              <Link className="chip" href={route.path}>
                {route.path}
              </Link>
            </li>
          ))}
        </ul>
        
        <ul className="chip-row">
          {externals.map((external_link) => (
            <li key={external_link.path}>
              <a
                className="chip"
                data-variant="ghost"
                href={external_link.href}
                target="_blank"
                rel="noopener noreferrer"
              > {external_link.path}
              </a>
            </li>
          ))}
        </ul>
        
      </section>
    </main>
  );
}
