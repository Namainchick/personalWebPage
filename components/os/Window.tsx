"use client";

import type { ReactNode } from "react";
import { useOS } from "./StoreProvider";
import { useDrag } from "./useDrag";
import { AppIcon } from "./icons";
import type { Win } from "./store";
import type { AppMeta } from "@/components/apps/registry";

export function Window({
  win,
  meta,
  isFocused,
  children,
}: {
  win: Win;
  meta: AppMeta;
  isFocused: boolean;
  children: ReactNode;
}) {
  const { close, focus, toggleMax } = useOS();
  const { style, handlers } = useDrag(meta.rect);
  const title = meta.title(win.item);

  return (
    <section
      className={`os-window${isFocused ? " is-focused" : ""}${win.maximized ? " is-max" : ""}`}
      style={{ ...style, zIndex: win.z }}
      role="dialog"
      aria-label={title}
      onPointerDownCapture={() => {
        if (!isFocused) focus(win.app);
      }}
    >
      <header className="os-titlebar" {...handlers} onDoubleClick={() => toggleMax(win.app)}>
        <button type="button" className="os-win-back" onClick={() => close(win.app)}>
          ‹ Back
        </button>
        <div className="os-lights">
          <button
            type="button"
            className="light close"
            aria-label={`Close ${title}`}
            onClick={() => close(win.app)}
          />
          <button
            type="button"
            className="light min"
            aria-label={`Close ${title}`}
            onClick={() => close(win.app)}
          />
          <button
            type="button"
            className="light max"
            aria-label={win.maximized ? "Restore window size" : "Maximize window"}
            onClick={() => toggleMax(win.app)}
          />
        </div>
        <div className="os-title">
          <AppIcon id={win.app} size={16} />
          <span>{title}</span>
        </div>
      </header>
      <div className="os-body">{children}</div>
    </section>
  );
}
