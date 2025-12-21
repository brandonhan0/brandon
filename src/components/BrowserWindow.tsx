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
    if (!windowRef.current
