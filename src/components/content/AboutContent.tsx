import React from "react";
import me from "../../assets/images/IMG_3672.jpg";
import snake from "../../assets/images/image3.jpeg";


const bevelOuter =
  "border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]";
const bevelInner =
  "border-t border-l border-t-[#dcdcdc] border-l-[#dcdcdc] border-b border-r border-b-[#808080] border-r-[#808080]";

const retroBtn =
  "px-3 py-1 bg-[#c0c0c0] text-black text-[12px] " +
  "border-t border-l border-t-white border-l-white border-b border-r border-b-[#404040] border-r-[#404040] " +
  "active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white";

function PhotoBlock({ src, caption }: { src: string; caption?: string }) {
  return (
    <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
      <div className={["bg-white p-2", bevelInner].join(" ")}>
        <img src={src} alt={caption ?? "photo"} className="w-full h-auto" />
        {caption && (
          <div className="mt-2 text-[11px] font-mono text-[#333]">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}

function NoteBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
      <div className={["bg-[#c0c0c0] p-2", bevelInner].join(" ")}>
        <div className="bg-[#000080] text-white px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white border border-black" />
            <div className="text-[13px] font-bold">{title}</div>
          </div>
          <span className="text-[11px] font-mono text-white/80">
            README.TXT
          </span>
        </div>
        <div className="bg-white p-4 text-black text-[14px] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function AboutContent() {
  return (
    <div className="p-4 md:p-6 bg-white">
      {/* Header */}
      <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
        <div className={["bg-white p-4", bevelInner].join(" ")}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[22px] md:text-[28px] font-extrabold text-black">
                About Me
              </h1>

            </div>

            <div className="hidden md:block text-[11px] font-mono text-[#333] text-right">
              <div>USER: brandon</div>
              <div>DIR: C:\PORTFOLIO\ABOUT</div>
            </div>
          </div>

          {/* Tiny “controls” row (purely for vibes) */}

        </div>
      </div>

      {/* Body */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-4">
        {/* Left: blog text */}
        <div className="space-y-4">
          <NoteBlock title="about_me.txt">
            <p>
            hello! my name is brandon and i am a 3rd year computer engineering student attending calpoly. i am part of a big family and i have an even bigger dog.
            i like trying new things and i frequently push myself into situations that i am unfamiliar with. this has led me to fall in love with many things. for example, i like electronics, i like climbing, i like photography, i like playing music, i like hiking biking, i like basketball, i like to go to the gym, and i like meeting new people. i also love eating food.

            </p>

          </NoteBlock>


          {/* Footer bar */}
          <div className={["bg-[#c0c0c0] px-3 py-2", bevelOuter].join(" ")}>
            <div className="flex justify-between text-[11px] font-mono text-black">
              <span>Status: OK</span>
              <span>Scroll: ENABLED</span>
            </div>
          </div>
        </div>

        {/* Right: photos + little side “widgets” */}
        <div className="space-y-4">
          <PhotoBlock
            src={me}
            caption="this is me"
          />



        </div>
      </div>
    </div>
  );
}
