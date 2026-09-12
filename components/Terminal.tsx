"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { person, routes, externals } from "@/lib/content";

/** A two-column row of the `help` / `ls` tables. */
type Row = { key: string; desc: string; here?: boolean };

type Line =
  | { kind: "in"; text: string; path: string }
  | { kind: "out" | "err"; text: string }
  | { kind: "table"; rows: Row[] };

/** Tables whose command column runs past this stack on a phone instead of sitting two-up. */
const WIDE_KEY = 16;

// Lookups go through a Map, not an object, so `constructor` or `__proto__`
// can't resolve to something inherited from Object.prototype.
const INTERNAL = routes.map((r) => r.path.slice(1));
const EXTERNAL = new Map(externals.map((e) => [e.path.slice(1), e.href]));

/** Other spellings of a command. `cd ~`, `cd ..`, `cd /`, `home` and `-` all walk back to the root. */
const ALIASES = new Map([
  ["?", "help"],
  ["man", "help"],
  ["ll", "ls"],
  ["dir", "ls"],
  ["", "~"],
  ["home", "~"],
  ["..", "~"],
  ["-", "~"],
]);

/** Tab completes to the first of these that starts with what was typed. */
const COMPLETIONS = [
  ...INTERNAL,
  ...EXTERNAL.keys(),
  "help", "ls", "pwd", "whoami", "clear",
];

function out(...texts: string[]): Line[] {
  return texts.map((text): Line => ({ kind: "out", text }));
}

const HELP: Line[] = [
  ...out("available commands", ""),
  {
    kind: "table",
    rows: [
      { key: "ls", desc: "list every route" },
      { key: INTERNAL.join(", "), desc: "open a page" },
      { key: [...EXTERNAL.keys()].join(", "), desc: "open an external link" },
      { key: "cd ~", desc: "back home" },
      { key: "pwd", desc: "where you are" },
      { key: "whoami", desc: "short bio" },
      { key: "clear", desc: "clear the screen" },
    ],
  },
  ...out("", "tab completes · arrow up recalls history"),
];

function listing(route: string): Line {
  return {
    kind: "table",
    rows: [
      ...routes.map((r) => ({ key: r.path, desc: r.label, here: r.path === route })),
      ...externals.map((e) => ({ key: e.path, desc: "external link" })),
    ],
  };
}

function normalise(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^(cd|open|cat|go)\s+/, "")
    .replace(/^\.?\//, "")
    .replace(/\/$/, "")
    .replace(/\.(md|txt|env)$/, "")
    .trim();
}

/** next.config sets trailingSlash, so usePathname gives us "/skills/". */
function toRoute(pathname: string): string {
  return pathname !== "/" && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
}

/** "/skills" -> "~/skills", "/" -> "~" */
function toPrompt(route: string): string {
  return route === "/" ? "~" : `~${route}`;
}

function LogLine({ line }: { line: Line }) {
  switch (line.kind) {
    case "table":
      // One grid per table, so the columns line up across rows.
      return (
        <div
          className="term-table"
          data-wide={line.rows.some((r) => r.key.length > WIDE_KEY) || undefined}
        >
          {line.rows.map((row) => (
            <Fragment key={row.key}>
              <span className="term-key">{row.key}</span>
              <span className="term-desc">
                {row.desc}
                {row.here ? (
                  <span className="term-mark">{" ← you are here"}</span>
                ) : null}
              </span>
            </Fragment>
          ))}
        </div>
      );
    case "in":
      return (
        <p className="term-line term-in">
          <span className="path">{line.path}</span>
          <span className="sigil">$</span> {line.text}
        </p>
      );
    default:
      return (
        <p className={`term-line term-${line.kind}`}>{line.text || " "}</p>
      );
  }
}

export function Terminal() {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);

  const route = toRoute(pathname);
  const here = toPrompt(route);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);

  function navigate(target: string): Line[] {
    if (route === target) {
      return out(target === "/" ? "already home" : `already at ${target}`);
    }
    router.push(target);
    return out(`opening ${target} …`);
  }

  function execute(cmd: string): Line[] {
    const name = ALIASES.get(cmd) ?? cmd;

    switch (name) {
      case "help":
        return HELP;
      case "ls":
        return [listing(route)];
      case "pwd":
        return out(here);
      case "whoami":
        return out(person.name, person.role, person.location);
      case "~":
        return navigate("/");
    }

    if (INTERNAL.includes(name)) return navigate(`/${name}`);

    const href = EXTERNAL.get(name);
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
      return out(`opening ${href} …`);
    }

    return [{ kind: "err", text: `command not found: ${cmd} - try \`help\`` }];
  }

  function run(raw: string) {
    const entry = raw.trim();
    if (!entry) return;

    setHistory((h) => [entry, ...h]);
    setHistIndex(-1);

    const cmd = normalise(entry);
    if (cmd === "clear") {
      setLines([]);
      return;
    }

    const output = execute(cmd);
    setLines((prev) => [...prev, { kind: "in", text: entry, path: here }, ...output]);
  }

  /** Show history entry `i` (0 is the newest), or an empty prompt at -1. */
  function recall(i: number) {
    setHistIndex(i);
    setValue(i >= 0 ? history[i] : "");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "Tab": {
        e.preventDefault();
        const stem = normalise(value);
        const hit = stem && COMPLETIONS.find((c) => c.startsWith(stem));
        if (hit) setValue(hit);
        return;
      }
      case "ArrowUp":
        e.preventDefault();
        if (history.length) recall(Math.min(histIndex + 1, history.length - 1));
        return;
      case "ArrowDown":
        e.preventDefault();
        recall(Math.max(histIndex - 1, -1));
    }
  }

  return (
    <section
      className="term"
      onClick={() => inputRef.current?.focus()}
      aria-label="Command line navigation"
    >
      <div className="term-inner">
        {lines.length > 0 && (
          <div className="term-log" aria-live="polite">
            {lines.map((line, i) => (
              <LogLine key={i} line={line} />
            ))}
            <div ref={logEndRef} />
          </div>
        )}

        <form
          className="term-form"
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
            setValue("");
          }}
        >
          <label className="term-ps1" htmlFor="cmd">
            <span className="path">{here}</span>
            <span className="sigil">$</span>
          </label>
          <input
            id="cmd"
            ref={inputRef}
            className="term-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="type `help`"
            autoComplete="off"
            enterKeyHint="go"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Type a command to navigate"
          />
        </form>
      </div>
    </section>
  );
}
