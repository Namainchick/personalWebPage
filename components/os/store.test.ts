import { describe, it, expect } from "vitest";
import {
  reducer,
  focused,
  initialStateFor,
  appForPath,
  pathFor,
  MAX_WINDOWS,
  type OSState,
} from "./store";

const empty: OSState = { windows: [], nextZ: 1 };

describe("reducer", () => {
  it("opens and focuses a window", () => {
    const s = reducer(empty, { type: "open", app: "work", item: "arbio" });
    expect(s.windows).toHaveLength(1);
    expect(focused(s)?.app).toBe("work");
    expect(focused(s)?.item).toBe("arbio");
  });

  it("re-opening an app focuses it and updates the item instead of duplicating", () => {
    let s = reducer(empty, { type: "open", app: "work", item: "arbio" });
    s = reducer(s, { type: "open", app: "grind" });
    s = reducer(s, { type: "open", app: "work", item: "flohh" });
    expect(s.windows).toHaveLength(2);
    expect(focused(s)).toMatchObject({ app: "work", item: "flohh" });
  });

  it("keeps the item when re-opening without one", () => {
    let s = reducer(empty, { type: "open", app: "work", item: "arbio" });
    s = reducer(s, { type: "open", app: "work" });
    expect(focused(s)).toMatchObject({ app: "work", item: "arbio" });
  });

  it("evicts the oldest unfocused window beyond MAX_WINDOWS", () => {
    let s = empty;
    for (const app of ["terminal", "work", "grind", "mail"] as const) {
      s = reducer(s, { type: "open", app });
    }
    expect(s.windows).toHaveLength(MAX_WINDOWS);
    expect(s.windows.map((w) => w.app)).toEqual(["work", "grind", "mail"]);
  });

  it("close removes, focus raises, toggleMax flips", () => {
    let s = reducer(empty, { type: "open", app: "terminal" });
    s = reducer(s, { type: "open", app: "grind" });
    s = reducer(s, { type: "focus", app: "terminal" });
    expect(focused(s)?.app).toBe("terminal");
    s = reducer(s, { type: "toggleMax", app: "terminal" });
    expect(s.windows.find((w) => w.app === "terminal")?.maximized).toBe(true);
    s = reducer(s, { type: "close", app: "terminal" });
    expect(s.windows.map((w) => w.app)).toEqual(["grind"]);
  });

  it("closeAll empties the desktop", () => {
    let s = reducer(empty, { type: "open", app: "terminal" });
    s = reducer(s, { type: "closeAll" });
    expect(s.windows).toEqual([]);
  });
});

describe("paths", () => {
  it("maps routes to apps", () => {
    expect(appForPath("/")).toEqual({ app: "terminal" });
    expect(appForPath("/about")).toEqual({ app: "terminal" });
    expect(appForPath("/work")).toEqual({ app: "work" });
    expect(appForPath("/work/arbio")).toEqual({ app: "work", item: "arbio" });
    expect(appForPath("/hackathons")).toEqual({ app: "finder", item: "hackathons" });
    expect(appForPath("/hackathons/adventurex")).toEqual({
      app: "finder",
      item: "hackathons/adventurex",
    });
    expect(appForPath("/projects")).toEqual({ app: "finder", item: "projects" });
    expect(appForPath("/grind")).toEqual({ app: "grind" });
    expect(appForPath("/content")).toEqual({ app: "content" });
    expect(appForPath("/contact")).toEqual({ app: "mail" });
    expect(appForPath("/datenschutz")).toEqual({ app: "text", item: "datenschutz" });
    expect(appForPath("/nope")).toBeNull();
  });

  it("round-trips", () => {
    expect(pathFor("finder", "hackathons/adventurex")).toBe("/hackathons/adventurex");
    expect(pathFor("finder", "projects")).toBe("/projects");
    expect(pathFor("finder")).toBe("/hackathons");
    expect(pathFor("work")).toBe("/work");
    expect(pathFor("work", "arbio")).toBe("/work/arbio");
    expect(pathFor("terminal")).toBe("/about");
    expect(pathFor("mail")).toBe("/contact");
    expect(pathFor("text", "impressum")).toBe("/impressum");
    expect(pathFor("text", "about-namos")).toBeNull();
    expect(pathFor("trash")).toBeNull();
  });

  it("derives initial state from pathname", () => {
    expect(initialStateFor("/grind").windows[0]).toMatchObject({ app: "grind", boot: true });
    expect(initialStateFor("/").windows[0]).toMatchObject({ app: "terminal", boot: true });
    expect(initialStateFor("/nope").windows).toEqual([]);
  });
});
