import React, { useMemo, useState } from "react";
import { Mail, Linkedin, Github, Copy, ExternalLink } from "lucide-react";

type ContactItem = {
  id: "email" | "linkedin" | "github";
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  stamp: string;
};

const bevelOuter =
  "border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]";
const bevelInner =
  "border-t border-l border-t-[#dcdcdc] border-l-[#dcdcdc] border-b border-r border-b-[#808080] border-r-[#808080]";

const retroBtn =
  "px-3 py-1 bg-[#c0c0c0] text-black text-[12px] " +
  "border-t border-l border-t-white border-l-white border-b border-r border-b-[#404040] border-r-[#404040] " +
  "active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white";

function StatusLight({ on }: { on: boolean }) {
  return (
    <div
      className={[
        "w-3 h-3 border border-black",
        on ? "bg-[#00c853]" : "bg-[#bdbdbd]",
      ].join(" ")}
      title={on ? "online" : "offline"}
    />
  );
}

export default function ContactContent() {
  const contacts: ContactItem[] = useMemo(
    () => [
      {
        id: "email",
        label: "Email",
        value: "dragontrainer26@gmail.com",
        href: "mailto:dragontrainer26@gmail.com",
        icon: <Mail className="w-4 h-4" />,
        stamp: "PRIMARY",
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        value: "linkedin.com/in/brandonhans",
        href: "https://www.linkedin.com/in/brandonhans/",
        icon: <Linkedin className="w-4 h-4" />,
        stamp: "SOCIAL",
      },
    ],
    []
  );

  const [selected, setSelected] = useState(0);
  const active = contacts[selected];

  const copyValue = async () => {
    try {
      await navigator.clipboard.writeText(active.value);
      // tiny retro feedback (no toast lib needed)
      alert("Copied to clipboard ✅");
    } catch {
      alert("Copy failed (browser blocked clipboard).");
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white">
      {/* Header */}
      <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
        <div className={["bg-white p-4", bevelInner].join(" ")}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[22px] md:text-[28px] font-extrabold text-black">
                Contact Me
              </h1>

            </div>

            <div className="hidden md:block text-[11px] font-mono text-[#333] text-right">
              <div>APP: CONTACTS.EXE</div>
              <div>USER: brandon</div>
            </div>
          </div>

        </div>
      </div>

      {/* Body */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
        {/* Left list */}
        <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
          <div className={["bg-white", bevelInner].join(" ")}>
            <div className="bg-[#000080] text-white px-3 py-2 text-[13px] font-bold">
              Contacts
            </div>

            <div className="divide-y divide-[#e5e5e5]">
              {contacts.map((c, i) => {
                const isActive = i === selected;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelected(i)}
                    className={[
                      "w-full text-left px-3 py-3",
                      "hover:bg-[#e9e9ff]",
                      isActive ? "bg-[#000080] text-white hover:bg-[#000080]" : "text-black",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={isActive ? "text-white" : "text-black"}>
                          {c.icon}
                        </span>
                        <span className="text-[13px] font-bold">{c.label}</span>
                      </div>
                      <span
                        className={[
                          "text-[10px] font-bold px-2 py-0.5 border border-black",
                          isActive ? "bg-white text-black" : "bg-[#ffeb3b] text-black",
                        ].join(" ")}
                      >
                        {c.stamp}
                      </span>
                    </div>
                    <div
                      className={[
                        "text-[12px] mt-1 font-mono truncate",
                        isActive ? "text-white/85" : "text-[#333]",
                      ].join(" ")}
                    >
                      {c.value}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right details */}
        <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
          <div className={["bg-[#c0c0c0] p-2", bevelInner].join(" ")}>
            {/* Header bar */}
            <div className="bg-[#000080] text-white px-3 py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-bold text-[13px] truncate">
                  {active.label}.card
                </div>
   
              </div>
              <div className="flex items-center gap-2">
                <StatusLight on />
                <span className="text-[11px] font-mono">ONLINE</span>
              </div>
            </div>

            {/* Card body */}
            <div className="bg-white p-4 text-black">
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4">
                {/* “avatar / badge” pane */}
                <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
                  <div className={["bg-white p-3", bevelInner].join(" ")}>
                    <div className="text-[12px] font-bold mb-2">contact.sys</div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 bg-[#000080] border border-black flex items-center justify-center text-white font-bold">
                        BH
                      </div>
                      <div>
                        <div className="text-[13px] font-bold">Brandon Han</div>
                        <div className="text-[11px] font-mono text-[#333]">
                          portfolio user
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-[#333] space-y-1">
                      <div>LAST SEEN: just now</div>

                    </div>
                  </div>
                </div>

                {/* details pane */}
                <div className="space-y-3">
                  <div>
                    <div className="text-[12px] font-bold">value:</div>
                    <div
                      className={[
                        "mt-1 px-2 py-2 bg-white text-black text-[12px] font-mono",
                        "border-t border-l border-t-[#404040] border-l-[#404040] border-b border-r border-b-white border-r-white",
                      ].join(" ")}
                    >
                      {active.value}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      className={retroBtn}
                      href={active.href}
                      target={active.id === "email" ? undefined : "_blank"}
                      rel={active.id === "email" ? undefined : "noreferrer"}
                    >
                      <span className="inline-flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Open
                      </span>
                    </a>

                    <button className={retroBtn} onClick={copyValue}>
                      <span className="inline-flex items-center gap-2">
                        <Copy className="w-4 h-4" />
                        Copy
                      </span>
                    </button>


                  </div>

                  <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
                    <div className={["bg-white p-3", bevelInner].join(" ")}>
                      <div className="text-[12px] font-bold mb-2">message.txt</div>
                      <p className="text-[13px] text-[#333] leading-relaxed">
                        best way to reach me is email. i check it alot. or like linked in too but i dont check it as much.
                      </p>
                    </div>
                  </div>

                  <div className={["bg-[#c0c0c0] px-3 py-2", bevelOuter].join(" ")}>
                    <div className="flex justify-between text-[11px] font-mono text-black">
                      <span>Selection: {selected + 1}/{contacts.length}</span>
                      <span>Status: OK</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
