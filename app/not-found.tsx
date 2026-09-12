import type { Metadata } from "next";
import Link from "next/link";
import { Prompt } from "@/components/Prompt";
import { routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "404 - no such file or directory",
};

export default function NotFound() {
  return (
    <main className="page stack-l">
      <header className="stack-s">
        <Prompt path="~" cmd="cd ./nowhere" />
        <h1 className="title">404</h1>
        <p className="muted">no such file or directory</p>
      </header>

      <section className="stack-s">
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
      </section>

      <footer className="stack-s">
        <hr className="rule" />
        <div className="chip-row">
          <Link className="chip" href="/">
            cd ~
          </Link>
        </div>
      </footer>
    </main>
  );
}
