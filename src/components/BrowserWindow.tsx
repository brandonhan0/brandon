import { useState, useRef, useEffect, ReactNode } from "react";
import { X, Maximize2 } from "lucide-react";

interface BrowserWindowProps {
  id: string;
  title: string;
  children: ReactNode;
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;

  /**
   * Optional: if you want maximize to fill a desktop container instead of the whole viewport,
   * pass a ref to that container (the element should be position: relative).
   */
  desktopRef?: React.RefObject<HTMLElement>;
}

function BrowserWindow({
  title,
  children,
  zIndex,
  onClose,
  onFocus,
  desktopRef,
}: BrowserWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ x: 100, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [isMaximized, setIsMaximized] = useState(false);

  // store last windowed bounds so we can restore them
  const lastWindowed = useRef({
    x: 100,
    y: 80,
    width: 820,
    height: 620,
  });

  // windowed size (we keep as state so you could later add resizing)
  const [windowSize] = useState({ width: 820, height: 620 });

  // initial random placement
  useEffect(() => {
    const randomX = Math.random() * 150 + 50;
    const randomY = Math.random() * 100 + 50;
    setPosition({ x: randomX, y: randomY });
    lastWindowed.current.x = randomX;
    lastWindowed.current.y = randomY;
  }, []);

  // dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMaximized) return;

      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, isMaximized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    if (!windowRef.current) return;

    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientX ? e.clientY - rect.top : 0,
    });
    setIsDragging(true);
    onFocus();
  };

  const toggleMaximize = () => {
    setIsMaximized((prev) => {
      const next = !prev;

      if (!prev) {
        // going to maximized: save current windowed bounds
        lastWindowed.current = {
          x: position.x,
          y: position.y,
          width: windowSize.width,
          height: windowSize.height,
        };
      } else {
        // restoring: bring back saved windowed position
        setPosition({ x: lastWindowed.current.x, y: lastWindowed.current.y });
      }

      return next;
    });
  };

  const fakeUrl = `dragontrainer26.com/${title.toLowerCase().replace(/\s+/g, "-")}`;

  // Classic beveled “3D” border: light top/left, dark bottom/right
  const bevelOuter =
    "border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]";
  const bevelInner =
    "border-t border-l border-t-[#dcdcdc] border-l-[#dcdcdc] border-b border-r border-b-[#808080] border-r-[#808080]";

  const retroButton =
    "w-6 h-6 flex items-center justify-center bg-[#c0c0c0] " +
    "border-t border-l border-t-white border-l-white border-b border-r border-b-[#404040] border-r-[#404040] " +
    "active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white";

  /**
   * If desktopRef is provided, maximize inside that element.
   * Otherwise maximize to viewport.
   */
  const maximizedStyle: React.CSSProperties = desktopRef?.current
    ? (() => {
        const rect = desktopRef.current!.getBoundingClientRect();
        return {
          left: 0,
          top: 0,
          width: rect.width,
          height: rect.height,
        };
      })()
    : {
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
      };

  const windowedStyle: React.CSSProperties = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${windowSize.width}px`,
    height: `${windowSize.height}px`,
    maxWidth: "92vw",
    maxHeight: "86vh",
  };

  return (
    <div
      ref={windowRef}
      className={[
        // maximize should be absolute relative to desktop container; fixed if you want it pinned to viewport
        desktopRef ? "absolute" : "fixed",
        "overflow-hidden select-none",
        "bg-[#c0c0c0]",
        isMaximized ? "shadow-none" : "shadow-[6px_6px_0px_rgba(0,0,0,0.35)]",
        bevelOuter,
      ].join(" ")}
      style={{
        zIndex,
        ...(isMaximized ? maximizedStyle : windowedStyle),
      }}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div
        className={[
          "px-2 py-1 flex items-center justify-between",
          isMaximized ? "cursor-default" : "cursor-move",
          "bg-[#000080] text-white border-b border-b-[#404040]",
        ].join(" ")}
        onMouseDown={handleMouseDown}
        onDoubleClick={toggleMaximize} // nice retro touch: double click title bar
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-white border border-black" />
          <span className="text-[13px] font-bold tracking-tight">{title}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize();
            }}
            className={retroButton}
            aria-label={isMaximized ? "Restore" : "Maximize"}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <Maximize2 className="w-3.5 h-3.5 text-black" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className={retroButton}
            aria-label="Close"
            title="Close"
          >
            <X className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
      </div>

      {/* Toolbar / address row */}
      <div className={["px-2 py-2 flex items-center gap-2", bevelInner].join(" ")}>
        <div className="text-[12px] text-black font-semibold">Address</div>

        <div
          className={[
            "flex-1 px-2 py-1 bg-white text-black text-[12px] font-mono",
            "border-t border-l border-t-[#404040] border-l-[#404040] border-b border-r border-b-white border-r-white",
            "truncate",
          ].join(" ")}
        >
          <span className="text-[#666]">https://</span> {fakeUrl}
        </div>
      </div>

      {/* Content area */}
      <div className="h-[calc(100%-76px)] overflow-y-auto bg-white relative">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px)",
          }}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

export default BrowserWindow;
