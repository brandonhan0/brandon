import { useMemo, useState } from "react";

import racing from "../../assets/images/DSC_0240.jpg";
import robotics from "../../assets/images/urov.png";
import stanford from "../../assets/images/stanford.png";
import techrocks from "../../assets/images/techrocks.png";
import coderschool from "../../assets/images/coderschool.png";
import truedan from "../../assets/images/truedan.jpeg";
import wm from "../../assets/images/wm.jpeg";
import ussf from "../../assets/images/ussf.png";
import lucid from "../../assets/images/lucid.jpeg";


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
        role: "firmware lead",
        company: "calpoly racing",
        period: "june 2026 - now",
        description:
          "design and oversee all firmware functions and interactions on vehicle, including vehicle control, vehicle saftey, and data accqusition",
        achievements: [
          "headaches",
          "the hanger",
          "guh",
        ],
        image: racing,
      },
      {
        role: "vehicle software validation intern",
        company: "lucid motors",
        period: "june 2026 - september 2026",
        description:
          "i made so many friends here and all my coworkers were so awesome and i got to work on motor characterization, motor modeling, thermal modeling, daq system design, sensor validation and calibration, circuit design simulation and validation, system integration, structural design, brakes, testing procedures, wire harnessing, HIL automation, in-house tool development, vector canoe, capl, ni daq, infotainment, saving money, fusion 360",
        achievements: [
          "motors",
          "vector CANoe",
          "fusion 360",
          "circuits",
        ],
        image: lucid,
      },
      {
        role: "electronics team member",
        company: "calpoly racing",
        period: "september 2024 - june 2026",
        description:
          "leading subteam of firmware engineers to design and develop firmware for custom stm32 boards. working along side several other subsystems to design the best car for michigan FSAE compitition. we won 7th overall this year!! super exciting!!",
        achievements: [
          "steering wheel + teaching",
          "stm32 + can",
          "sensors + drs",
        ],
        image: racing,
      },
      {
        role: "software team member",
        company: "calpoly robotics",
        period: "september 2024 - september 2025",
        description:
          "working on the computer vision team for UROV, implemented software to autonomously map and localize an agent using opencv and slam, that was a pain in the butt and really sucked but was cool. wrote image stitching software that takes over 500 photos in real time and stitches them together to generate a interactable photosphere. built interactive ui dashboard for camera data and driver inputs. wrote vector matrix physics algorithms to control power sent to 6 different propellers on the urov, this was weird but bareable. wrote real time object identification and measurement algortihms using opencv",
        achievements: [
          "opencv + autonomous tasks",
          "500+ photo stitching pipeline",
          "real-time dashboard for camera + inputs",
        ],
        image: robotics,
      },
      {
        role: "coding instructor",
        company: "thecoderschool",
        period: "june 2025 - september 2025",
        description:
          "worked here over summer, had a good time teaching kids various applications of coding. taught python camps, minecraft camps, and game development camps. had 1 on 1 tutoring as well for clients who wanted help on personal projects.",
        achievements: ["python camps", "1:1 tutoring", "project-based teaching"],
        image: coderschool,
      },
      {
        role: "section leader",
        company: "stanford",
        period: "april 2025 - june 2025",
        description:
          "spent a few months leading weekly coding sections for a program at stanford, taught college students how to program in python and its various library applications. was actually super cool i had students from many countries across the world and i feel very privallged to be able to work here.",
        achievements: ["teaching + leadership", "python + libraries", "global cohort"],
        image: stanford,
      },
      {
        role: "coding instructor",
        company: "tech rocks!",
        period: "june 2018 - september 2023",
        description:
          "over breaks i taught kids voding fundamentals through scratch and code.org, i actually was a student here as well so it was fun. taught kids through minecraft modding and game design as well.",
        achievements: ["scratch/code.org", "minecraft modding", "game design"],
        image: techrocks,
      },
      {
        role: "sales associate",
        company: "world market",
        period: "november 2022 - april 2023",
        description: "cashier, stocking, customer help. coworkers were fun.",
        achievements: ["customer service", "stocking", "cashier"],
        image: wm ,
      },
      {
        role: "shift lead",
        company: "truedan",
        period: "august 2021 - july 2022",
        description: "i made boba here and it was fun, made good friends and got free boba and enjoyed serving people",
        achievements: ["shift lead", "service + ops", "team coordination"],
        image: truedan,
      },
      {
        role: "soccer referee",
        company: "USSF",
        period: "august 2016 - august 2019",
        description: "i was a soccer referee, i mainly refereed for youth soccer games lots of screaming parents yikes",
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
