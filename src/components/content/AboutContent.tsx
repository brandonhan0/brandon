import React from "react";

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
              <p className="text-[13px] text-[#333] mt-1">
                A little blog-style page so you can get the vibe.
              </p>
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
          <NoteBlock title="hello_world.txt">
            <p>
              hello! my name’s brandon and i’m a computer engineering student at
              cal poly. i like building stuff, learning fast, and then building
              it again but better. i’m happiest when i’m outside, moving, or
              making something that feels real.
            </p>

            <div className="mt-4">
              <div className="font-bold text-[12px] mb-2">quick facts:</div>
              <ul className="list-disc pl-5 space-y-1 text-[13px]">
                <li>computer engineering @ cal poly</li>
                <li>i like firmware + systems + building things</li>
                <li>i’m big on outdoors, exercise, and music</li>
                <li>i’m part of a big family (and an even bigger dog)</li>
              </ul>
            </div>
          </NoteBlock>

          <NoteBlock title="what_im_into.txt">
            <p>
              i like trying new things and i push myself into situations i’m not
              familiar with. it’s fun, it’s uncomfortable, and it’s how i end up
              finding things i genuinely love.
            </p>

            <div className="mt-4">
              <div className="font-bold text-[12px] mb-2">currently on rotation:</div>
              <ul className="list-disc pl-5 space-y-1 text-[13px]">
                <li>climbing / hiking / biking</li>
                <li>basketball + gym</li>
                <li>meeting new people</li>
                <li>eating food (important)</li>
              </ul>
            </div>
          </NoteBlock>

          <NoteBlock title="funny_story.log">
            <p>
              this snake was actually about to eat me but it’s ok i am alive.
              (i’m adding this here because it’s too funny not to include.)
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
            src="/images/image0.jpeg"
            caption="me (photo.exe)"
          />

          <PhotoBlock
            src="/images/image3.jpeg"
            caption="snake encounter (do not recommend)"
          />

          <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
            <div className={["bg-white p-3", bevelInner].join(" ")}>
              <div className="text-[12px] font-bold text-black mb-2">
                status panel
              </div>
              <div className="text-[12px] font-mono text-[#333] space-y-1">
                <div>energy: high</div>
                <div>outside time: needed</div>
                <div>currently building: something</div>
                <div>mood: 😎</div>
              </div>
            </div>
          </div>

          <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
            <div className={["bg-white p-3", bevelInner].join(" ")}>
              <div className="text-[12px] font-bold text-black mb-2">
                small note
              </div>
              <p className="text-[13px] text-[#333] leading-relaxed">
                if you ever want to talk about firmware, embedded systems, or
                building weird projects, i’m always down.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
