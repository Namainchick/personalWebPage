"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  reducer,
  initialStateFor,
  pathFor,
  focused,
  type AppId,
  type OSState,
} from "./store";

export type OSApi = {
  state: OSState;
  /** Open (or focus) an app and navigate to its route. */
  open: (app: AppId, item?: string) => void;
  /** Open without touching the URL. Used by route pages on mount. */
  openSilently: (app: AppId, item?: string) => void;
  close: (app: AppId) => void;
  focus: (app: AppId) => void;
  toggleMax: (app: AppId) => void;
};

const Ctx = createContext<OSApi | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, pathname, initialStateFor);

  const api: OSApi = {
    state,
    open: (app, item) => {
      dispatch({ type: "open", app, item });
      const path = pathFor(app, item);
      if (path && path !== pathname) router.push(path, { scroll: false });
    },
    openSilently: (app, item) => dispatch({ type: "open", app, item }),
    close: (app) => {
      const remaining = state.windows.filter((w) => w.app !== app);
      dispatch({ type: "close", app });
      const next = focused({ windows: remaining, nextZ: state.nextZ });
      const path = next ? (pathFor(next.app, next.item) ?? "/") : "/";
      if (path !== pathname) router.replace(path, { scroll: false });
    },
    focus: (app) => dispatch({ type: "focus", app }),
    toggleMax: (app) => dispatch({ type: "toggleMax", app }),
  };

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useOS(): OSApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useOS must be used inside <StoreProvider>");
  return ctx;
}
