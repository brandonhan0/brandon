import React, { useEffect } from "react";

type LoginScreenProps = {
  onEnter: () => void;
  backgroundImage: string;
  logoImage: string;
  showScanlines?: boolean;
};

const retroBtn =
  "px-6 py-3 bg-[#c0c0c0] text-black text-[14px] font-bold tracking-wide " +
  "border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-[#404040] border-r-[#404040] " +
  "active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white";

export default function LoginScreen({
  onEnter,
  backgroundImage,
  logoImage,
  showScanlines = false,
}: LoginScreenProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") onEnter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onEnter]);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/0" />

      {showScanlines && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px)",
          }}
        />
      )}

      {/* Centered content */}
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center">
          <img
            src={logoImage}
            alt="Logo"
            className="w-[240px] sm:w-[320px] md:w-[420px] h-auto image-rendering-pixelated"
            draggable={false}
          />

          {/* 👇 NEW TEXT */}
          <div className="text-white text-lg sm:text-xl md:text-2xl font-semibold tracking-wide drop-shadow-lg">
            welcome to my portfolio
          </div>

          <button onClick={onEnter} className={retroBtn}>
            ENTER
          </button>
        </div>
      </div>

      <style>{`
        .image-rendering-pixelated {
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }
      `}</style>
    </div>
  );
}
