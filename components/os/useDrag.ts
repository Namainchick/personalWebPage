"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

export type Rect = { x: number; y: number; w: number; h: number };

const MENUBAR = 32;
const DOCK_SPACE = 100;

/**
 * Drag a window by its title bar. Pointer capture keeps move/up on the bar itself.
 * Viewport fitting happens in CSS (min/max) so server and client render identical styles.
 */
export function useDrag(initial: Rect) {
  const [pos, setPos] = useState({ x: initial.x, y: initial.y });
  const grab = useRef<{ dx: number; dy: number } | null>(null);

  const style: CSSProperties = {
    left: `max(12px, min(${pos.x}px, calc(100vw - ${initial.w}px - 12px)))`,
    top: `max(0px, min(${pos.y}px, calc(100vh - ${MENUBAR}px - ${initial.h}px - 40px)))`,
    width: `min(${initial.w}px, calc(100vw - 24px))`,
    height: `min(${initial.h}px, calc(100vh - ${MENUBAR + DOCK_SPACE}px))`,
  };

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest("button")) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const el = e.currentTarget.parentElement;
    const left = el ? el.offsetLeft : pos.x;
    const top = el ? el.offsetTop : pos.y;
    grab.current = { dx: e.clientX - left, dy: e.clientY - top };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const g = grab.current;
    if (!g) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight - MENUBAR;
    const x = Math.max(-initial.w + 140, Math.min(e.clientX - g.dx, vw - 140));
    const y = Math.max(0, Math.min(e.clientY - g.dy, vh - 60));
    setPos({ x, y });
  };

  const onPointerUp = () => {
    grab.current = null;
  };

  return { style, handlers: { onPointerDown, onPointerMove, onPointerUp } };
}
