"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { CardVariant, variantStyles } from "@/components/Card";

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

interface ExpandableCardProps {
  id: string;
  children: ReactNode;
  expandedContent: ReactNode;
  variant?: CardVariant;
  className?: string;
}

export default function ExpandableCard({
  id,
  children,
  expandedContent,
  variant = "white",
  className = "",
}: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const cardRef = useRef<HTMLElement>(null);
  const mounted = useIsMounted();

  const open = useCallback(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      // Calculate where the card center is relative to the viewport
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      // Convert to percentage of viewport for transform-origin
      const originX = (centerX / window.innerWidth) * 100;
      const originY = (centerY / window.innerHeight) * 100;
      setTransformOrigin(`${originX}% ${originY}%`);
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <article
        ref={cardRef}
        onClick={open}
        className={`rounded-2xl p-6 ${variantStyles[variant]} hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-pointer ${className} relative group`}
      >
        {children}
        <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-60 transition-opacity text-xs pointer-events-none">
          ↗
        </span>
      </article>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  key={`backdrop-${id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={close}
                  className="fixed inset-0 bg-black/50 z-40"
                />

                {/* Wrapper for centering — the scale animation happens on this layer */}
                <motion.div
                  key={`wrapper-${id}`}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.75 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    mass: 0.8,
                  }}
                  style={{ transformOrigin }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-none"
                >
                  {/* Modal — sizes to content */}
                  <article
                    onClick={(e) => e.stopPropagation()}
                    className={`rounded-3xl p-6 md:p-8 w-full max-w-3xl max-h-[85vh] overflow-y-auto pointer-events-auto ${variantStyles[variant]} relative`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        close();
                      }}
                      className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                      aria-label="Close"
                    >
                      ✕
                    </button>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                    >
                      {expandedContent}
                    </motion.div>
                  </article>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
