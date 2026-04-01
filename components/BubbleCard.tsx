"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useBubbleGrid } from "@/components/BubbleGrid";

interface BubbleCardProps {
  children: ReactNode;
  index: number;
  id: string;
  variant?: string;
  className?: string;
}

function getDelayFromId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 1000;
  }
  return (hash % 300) / 1000;
}

function getGlowShadow(variant: string): string {
  switch (variant) {
    case "teal":
    case "gradient":
      return "0 0 30px rgba(13, 148, 136, 0.3), 0 8px 32px rgba(0,0,0,0.1)";
    case "coral":
      return "0 0 30px rgba(249, 115, 22, 0.3), 0 8px 32px rgba(0,0,0,0.1)";
    default:
      return "0 0 30px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)";
  }
}

function getNeighborOffset(
  myIndex: number,
  hoveredIndex: number | null,
  colCount: number
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
  return 3 + (hash % 2000) / 1000;
}

export default function BubbleCard({
  children,
  index,
  id,
  variant = "white",
  className = "",
}: BubbleCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReduced = useReducedMotion();
  const { hoveredIndex, colCount, setHoveredIndex } = useBubbleGrid();
  const [isHovered, setIsHovered] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);

  const delay = getDelayFromId(id);
  const floatDuration = getFloatDuration(id);
  const offset = getNeighborOffset(index, hoveredIndex, colCount);

  useEffect(() => {
    if (!isInView || entranceDone) return;
    const timer = setTimeout(() => setEntranceDone(true), (delay + 0.6) * 1000);
    return () => clearTimeout(timer);
  }, [isInView, delay, entranceDone]);

  const entranceVariants = prefersReduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3, delay } },
      }
    : {
        hidden: { opacity: 0, scale: 0.85, y: 40 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            type: "spring" as const,
            stiffness: 260,
            damping: 20,
            mass: 0.8,
            delay,
          },
        },
      };

  const hoverSpring = { type: "spring" as const, stiffness: 400, damping: 15 };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredIndex(null);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={entranceVariants}
      initial="hidden"
      animate={
        isInView
          ? {
              ...entranceVariants.visible,
              x: offset.x,
              y: offset.y,
              transition: {
                ...entranceVariants.visible.transition,
                x: { type: "spring", stiffness: 300, damping: 25 },
                y: { type: "spring", stiffness: 300, damping: 25 },
              },
            }
          : "hidden"
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={
        prefersReduced
          ? { scale: 1.015 }
          : {
              scale: 1.035,
              boxShadow: getGlowShadow(variant),
              transition: hoverSpring,
            }
      }
      whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 500, damping: 20 } }}
      style={{ willChange: "transform" }}
    >
      <motion.div
        animate={
          entranceDone && !isHovered && !prefersReduced
            ? {
                y: [0, -2, 0, 2, 0],
                transition: {
                  duration: floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
            : { y: 0 }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
