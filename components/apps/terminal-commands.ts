import { about } from "@/data/about";
import { site } from "@/data/site";
import type { AppId } from "@/components/os/store";

export type Line = { kind: "prompt" | "out" | "hi" | "dim"; text: string };
export type CmdResult = {
  lines: Line[];
  open?: { app: AppId; item?: string };
  clear?: boolean;
  href?: string;
};

export const PROMPT = "nam@namOS ~ %";

const LS = "about.sh   work/   hackathons/   projects/   grind.app   content/   contact.eml   CV.pdf   story.md";

const p = (cmd: string): Line => ({ kind: "prompt", text: `${PROMPT} ${cmd}` });
const out = (text: string): Line => ({ kind: "out", text });
const hi = (text: string): Line => ({ kind: "hi", text });
const dim = (text: string): Line => ({ kind: "dim", text });

export const BOOT_SCRIPT: Line[] = [
  p("whoami"),
  ...about.whoami.map(out),
  p("cat hot-take.txt"),
  hi(about.hotTake.quote),
  dim(about.hotTake.followUp),
  p("ls"),
  out(LS),
  dim("type `help`, or `open <app>`. try `cat story.md`."),
];

const OPEN_TARGETS: Record<string, { app: AppId; item?: string }> = {
  about: { app: "terminal" },
  terminal: { app: "terminal" },
  work: { app: "work" },
  hackathons: { app: "finder", item: "hackathons" },
  projects: { app: "finder", item: "projects" },
  finder: { app: "finder", item: "hackathons" },
  grind: { app: "grind" },
  content: { app: "content" },
  tiktok: { app: "content" },
  contact: { app: "mail" },
  mail: { app: "mail" },
  trash: { app: "trash" },
};

const HELP: Line[] = [
  out("help              this list"),
  out("ls                what's on this machine"),
  out("whoami            two lines about Nam"),
  out("cat <file>        story.md · hot-take.txt"),
  out("open <app>        work · hackathons · projects · grind · content · contact"),
  out("cv                open CV.pdf in a new tab"),
  out("clear             clear the screen"),
];

export function runCommand(input: string): CmdResult {
  const raw = input.trim();
  if (!raw) return { lines: [] };
  const [cmd, ...args] = raw.split(/\s+/);
  const arg = args.join(" ");

  switch (cmd.toLowerCase()) {
    case "help":
    case "?":
      return { lines: HELP };
    case "ls":
    case "dir":
      return { lines: [out(LS)] };
    case "whoami":
      return { lines: about.whoami.map(out) };
    case "pwd":
      return { lines: [out("/Users/nam")] };
    case "cat": {
      const file = arg.replace(/^\.\//, "");
      if (!file) return { lines: [out("cat: missing file. try `cat story.md`")] };
      if (file === "story.md") return { lines: about.story.map(out) };
      if (file === "hot-take.txt") return { lines: [hi(about.hotTake.quote), dim(about.hotTake.followUp)] };
      if (file === "cv.pdf" || file === "CV.pdf") return { lines: [dim("binary file. use `cv`.")] };
      return { lines: [out(`cat: ${file}: No such file or directory`)] };
    }
    case "open": {
      const key = arg.replace(/\/$/, "").replace(/\.(app|eml|sh)$/, "").toLowerCase();
      if (key === "cv" || key === "cv.pdf") return { lines: [dim("opening CV.pdf ↗")], href: site.cvPath };
      const target = OPEN_TARGETS[key];
      if (!target) {
        return {
          lines: [out(`open: unknown app '${arg || ""}'. try: work · hackathons · projects · grind · content · contact`)],
        };
      }
      return { lines: [dim(`opening ${key}…`)], open: target };
    }
    case "cv":
      return { lines: [dim("opening CV.pdf ↗")], href: site.cvPath };
    case "clear":
    case "cls":
      return { lines: [], clear: true };
    case "sudo":
      return { lines: [dim("nice try. this is a portfolio.")] };
    case "rm":
      return { lines: [dim("not today.")] };
    case "exit":
    case "logout":
      return { lines: [dim("there is no exit. only the dock.")] };
    case "hackathons":
      return { lines: [out("6 wins · Hangzhou, Amsterdam, Hamburg ×3, Berlin. `open hackathons` for the photos.")] };
    default:
      return { lines: [out(`zsh: command not found: ${cmd}`)] };
  }
}
