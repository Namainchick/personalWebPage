"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useBubbleGrid } from "@/components/BubbleGrid";
import type { CardVariant } from "@/components/Card";

interface BubbleCardProps {
  children: ReactNode;
  index: number;
  id: string;
  variant?: CardVariant;
  className?: string;
}

function getDelayFromId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 1000;
  }
  return (hash % 300) / 1000;
}

function getGlowShadow(variant: CardVariant): string {
  switch (variant) {
    case "teal":
    case "gradient":
    case "light-teal":
      return "0 0 30px rgba(13, 148, 136, 0.3), 0 8px 32px rgba(0,0,0,0.1)";
    case "coral":
    case "light-coral":
      return "0 0 30px rgba(249, 115, 22, 0.3), 0 8px 32px rgba(0,0,0,0.1)";
    default:
      return "0 0 30px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)";
  }
}

function getNeighborOffset(
  myIndex: number,
  hoveredIndex: number | null,
  colCount: number,
): { x: number; y: number } {
  if (hoveredIndex === null || hoveredIndex === myIndex || colCount <= 1) {
    return { x: 0, y: 0 };
  }

  const myRow = Math.floor(myIndex / colCount);
  const myCol = myIndex % colCount;
  const hRow = Math.floor(hoveredIndex / colCount);
  const hCol = hoveredIndex % colCount;

  const dRow = myRow - hRow;
  const dCol = myCol - hCol;

  if (Math.abs(dRow) > 1 || Math.abs(dCol) > 1) {
    return { x: 0, y: 0 };
  }

  const isDirect = dRow === 0 || dCol === 0;
  const strength = isDirect ? 5 : 2.5;
  const len = Math.sqrt(dRow * dRow + dCol * dCol) || 1;
  return {
    x: (dCol / len) * strength,
    y: (dRow / len) * strength,
  };
}

function getFloatDuration(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 17 + id.charCodeAt(i)) % 1000;
  }
  return 3 + (hash / 1000) * 2;
}

export default function BubbleCard({
  children,
  index,
  id,
  variant = "white" as CardVariant,
  className = "",
}: BubbleCardProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { hoveredIndex, colCount, setHoveredIndex } = useBubbleGrid();
  const [isHovered, setIsHovered] = useState(false);
  const [entranceState, setEntranceState] = useState<"pending" | "animating" | "done">("pending");

  const delay = getDelayFromId(id);
  const floatDuration = getFloatDuration(id);
  const offset = getNeighborOffset(index, hoveredIndex, colCount);

  const hoverSpring = { type: "spring" as const, stiffness: 400, damping: 15 };

  // Trigger entrance animation for ALL cards — above and below fold.
  // Above-fold cards animate immediately on mount, below-fold cards
  // animate when scrolled into view.
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const inViewport =
      rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0;

    if (inViewport) {
      // In viewport on mount — animate in with a small delay for stagger effect
      const timer = setTimeout(() => setEntranceState("animating"), 50);
      return () => clearTimeout(timer);
    }

    // Below the fold — observe and animate when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntranceState("animating");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // After entrance animation completes via spring, mark as done
  useEffect(() => {
    if (entranceState !== "animating") return;
    const timer = setTimeout(
      () => setEntranceState("done"),
      (delay + 0.6) * 1000,
    );
    return () => clearTimeout(timer);
  }, [entranceState, delay]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredIndex(null);
  };

  // Entrance animation values
  const getEntranceAnimate = () => {
    if (entranceState === "pending") {
      // Not yet observed — render visible (SSR safe)
      return { opacity: 1, scale: 1, y: 0 };
    }
    if (entranceState === "animating") {
      // Animate in with spring
      return {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: prefersReduced
          ? { duration: 0.3, delay }
          : {
              type: "spring" as const,
              stiffness: 260,
              damping: 20,
              mass: 0.8,
              delay,
            },
      };
    }
    // Done — just hold position
    return { opacity: 1, scale: 1, y: 0 };
  };

  // For below-fold cards that need entrance: start hidden
  const initialStyles =
    entranceState === "animating"
      ? prefersReduced
        ? { opacity: 0 }
        : { opacity: 0, scale: 0.85, y: 40 }
      : undefined;

  return (
    <motion.div
      ref={outerRef}
      className={className}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="rounded-2xl overflow-hidden"
        initial={initialStyles}
        animate={getEntranceAnimate()}
        whileHover={
          prefersReduced
            ? { scale: 1.015 }
            : {
                scale: 1.035,
                boxShadow: getGlowShadow(variant),
                transition: hoverSpring,
              }
        }
        whileTap={{
          scale: 0.98,
          transition: { type: "spring", stiffness: 500, damping: 20 },
        }}
      >
        <motion.div
          animate={
            entranceState === "done" && !isHovered && !prefersReduced
              ? {
                  y: [-2, 2],
                  transition: {
                    duration: floatDuration,
                    repeat: Infinity,
                    repeatType: "mirror" as const,
                    ease: "easeInOut",
                  },
                }
              : { y: 0 }
          }
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
