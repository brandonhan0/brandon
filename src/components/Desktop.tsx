import { useEffect, useMemo, useRef, useState } from "react";
import { AppType } from "../App";
import skull from "../assets/icons/toothless.gif";
import kiki from "../assets/icons/kiki.gif";
import car from "../assets/icons/poygon.gif";
import spongebob from "../assets/icons/spongebob.gif";
import charliebrown from "../assets/icons/shulker.gif";
import bgImage from "../assets/backgrounds/background.png";
//import bgImage from "../assets/backgrounds/space_background.gif";


interface DesktopProps {
  onOpenApp: (type: AppType, title: string) => void;
}

interface AppIconBase {
  type: AppType;
  title: string;
  icon: string;
}

type Point = { x: number; y: number };

/**
 * Makes a grid of non-overlapping "slots" (top-left positions).
 * cellW/cellH should be >= icon footprint (icon + label + padding).
 */
function makeSlots(opts: {
  width: number;
  height: number;
  padding: number;
  cellW: number;
  cellH: number;
}): Point[] {
  const { width, height, padding, cellW, cellH } = opts;
  const slots: Point[] = [];

  const xMax = Math.max(padding, width - padding - cellW);
  const yMax = Math.max(padding, height - padding - cellH);

  for (let y = padding; y <= yMax; y += cellH) {
    for (let x = padding; x <= xMax; x += cellW) {
      slots.push({ x, y });
    }
  }

  return slots;
}

/**
 * Deterministic shuffle using a seed (stable for the session).
 * This avoids icons jumping around on resize/rerender.
 */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  // turn 0..1 seed into a 32-bit int state
  let x = Math.floor(seed * 1_000_000_000) >>> 0;

  for (let i = a.length - 1; i > 0; i--) {
    // LCG PRNG (fast + fine for UI)
    x = (x * 1664525 + 1013904223) >>> 0;
    const j = x % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Desktop({ onOpenApp }: DesktopProps) {
  const apps: AppIconBase[] = useMemo(
    () => [
      { type: "about", title: "about me", icon: spongebob },
      { type: "projects", title: "projects", icon: charliebrown },
      { type: "work", title: "work experience", icon: car },
      { type: "fun", title: "fun stuff", icon: kiki },
      { type: "contact", title: "contact me", icon: skull },
    ],
    []
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  // Seed is created once per page load; reload => new seed => new layout
  const [seed, setSeed] = useState(() => Math.random());

  // Measure container
  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setSize({ w: Math.floor(rect.width), h: Math.floor(rect.height) });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Decide "mobile vs desktop" by width (Tailwind md = 768)
  const isDesktop = size.w >= 768;

  // Layout constants (tweak these)
  const cell = isDesktop
    ? { cellW: 140, cellH: 160, padding: 5 } // desktop spacing
    : { cellW: 120, cellH: 150, padding: 10 }; // mobile spacing

  const layoutKey = isDesktop ? "desktop" : "mobile";

  // Create a stable-for-session randomized layout that won't overlap
  const positions = useMemo(() => {
    if (size.w === 0 || size.h === 0) return null;

    const baseSlots = makeSlots({
      width: size.w,
      height: size.h,
      padding: cell.padding,
      cellW: cell.cellW,
      cellH: cell.cellH,
    });

    // If not enough slots (tiny screen), fall back to a tighter grid
    const slots =
      baseSlots.length >= apps.length
        ? baseSlots
        : makeSlots({
            width: size.w,
            height: size.h,
            padding: 8,
            cellW: Math.max(90, cell.cellW - 30),
            cellH: Math.max(120, cell.cellH - 30),
          });

    // Use a different derived seed for mobile vs desktop so layouts differ
    const derivedSeed = seed + (layoutKey === "desktop" ? 0.12345 : 0.6789);

    const shuffled = seededShuffle(slots, derivedSeed);

    const map: Record<string, { x: number; y: number }> = {};
    apps.forEach((app, i) => {
      const slot = shuffled[i] ?? { x: cell.padding, y: cell.padding };
      map[app.type] = slot;
    });

    return map;
  }, [
    apps,
    size.w,
    size.h,
    cell.cellW,
    cell.cellH,
    cell.padding,
    seed,
    layoutKey,
  ]);



  return (
    <div
      ref={containerRef}
      className="relative w-full h-full p-8 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >


      {positions &&
        apps.map((app) => {
          const p = positions[app.type];
          return (
            <button
              key={app.type}
              onClick={() => onOpenApp(app.type, app.title)}
              className="absolute group flex flex-col items-center gap-2 p-2 rounded-xl"
              style={{ left: p.x, top: p.y }}
            >
              <img
                src={app.icon}
                alt={app.title}
                className="w-24 h-24 rounded-2xl object-cover"
              />
              <span className="text-white text-base font-semibold text-center leading-snug drop-shadow-lg w-32">
                {app.title}
              </span>
            </button>
          );
        })}
    </div>
  );
}

export default Desktop;
