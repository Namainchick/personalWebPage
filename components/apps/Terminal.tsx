"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { useOS } from "@/components/os/StoreProvider";
import type { Win } from "@/components/os/store";
import { BOOT_SCRIPT, PROMPT, runCommand, type Line } from "./terminal-commands";

const CHAR_MS = 12;
const LINE_PAUSE_MS = 260;
const START_DELAY_MS = 350;

/** Cumulative character offsets so one number drives the whole typing state. */
const OFFSETS: number[] = [];
let total = 0;
for (const l of BOOT_SCRIPT) {
  OFFSETS.push(total);
  total += l.kind === "prompt" ? 1 : l.text.length;
}
const TOTAL = total;

/** Time (ms after start) at which character n becomes visible. Line ends add a pause. */
const TIMES: number[] = [START_DELAY_MS];
for (let n = 1; n <= TOTAL; n++) {
  TIMES[n] = TIMES[n - 1] + (OFFSETS.includes(n) ? LINE_PAUSE_MS : CHAR_MS);
}

function visible(line: Line, index: number, progress: number): string | null {
  const start = OFFSETS[index];
  if (progress <= start) return null;
  if (line.kind === "prompt") return line.text;
  return line.text.slice(0, progress - start);
}

function lastIndex(progress: number): number {
  let idx = 0;
  for (let i = 0; i < OFFSETS.length; i++) if (progress > OFFSETS[i]) idx = i;
  return idx;
}

const noop = () => () => {};
/** false during SSR and the hydration render, true afterwards. No hydration mismatch. */
function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false
  );
}
function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(prefers-reduced-motion: reduce)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export function Terminal({ win }: { win: Win }) {
  const { open } = useOS();
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [history, setHistory] = useState<Line[]>([]);
  const [showBoot, setShowBoot] = useState(true);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Server and no-JS render the whole script. Only the pathname-derived window types it out.
  const animate = win.boot === true && hydrated && !reduced && !typingDone;
  const shown = animate ? progress : TOTAL;
  const done = !animate;

  // Time-based, not timer-chained: a throttled or hidden tab catches up on its next tick instead of crawling.
  useEffect(() => {
    if (!animate) return;
    const start = performance.now();
    const id = window.setInterval(() => {
      const elapsed = performance.now() - start;
      let n = 0;
      while (n < TOTAL && TIMES[n + 1] <= elapsed) n += 1;
      setProgress(n);
      if (n >= TOTAL) {
        window.clearInterval(id);
        setTypingDone(true);
      }
    }, 24);
    return () => window.clearInterval(id);
  }, [animate]);

  useEffect(() => {
    const el = bodyRef.current?.parentElement;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, shown]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const res = runCommand(value);
    const echo: Line = { kind: "prompt", text: `${PROMPT} ${value}` };
    if (res.clear) {
      setShowBoot(false);
      setHistory([]);
    } else {
      setHistory((h) => [...h, echo, ...res.lines]);
    }
    if (res.open) open(res.open.app, res.open.item);
    if (res.href) window.open(res.href, "_blank", "noopener,noreferrer");
    setValue("");
  };

  const cursorAt = done ? -1 : lastIndex(shown);

  return (
    <div
      className="term"
      ref={bodyRef}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a, button")) return;
        inputRef.current?.focus();
      }}
    >
      {showBoot &&
        BOOT_SCRIPT.map((line, i) => {
          const text = visible(line, i, shown);
          if (text === null) return null;
          const cls = `line ${line.kind === "out" ? "" : line.kind}`;
          const cursor = i === cursorAt ? <span className="cursor" aria-hidden="true" /> : null;
          if (i === 1) {
            return (
              <div key={i} className="who">
                <Image src="/img/avatar.jpg" alt="" width={30} height={30} />
                <div className={cls}>
                  {text}
                  {cursor}
                </div>
              </div>
            );
          }
          return (
            <div key={i} className={cls}>
              {text}
              {cursor}
            </div>
          );
        })}
      {history.map((line, i) => (
        <div key={`h${i}`} className={`line ${line.kind === "out" ? "" : line.kind}`}>
          {line.text}
        </div>
      ))}
      {done ? (
        <form onSubmit={submit}>
          <span className="prompt">{PROMPT}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Terminal command"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="go"
          />
        </form>
      ) : null}
    </div>
  );
}
