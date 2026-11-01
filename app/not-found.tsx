import type { Metadata } from "next";
import Link from "next/link";
import { Prompt } from "@/components/Prompt";
import { routes } from "@/content/site";

export const metadata: Metadata = {
  title: "404 - no such file or directory",
};

export default function NotFound() {
  return (
    <main className="page stack-l">
      <header>
        <Prompt path="~" cmd="cd ./nowhere" />
        <h1>404</h1>
        <p className="muted">no such file or directory</p>
      </header>

      <section className="stack-s">
        <Prompt path="~" cmd="ls" />
        <ul className="chip-row">
          {[{ path: "/" }, ...routes].map((route) => (
            <li key={route.path}>
              <Link className="chip" href={route.path}>
                {route.path}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
