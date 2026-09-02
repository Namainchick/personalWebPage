"use client";

import { useEffect } from "react";
import { useOS } from "./StoreProvider";
import type { AppId } from "./store";

/** Route pages render only this. It makes sure the matching window is open and focused. */
export function OpenApp({ app, item }: { app: AppId; item?: string }) {
  const { openSilently } = useOS();
  useEffect(() => {
    openSilently(app, item);
  }, [app, item, openSilently]);
  return null;
}
