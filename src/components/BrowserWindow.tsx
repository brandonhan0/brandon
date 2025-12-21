import { useState, useRef, useEffect, ReactNode } from "react";
import { X, Maximize2 } from "lucide-react";

interface BrowserWindowProps {
  id: string;
  title: string;
  children: ReactNode;
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
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
  const [isMobile, setIsMobile] = useState(false);

  // store last windowed bounds so we can restore them
  const lastWindowed = useRef({
    x: 100,
    y: 80,
    width: 820,
    height: 620,
  });

  const [windowSize] = useState({ width: 820, height: 620 });

  // Detect mobile (Tailwind md breakpoint)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");

    const update = () => setIsMobile(mq.matches);
    update();

    // Safari older fallback: addListener/removeListener
    if ("addEventListener" in mq) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if ("removeEventListener" in mq) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  // Force fullscreen on mobile
  useEffect(() => {
    if (isMobile) {
      setIsMaximized(true);
      setIsDragging(false);
    }
  }, [isMobile]);

  // initial random placement (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const randomX = Math.random() * 150 + 50;
    const randomY = Math.random() * 100 + 50;
    setPosition({ x: randomX, y: randomY });
    lastWindowed.current.x = randomX;
    lastWindowed.current.y = randomY;
  }, [isMobile]);

  // dragging (desktop only, and not maximized)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMaximized || isMobile) return;

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
  }, [isDragging, dragOffset, isMaximized, isMobile]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    if (isMaximized) return;
    if (!windowRef.current) return;

    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
    onFocus();
  };

  const toggleMaximize = () => {
    // On mobile: always fullscreen, don't toggle
    if (isMobile) return;

    setIsMaximized((prev) => {
      const next = !prev;

      if (!prev) {
        lastWindowed.current = {
          x: position.x,
          y: position.y,
          width: windowSize.width,
          height: windowSize.height,
        };
      } else {
        setPosition({ x: lastWindowed.current.x, y: lastWindowed.current.y });
      }

      return next;
    });
  };

  const fakeUrl = `dragontrainer26.com/${title.toLowerCase().replace(/\s+/g, "-")}`;

  const bevelOuter =
    "border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]";
  const bevelInner =
    "border-t border-l border-t-[#dcdcdc] border-l-[#dcdcdc] border-b border-r border-b-[#808080] border-r-[#808080]";

  const retroButton =
    "w-6 h-6 flex items-center justify-center bg-[#c0c0c0] " +
    "border-t border-l border-t-white border-l-white border-b border-r border-b-[#404040] border-r-[#404040] " +
    "active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white";

  // If desktopRef is provided, maximize inside that element.
  const maximizedStyle: React.CSSProperties = desktopRef?.current
    ? (() => {
        const rect = desktopRef.current!.getBoundingClientRect();
        return { left: 0, top: 0, width: rect.width, height: rect.height };
      })()
    : { left: 0, top: 0, width: "100vw", height: "100vh" };

  const windowedStyle: React.CSSProperties = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${windowSize.width}px`,
    height: `${windowSize.height}px`,
    maxWidth: "92vw",
    maxHeight: "86vh",
  };

  // Mobile style: true fullscreen, always
  const mobileStyle: React.CSSProperties = {
    left: 0,
    top: 0,
    width: "100vw",
    height: "100vh",
  };

  return (
    <div
      ref={windowRef}
      className={[
        isMobile ? "fixed" : desktopRef ? "absolute" : "fixed",
        "overflow-hidden select-none",
        "bg-[#c0c0c0]",
        isMaximized || isMobile ? "shadow-none" : "shadow-[6px_6px_0px_rgba(0,0,0,0.35)]",
        bevelOuter,
      ].join(" ")}
      style={{
        zIndex,
        ...(isMobile ? mobileStyle : isMaximized ? maximizedStyle : windowedStyle),
      }}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div
        className={[
          "px-2 py-1 flex items-center justify-between",
          isMobile || isMaximized ? "cursor-default" : "cursor-move",
          "bg-[#000080] text-white border-b border-b-[#404040]",
        ].join(" ")}
        onMouseDown={handleMouseDown}
        onDoubleClick={toggleMaximize}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-white border border-black" />
          <span className="text-[13px] font-bold tracking-tight">{title}</span>
        </div>

        <div className="flex items-center gap-1">
          {/* Hide maximize on mobile (always fullscreen) */}
          {!isMobile && (
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
          )}

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
