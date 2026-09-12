"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { person, routes, externals } from "@/lib/content";

/** A two-column row of the `help` / `ls` tables. */
type Row = { key: string; desc: string; here?: boolean };

type Line =
  | { kind: "in" | "out" | "err"; text: string; path?: string }
  | { kind: "row"; row: Row };

/** Rows whose command column runs past this stack on a phone instead of sitting two-up. */
const WIDE_KEY = 16;

const INTERNAL = routes.map((r) => r.path.slice(1));
const EXTERNAL = Object.fromEntries(
  externals.map((e) => [e.path.slice(1), e.href]),
);

const HELP_ROWS: Row[] = [
  { key: "ls", desc: "list every route" },
  { key: INTERNAL.join(", "), desc: "open a page" },
  { key: Object.keys(EXTERNAL).join(", "), desc: "open an external link" },
  { key: "cd ~", desc: "back home" },
  { key: "pwd", desc: "where you are" },
  { key: "whoami", desc: "short bio" },
  { key: "clear", desc: "clear the screen" },
];

const HELP: Line[] = [
  { kind: "out", text: "available commands" },
  { kind: "out", text: "" },
  ...HELP_ROWS.map((row): Line => ({ kind: "row", row })),
  { kind: "out", text: "" },
  { kind: "out", text: "tab completes · arrow up recalls history" },
];

function listing(here: string): Line[] {
  return [
    ...routes.map(
      (r): Line => ({
        kind: "row",
        row: { key: r.path, desc: r.label, here: r.path === here },
      }),
    ),
    ...externals.map(
      (e): Line => ({
        kind: "row",
        row: { key: e.path, desc: "external link" },
      }),
    ),
  ];
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

/** Consecutive table rows share one grid, so their columns line up. */
function renderLog(lines: Line[]): React.ReactNode[] {
  const out: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; ) {
    const line = lines[i];

    if (line.kind === "row") {
      const start = i;
      const rows: Row[] = [];
      while (i < lines.length) {
        const next = lines[i];
        if (next.kind !== "row") break;
        rows.push(next.row);
        i++;
      }
      const wide = rows.some((r) => r.key.length > WIDE_KEY);
      out.push(
        <div key={start} className="term-table" data-wide={wide || undefined}>
          {rows.map((row, j) => (
            <Fragment key={j}>
              <span className="term-key">{row.key}</span>
              <span className="term-desc">
                {row.desc}
                {row.here ? (
                  <span className="term-mark">{" ← you are here"}</span>
                ) : null}
              </span>
            </Fragment>
          ))}
        </div>,
      );
      continue;
    }

    out.push(
      <p key={i} className={`term-line term-${line.kind}`}>
        {line.kind === "in" ? (
          <>
            <span className="path">{line.path}</span>
            <span className="sigil">$</span> {line.text}
          </>
        ) : (
          line.text || " "
        )}
      </p>,
    );
    i++;
  }

  return out;
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

  const emit = (entry: string, out: Line[]) =>
    setLines((prev) => [
      ...prev,
      { kind: "in", text: entry, path: here },
      ...out,
    ]);

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
    if (cmd === "help" || cmd === "?" || cmd === "man") {
      emit(entry, HELP);
      return;
    }
    if (cmd === "ls" || cmd === "ll" || cmd === "dir") {
      emit(entry, listing(route));
      return;
    }
    if (cmd === "pwd") {
      emit(entry, [{ kind: "out", text: here }]);
      return;
    }
    if (cmd === "whoami") {
      emit(entry, [
        { kind: "out", text: person.displayName },
        { kind: "out", text: person.role },
        { kind: "out", text: person.location },
      ]);
      return;
    }
    // `cd ~`, `cd ..`, `cd /`, `home`, `-` all walk back to the root.
    if (cmd === "" || cmd === "~" || cmd === "home" || cmd === ".." || cmd === "-") {
      if (route === "/") {
        emit(entry, [{ kind: "out", text: "already home" }]);
        return;
      }
      emit(entry, [{ kind: "out", text: "opening / …" }]);
      router.push("/");
      return;
    }
    if (INTERNAL.includes(cmd)) {
      if (route === `/${cmd}`) {
        emit(entry, [{ kind: "out", text: `already at /${cmd}` }]);
        return;
      }
      emit(entry, [{ kind: "out", text: `opening /${cmd} …` }]);
      router.push(`/${cmd}`);
      return;
    }
    if (cmd in EXTERNAL) {
      emit(entry, [{ kind: "out", text: `opening ${EXTERNAL[cmd]} …` }]);
      window.open(EXTERNAL[cmd], "_blank", "noopener,noreferrer");
      return;
    }
    emit(entry, [
      { kind: "err", text: `command not found: ${cmd} - try \`help\`` },
    ]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      const stem = normalise(value);
      if (!stem) return;
      const pool = [
        ...INTERNAL,
        ...Object.keys(EXTERNAL),
        "help", "ls", "pwd", "whoami", "clear",
      ];
      const hit = pool.find((c) => c.startsWith(stem));
      if (hit) setValue(hit);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIndex + 1, history.length - 1);
      if (next >= 0) {
        setHistIndex(next);
        setValue(history[next]);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIndex - 1;
      setHistIndex(next);
      setValue(next >= 0 ? history[next] : "");
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
            {renderLog(lines)}
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
