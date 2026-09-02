import { describe, it, expect } from "vitest";
import { runCommand, BOOT_SCRIPT } from "./terminal-commands";
import { site } from "@/data/site";
import { about } from "@/data/about";

describe("runCommand", () => {
  it("help lists every command", () => {
    const text = runCommand("help").lines.map((l) => l.text).join("\n");
    for (const c of about.commands) expect(text).toContain(c);
  });
  it("ls lists the apps and the CV", () => {
    const text = runCommand("ls").lines[0].text;
    for (const s of ["work/", "hackathons/", "projects/", "grind.app", "content/", "CV.pdf"]) {
      expect(text).toContain(s);
    }
  });
  it("open maps names to apps", () => {
    expect(runCommand("open grind").open).toEqual({ app: "grind" });
    expect(runCommand("open hackathons").open).toEqual({ app: "finder", item: "hackathons" });
    expect(runCommand("open projects/").open).toEqual({ app: "finder", item: "projects" });
    expect(runCommand("open contact.eml").open).toEqual({ app: "mail" });
    expect(runCommand("open nope").open).toBeUndefined();
    expect(runCommand("open nope").lines[0].text).toContain("unknown app");
  });
  it("cv opens the pdf", () => {
    expect(runCommand("cv").href).toBe(site.cvPath);
    expect(runCommand("open CV.pdf").href).toBe(site.cvPath);
  });
  it("cat reads the story and the hot take", () => {
    expect(runCommand("cat story.md").lines.map((l) => l.text)).toEqual([...about.story]);
    expect(runCommand("cat hot-take.txt").lines[0].kind).toBe("hi");
    expect(runCommand("cat nope.txt").lines[0].text).toContain("No such file");
  });
  it("clear clears, unknown commands fail like zsh, easter eggs stay dry", () => {
    expect(runCommand("clear").clear).toBe(true);
    expect(runCommand("foo").lines[0].text).toBe("zsh: command not found: foo");
    expect(runCommand("sudo rm -rf /").lines[0].text).toBe("nice try. this is a portfolio.");
    expect(runCommand("   ").lines).toEqual([]);
  });
});

describe("BOOT_SCRIPT", () => {
  it("starts with whoami and ends with the hint", () => {
    expect(BOOT_SCRIPT[0]).toMatchObject({ kind: "prompt" });
    expect(BOOT_SCRIPT[0].text).toContain("whoami");
    expect(BOOT_SCRIPT.at(-1)?.kind).toBe("dim");
  });
});
