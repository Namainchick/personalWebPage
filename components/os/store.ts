export type AppId =
  | "terminal"
  | "work"
  | "finder"
  | "grind"
  | "content"
  | "mail"
  | "text"
  | "trash";

export type Win = {
  app: AppId;
  item?: string;
  z: number;
  maximized: boolean;
  /** True only for the window derived from the initial pathname (drives the terminal boot typing). */
  boot?: boolean;
};

export type OSState = { windows: Win[]; nextZ: number };

export type Action =
  | { type: "open"; app: AppId; item?: string }
  | { type: "close"; app: AppId }
  | { type: "focus"; app: AppId }
  | { type: "toggleMax"; app: AppId }
  | { type: "closeAll" };

export const MAX_WINDOWS = 3;

export function reducer(state: OSState, action: Action): OSState {
  switch (action.type) {
    case "open": {
      const z = state.nextZ;
      const existing = state.windows.find((w) => w.app === action.app);
      if (existing) {
        return {
          windows: state.windows.map((w) =>
            w.app === action.app ? { ...w, z, item: action.item ?? w.item } : w
          ),
          nextZ: z + 1,
        };
      }
      let windows = state.windows;
      if (windows.length >= MAX_WINDOWS) {
        const oldest = windows.reduce((a, b) => (a.z < b.z ? a : b));
        windows = windows.filter((w) => w !== oldest);
      }
      const win: Win = { app: action.app, z, maximized: false };
      if (action.item !== undefined) win.item = action.item;
      return { windows: [...windows, win], nextZ: z + 1 };
    }
    case "close":
      return { ...state, windows: state.windows.filter((w) => w.app !== action.app) };
    case "focus": {
      if (!state.windows.some((w) => w.app === action.app)) return state;
      const z = state.nextZ;
      return {
        windows: state.windows.map((w) => (w.app === action.app ? { ...w, z } : w)),
        nextZ: z + 1,
      };
    }
    case "toggleMax":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.app === action.app ? { ...w, maximized: !w.maximized } : w
        ),
      };
    case "closeAll":
      return { windows: [], nextZ: state.nextZ };
  }
}

export function focused(state: OSState): Win | undefined {
  return state.windows.reduce<Win | undefined>(
    (best, w) => (best === undefined || w.z > best.z ? w : best),
    undefined
  );
}

type Target = { app: AppId; item?: string };

const STATIC: Record<string, Target> = {
  "/": { app: "terminal" },
  "/about": { app: "terminal" },
  "/work": { app: "work" },
  "/hackathons": { app: "finder", item: "hackathons" },
  "/projects": { app: "finder", item: "projects" },
  "/grind": { app: "grind" },
  "/content": { app: "content" },
  "/contact": { app: "mail" },
  "/impressum": { app: "text", item: "impressum" },
  "/datenschutz": { app: "text", item: "datenschutz" },
};

export function appForPath(pathname: string): Target | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (STATIC[path]) return { ...STATIC[path] };
  const work = path.match(/^\/work\/([^/]+)$/);
  if (work) return { app: "work", item: work[1] };
  const finder = path.match(/^\/(hackathons|projects)\/([^/]+)$/);
  if (finder) return { app: "finder", item: `${finder[1]}/${finder[2]}` };
  return null;
}

export function pathFor(app: AppId, item?: string): string | null {
  switch (app) {
    case "terminal":
      return "/about";
    case "work":
      return item ? `/work/${item}` : "/work";
    case "finder": {
      const [folder, id] = (item ?? "hackathons").split("/");
      if (folder !== "hackathons" && folder !== "projects") return null;
      return id ? `/${folder}/${id}` : `/${folder}`;
    }
    case "grind":
      return "/grind";
    case "content":
      return "/content";
    case "mail":
      return "/contact";
    case "text":
      return item === "impressum" || item === "datenschutz" ? `/${item}` : null;
    case "trash":
      return null;
  }
}

export function initialStateFor(pathname: string): OSState {
  const target = appForPath(pathname);
  if (!target) return { windows: [], nextZ: 1 };
  const win: Win = { app: target.app, z: 1, maximized: false, boot: true };
  if (target.item !== undefined) win.item = target.item;
  return { windows: [win], nextZ: 2 };
}
