import { useMemo, useState } from "react";

import racing from "../../assets/images/racing.png";
import robotics from "../../assets/images/robotics.jpeg";
import stanford from "../../assets/images/stanford.png";
import techrocks from "../../assets/images/techrocks.jpeg";
import coderschool from "../../assets/images/image16.png";
import truedan from "../../assets/images/truedan.jpeg";
import wm from "../../assets/images/wm.jpeg";
import ussf from "../../assets/images/image20.png";

type WorkItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  image?: string;
};

const bevelOuter =
  "border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]";
const bevelInner =
  "border-t border-l border-t-[#dcdcdc] border-l-[#dcdcdc] border-b border-r border-b-[#808080] border-r-[#808080]";

const retroBtn =
  "px-3 py-1 bg-[#c0c0c0] text-black text-[12px] " +
  "border-t border-l border-t-white border-l-white border-b border-r border-b-[#404040] border-r-[#404040] " +
  "active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white";

function WorkContent() {
  const experiences: WorkItem[] = useMemo(
    () => [
      {
        role: "firmware project lead",
        company: "calpoly racing",
        period: "2024 - now",
        description:
          "leading a firmware subteam to design and develop stm32 firmware for custom pcbs. leading can board + drs. integrating sensors for data acquisition, verification, and internal board comms. working with other subsystems for michigan fsae.",
        achievements: [
          "led firmware workstreams + planning",
          "stm32 + can communication",
          "sensor integration + test verification",
        ],
        image: racing,
      },
      {
        role: "software developer",
        company: "calpoly robotics",
        period: "2024 - now",
        description:
          "computer vision team for urov: mapping/localization, image stitching (photosphere), ui dashboards, and control algorithms for propulsion.",
        achievements: [
          "opencv + slam work",
          "500+ photo stitching pipeline",
          "real-time dashboard for camera + inputs",
        ],
        image: robotics,
      },
      {
        role: "coding instructor",
        company: "thecoderschool",
        period: "2025",
        description:
          "taught python, minecraft, and game dev camps + 1:1 tutoring for student projects.",
        achievements: ["python camps", "1:1 tutoring", "project-based teaching"],
        image: coderschool,
      },
      {
        role: "section leader",
        company: "stanford",
        period: "2025",
        description:
          "led weekly coding sections; taught python + libraries to a global cohort.",
        achievements: ["teaching + leadership", "python + libraries", "global cohort"],
        image: stanford,
      },
      {
        role: "coding instructor",
        company: "tech rocks!",
        period: "2018 - 2023",
        description:
          "taught coding fundamentals with scratch/code.org + minecraft modding/game design.",
        achievements: ["scratch/code.org", "minecraft modding", "game design"],
        image: techrocks,
      },
      {
        role: "sales associate",
        company: "world market",
        period: "2022 - 2023",
        description: "cashier, stocking, customer help. coworkers were fun.",
        achievements: ["customer service", "stocking", "cashier"],
        image: wm ,
      },
      {
        role: "shift lead",
        company: "truedan",
        period: "2021 - 2022",
        description: "made boba, led shifts, kept ops smooth.",
        achievements: ["shift lead", "service + ops", "team coordination"],
        image: truedan,
      },
      {
        role: "soccer referee",
        company: "USSF",
        period: "2016 - 2019",
        description: "refereed youth games (lots of screaming parents yikes).",
        achievements: ["decision making", "communication", "conflict management"],
        image: ussf,
      },
    ],
    []
  );

  const [selected, setSelected] = useState(0);
  const active = experiences[selected];

  return (
    <div className="p-4 md:p-6 bg-white">
      {/* Header */}
      <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
        <div className={["bg-white p-4", bevelInner].join(" ")}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[22px] md:text-[26px] font-extrabold text-black">
                Work Experience
              </h1>
              <p className="text-[13px] text-[#333] mt-1">
                Click a record to view details (like a retro file explorer).
              </p>
            </div>
            <div className="hidden md:block text-[11px] font-mono text-[#333] text-right">
              <div>DIR: C:\PORTFOLIO\WORK</div>
              <div>FILES: {experiences.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4">
        {/* Left list */}
        <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
          <div className={["bg-white", bevelInner].join(" ")}>
            <div className="bg-[#000080] text-white px-3 py-2 text-[13px] font-bold">
              Records
            </div>

            <div className="divide-y divide-[#e5e5e5]">
              {experiences.map((e, i) => {
                const isActive = i === selected;
                return (
                  <button
                    key={`${e.company}-${e.role}-${i}`}
                    onClick={() => setSelected(i)}
                    className={[
                      "w-full text-left px-3 py-3",
                      "hover:bg-[#e9e9ff]",
                      isActive ? "bg-[#000080] text-white hover:bg-[#000080]" : "text-black",
                    ].join(" ")}
                  >
                    <div className="text-[13px] font-bold leading-tight">
                      {e.role}
                    </div>
                    <div className={["text-[12px] leading-tight", isActive ? "text-white/85" : "text-[#333]"].join(" ")}>
                      {e.company} • <span className="font-mono">{e.period}</span>
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
            <div className="bg-[#000080] text-white px-3 py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-bold text-[13px] truncate">{active.role}</div>
                <div className="text-[11px] text-white/80 truncate">
                  {active.company} • {active.period}
                </div>
              </div>
              <button
                className={retroBtn}
                onClick={() => setSelected((s) => (s + 1) % experiences.length)}
              >
                Next
              </button>
            </div>

            <div className="bg-white p-4 text-black">
              <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4">
                {/* image */}
                <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
                  <div className={["bg-white", bevelInner].join(" ")}>
                    {active.image ? (
                      <img
                        src={active.image}
                        alt={active.company}
                        className="w-full h-[160px] object-cover"
                      />
                    ) : (
                      <div className="w-full h-[160px] flex items-center justify-center text-[12px] text-[#444]">
                        image/logo goes here
                      </div>
                    )}
                  </div>
                </div>

                {/* text */}
                <div className="space-y-3">
                  <p className="text-[14px] leading-relaxed">{active.description}</p>

                  <div>
                    <div className="font-bold text-[12px] mb-2">Highlights:</div>
                    <ul className="list-disc pl-5 space-y-1 text-[13px]">
                      {active.achievements.map((a, idx) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className={retroBtn}>Save</span>
                    <span className={retroBtn}>Print</span>
                    <span className={retroBtn}>Details</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#c0c0c0] px-3 py-2 text-[11px] font-mono text-black flex justify-between">
              <span>Selection: {selected + 1}/{experiences.length}</span>
              <span>Status: OK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkContent;
