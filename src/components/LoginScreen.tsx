import React, { useEffect } from "react";

type LoginScreenProps = {
  onEnter: () => void;
  backgroundImage: string;
  profileImage: string;
  username?: string;
  subtitle?: string;
};

const bevelOuter =
  "border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]";
const bevelInner =
  "border-t border-l border-t-[#dcdcdc] border-l-[#dcdcdc] border-b border-r border-b-[#808080] border-r-[#808080]";

const retroBtn =
  "px-5 py-2 bg-[#c0c0c0] text-black text-[13px] font-bold " +
  "border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-[#404040] border-r-[#404040] " +
  "active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white";

export default function LoginScreen({
  onEnter,
  backgroundImage,
  profileImage,
  username = "Brandon Han",
  subtitle = "Click ENTER to open desktop",
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
      {/* overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px)",
        }}
      />

      <div className="relative z-10 h-full w-full flex items-center justify-center p-6">
        <div className={["bg-[#c0c0c0] p-2 w-full max-w-md", bevelOuter].join(" ")}>
          <div className={["bg-white", bevelInner].join(" ")}>
            {/* title bar */}
            <div className="bg-[#000080] text-white px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white border border-black" />
                <span className="text-[13px] font-bold tracking-tight">LOGIN.EXE</span>
              </div>
              <span className="text-[11px] font-mono text-white/80">v1.0</span>
            </div>

            <div className="p-6">
              <div className="flex flex-col items-center text-center gap-4">
                {/* avatar */}
                <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
                  <div className={["bg-white p-2", bevelInner].join(" ")}>
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-black text-[18px] font-extrabold">{username}</div>
                  <div className="text-[#333] text-[12px] font-mono mt-1">{subtitle}</div>
                </div>

                <button onClick={onEnter} className={retroBtn}>
                  ENTER
                </button>

                <div className="text-[11px] font-mono text-[#444] pt-2">
                  Tip: press Enter
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="bg-[#c0c0c0] px-3 py-2 text-[11px] font-mono text-black flex justify-between">
              <span>Status: READY</span>
              <span>Mode: DESKTOP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
