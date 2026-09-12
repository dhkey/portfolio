"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { person, routes, externals } from "@/lib/content";

type Line = { kind: "in" | "out" | "err"; text: string; path?: string };

const INTERNAL = routes.map((r) => r.path.slice(1));
const EXTERNAL = Object.fromEntries(
  externals.map((e) => [e.path.slice(1), e.href]),
);

function helpTable(): string[] {
  const rows: [string, string][] = [
    ["ls", "list every route"],
    [INTERNAL.join(", "), "open a page"],
    [Object.keys(EXTERNAL).join(", "), "open an external link"],
    ["cd ~", "back home"],
    ["pwd", "where you are"],
    ["whoami", "short bio"],
    ["clear", "clear the screen"],
  ];
  const width = Math.max(...rows.map(([cmd]) => cmd.length));
  return [
    "available commands",
    "",
    ...rows.map(([cmd, desc]) => `  ${cmd.padEnd(width + 3)}${desc}`),
    "",
    "tab completes · arrow up recalls history",
  ];
}

const HELP: string[] = helpTable();

function listing(here: string): string[] {
  const rows: [string, string][] = [
    ...routes.map((r) => [r.path, r.label] as [string, string]),
    ...externals.map((e) => [e.path, "external link"] as [string, string]),
  ];
  const width = Math.max(...rows.map(([path]) => path.length));
  return rows.map(
    ([path, desc]) =>
      `${path.padEnd(width + 3)}${desc}${path === here ? "  ← you are here" : ""}`,
  );
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
      emit(entry, HELP.map((text) => ({ kind: "out", text }) as Line));
      return;
    }
    if (cmd === "ls" || cmd === "ll" || cmd === "dir") {
      emit(entry, listing(route).map((text) => ({ kind: "out", text }) as Line));
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
            {lines.map((line, i) => (
              <p key={i} className={`term-line term-${line.kind}`}>
                {line.kind === "in" ? (
                  <>
                    <span className="path">{line.path}</span>
                    <span className="sigil">$</span> {line.text}
                  </>
                ) : (
                  line.text || " "
                )}
              </p>
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
