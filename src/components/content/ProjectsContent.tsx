import { useMemo, useState } from "react";

import java from "../../assets/images/image12.png";
import memory from "../../assets/images/image13.png";
import todo from "../../assets/images/image14.png";
import natpark from "../../assets/images/image15.png";
import plant from "../../assets/images/image16.png";
import layout from "../../assets/images/layout.png";
import schematic from "../../assets/images/schematic.png";
import otter from "../../assets/images/image17.jpeg";
import powder1 from "../../assets/images/image19.png";
import powder2 from "../../assets/images/image20.png";
import powder3 from "../../assets/images/image20.jpeg";




type ProjectItem = {
  title: string;
  description: string;
  tech: string[];
  images: string[];
};

const bevelOuter =
  "border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]";
const bevelInner =
  "border-t border-l border-t-[#dcdcdc] border-l-[#dcdcdc] border-b border-r border-b-[#808080] border-r-[#808080]";

const retroBtn =
  "px-3 py-1 bg-[#c0c0c0] text-black text-[12px] " +
  "border-t border-l border-t-white border-l-white border-b border-r border-b-[#404040] border-r-[#404040] " +
  "active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white";

function ProjectsContent() {
  const projects: ProjectItem[] = useMemo(
    () => [
      {
        title: "AI integrated automatic irrigation system",
        description:
          "automatic irrigation system that uses sensors to sense temperature, humity, and moisture levels of plants. interfaces with a custom ai agent model that gives summaries and analyzes data collected from sensors to give suggestions on how to optimize plant growth. designed PCB layout and soldered custom STM32 PCB for this project. Used KiCAD for circuit design and layout, orderd from JLCPCB.",
        tech: ["STM32", "C", "OpenAI API", "I2C", "USART", "PWM", "SPI"],
        images: [plant, layout, schematic],
      },
      {
        title: "fullstack Ecommerce platform",
        description:
          "developed scalable full stack ecommerce platform with stripe integrated customer view and supabase auth-secured admin portal.",
        tech: ["React", "Next.js", "Supabase", "Stripe API"],
        images: [powder2, powder1, powder3],
      },
      {
        title: "16 bit riscv cpu",
        description:
          "custom 16-bit riscv microprocessor for fpga deployment with a 5-stage pipelined architecture + hazard detection + caches.",
        tech: ["Verilog", "Basys3", "Pipeline", "Caches"],
        images: [otter],
      },
      {  
        title: "powershell",
        description:
          "made a simple powershell terminal in c that can execute basic commands, piping, redirection, scripts, and signal handling.",
        tech: ["C"],
        images: [],
      },
      {
        title: "todo list app",
        description:
          "simple todo list app for ios with add/edit/delete/complete tasks and local storage.",
        tech: ["Swift", "SwiftUI"],
        images: [todo],
      },
      {
        title: "fpga memory game",
        description:
          "led memory game on an fpga with fsm, seven seg, leds, controller, and accumulator.",
        tech: ["SystemVerilog", "Vivado", "Basys3"],
        images: [memory],
      },
      {
        title: "virtual world",
        description:
          "virtual world game in java with 150+ animations, manual/auto play, a* pathing, inventories, and tasks.",
        tech: ["Java", "Jupiter"],
        images: [java],
      },
      {
        title: "national park guide app",
        description:
          "swiftui + mapkit gallery for national parks with map annotations and detail view.",
        tech: ["Swift", "MapKit"],
        images: [natpark],
      },
    ],
    []
  );

  const [selectedProject, setSelectedProject] = useState(0);
  const active = projects[selectedProject];

  // Track which image is selected PER project
  const [activeImageByProject, setActiveImageByProject] = useState<Record<string, number>>({});

  const activeImageIndex = activeImageByProject[active.title] ?? 0;
  const activeImage = active.images[activeImageIndex];

  const setImageIndex = (projectTitle: string, idx: number) => {
    setActiveImageByProject((prev) => ({ ...prev, [projectTitle]: idx }));
  };

  const nextImage = () => {
    const next = (activeImageIndex + 1) % active.images.length;
    setImageIndex(active.title, next);
  };

  const prevImage = () => {
    const prev =
      (activeImageIndex - 1 + active.images.length) % active.images.length;
    setImageIndex(active.title, prev);
  };

  return (
    <div className="p-4 md:p-6 bg-white">
      {/* Header */}
      <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
        <div className={["bg-white p-4", bevelInner].join(" ")}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[22px] md:text-[26px] font-extrabold text-black">
                Projects
              </h1>

            </div>
            <div className="hidden md:block text-[11px] font-mono text-[#333] text-right">
              <div>DIR: C:\PORTFOLIO\PROJECTS</div>
              <div>FILES: {projects.length}</div>
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
              Projects
            </div>

            <div className="divide-y divide-[#e5e5e5]">
              {projects.map((p, i) => {
                const isActive = i === selectedProject;
                return (
                  <button
                    key={`${p.title}-${i}`}
                    onClick={() => setSelectedProject(i)}
                    className={[
                      "w-full text-left px-3 py-3",
                      "hover:bg-[#e9e9ff]",
                      isActive ? "bg-[#000080] text-white hover:bg-[#000080]" : "text-black",
                    ].join(" ")}
                  >
                    <div className="text-[13px] font-bold leading-tight">
                      {p.title}
                    </div>
                    <div className={["text-[12px] leading-tight", isActive ? "text-white/85" : "text-[#333]"].join(" ")}>
                      <span className="font-mono">{p.tech.slice(0, 3).join(", ")}</span>
                      {p.tech.length > 3 ? "..." : ""}
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
                <div className="font-bold text-[13px] truncate">{active.title}</div>
                <div className="text-[11px] text-white/80 truncate">
                  Images: {active.images.length} • Tech: {active.tech.length}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className={retroBtn}
                  onClick={() => setSelectedProject((s) => (s + 1) % projects.length)}
                >
                  Next
                </button>
              </div>
            </div>

            <div className="bg-white p-4 text-black">
              <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
                {/* Image viewer */}
                <div className="space-y-2">
                  <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
                    <div className={["bg-white", bevelInner].join(" ")}>
                      {activeImage ? (
                        <img
                          src={activeImage}
                          alt={active.title}
                          className="w-full h-[180px] object-cover"
                        />
                      ) : (
                        <div className="w-full h-[180px] flex items-center justify-center text-[12px] text-[#444]">
                          image goes here
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Thumbnails */}
                  {active.images.length > 1 && (
                    <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
                      <div className={["bg-white p-2", bevelInner].join(" ")}>
                        <div className="grid grid-cols-5 gap-2">
                          {active.images.map((img, idx) => {
                            const selected = idx === activeImageIndex;
                            return (
                              <button
                                key={`${img}-${idx}`}
                                onClick={() => setImageIndex(active.title, idx)}
                                className={[
                                  "p-1",
                                  selected ? "bg-[#000080]" : "bg-[#c0c0c0]",
                                  bevelOuter,
                                ].join(" ")}
                                title={`Image ${idx + 1}`}
                              >
                                <div className={["bg-white", bevelInner].join(" ")}>
                                  <img
                                    src={img}
                                    alt={`${active.title} ${idx + 1}`}
                                    className="w-full h-[42px] object-cover"
                                  />
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        <div className="mt-2 text-[11px] font-mono text-[#333]">
                          Preview: {activeImageIndex + 1}/{active.images.length}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="space-y-3">
                  <p className="text-[14px] leading-relaxed">{active.description}</p>

                  <div>
                    <div className="font-bold text-[12px] mb-2">Tech stack:</div>
                    <div className="flex flex-wrap gap-2">
                      {active.tech.map((t) => (
                        <span
                          key={t}
                          className={[
                            "text-[11px] px-2 py-1 bg-[#c0c0c0] text-black",
                            bevelOuter,
                          ].join(" ")}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>


                </div>
              </div>
            </div>

            <div className="bg-[#c0c0c0] px-3 py-2 text-[11px] font-mono text-black flex justify-between">
              <span>
                Selection: {selectedProject + 1}/{projects.length}
              </span>
              <span>Status: OK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsContent;
