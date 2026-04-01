"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";

interface BubbleGridContextValue {
  hoveredIndex: number | null;
  colCount: number;
  setHoveredIndex: (index: number | null) => void;
}

const BubbleGridContext = createContext<BubbleGridContextValue>({
  hoveredIndex: null,
  colCount: 4,
  setHoveredIndex: () => {},
});

export function useBubbleGrid() {
  return useContext(BubbleGridContext);
}

interface BubbleGridProps {
  children: ReactNode;
  className?: string;
}

export default function BubbleGrid({ children, className = "" }: BubbleGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [colCount, setColCount] = useState(4);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const updateCols = () => {
      const style = getComputedStyle(el);
      const cols = style.gridTemplateColumns.split(" ").length;
      setColCount(cols);
    };

    updateCols();

    const ro = new ResizeObserver(updateCols);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleSetHovered = useCallback((index: number | null) => {
    setHoveredIndex(index);
  }, []);

  return (
    <BubbleGridContext.Provider
      value={{ hoveredIndex, colCount, setHoveredIndex: handleSetHovered }}
    >
      <div ref={gridRef} className={`bento-grid ${className}`}>
        {children}
      </div>
    </BubbleGridContext.Provider>
  );
}
