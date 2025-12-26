import { useMemo, useState } from "react";
import pic1 from "../../assets/images/image1.jpeg";
import pic2 from "../../assets/images/image2.jpeg";
import pic4 from "../../assets/images/image4.jpeg";
import pic5 from "../../assets/images/image5.jpeg";
import pic6 from "../../assets/images/image6.jpeg";
import pic7 from "../../assets/images/image7.png";
import pic8 from "../../assets/images/image8.png";
import pic9 from "../../assets/images/image9.png";
import pic10 from "../../assets/images/image10.jpeg";
import pic11 from "../../assets/images/image11.jpeg";
import pic12 from "../../assets/images/LA.png";
import pic13 from "../../assets/images/tahoe.JPG";



type FunItem = {
  title: string;
  desc: string;
  image: string;
};

const bevelOuter =
  "border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]";
const bevelInner =
  "border-t border-l border-t-[#dcdcdc] border-l-[#dcdcdc] border-b border-r border-b-[#808080] border-r-[#808080]";

const retroBtn =
  "px-3 py-1 bg-[#c0c0c0] text-black text-[12px] " +
  "border-t border-l border-t-white border-l-white border-b border-r border-b-[#404040] border-r-[#404040] " +
  "active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white";



export default function FunContent() {
  const interests: FunItem[] = useMemo(
    () => [
      { title: "tahoe", desc: "tahoe hike in the rainy storm", image: pic13 },
      { title: "la", desc: "i went to LA and saw some palm trees", image: pic12 },
      { title: "tkd", desc: "heres my family", image: pic11 },
      { title: "tyler", desc: "best concert ive been too", image: pic10 },
      { title: "taiwan", desc: "am i a donut?", image: pic9 },
      { title: "climbing", desc: "this was a fun v3", image: pic8 },
      { title: "concert", desc: "billie concert was fire", image: pic7 },
      { title: "golf", desc: "i suck at golf but its for thanksgivng", image: pic6 },
      { title: "death valley", desc: "me and my brother in the dunes", image: pic1 },
      { title: "ebike", desc: "probably the best thing ive ever spent my money on", image: pic2 },
      { title: "bali", desc: "rice patties in bali", image: pic4 },
      { title: "atv", desc: "going through waterfalls and rivers and things", image: pic5 },
    ],
    []
  );

  const [selected, setSelected] = useState(0);
  const active = interests[selected];
  // const stamp = pickStamp(active.title);

  const next = () => setSelected((s) => (s + 1) % interests.length);
  const prev = () => setSelected((s) => (s - 1 + interests.length) % interests.length);

  return (
    <div className="p-4 md:p-6 bg-white">
      {/* Header */}
      <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
        <div className={["bg-white p-4", bevelInner].join(" ")}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[22px] md:text-[28px] font-extrabold text-black">
                Fun Stuff
              </h1>

            </div>

            <div className="hidden md:block text-[11px] font-mono text-[#333] text-right">
              <div>APP: PHOTO-VIEWER.EXE</div>
              <div>ALBUM: FUN</div>
              <div>FILES: {interests.length}</div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button className={retroBtn} onClick={prev}>
              Prev
            </button>
            <button className={retroBtn} onClick={next}>
              Next
            </button>

          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
        {/* Left list */}
        <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
          <div className={["bg-white", bevelInner].join(" ")}>
            <div className="bg-[#000080] text-white px-3 py-2 text-[13px] font-bold">
              Moments
            </div>

            <div className="divide-y divide-[#e5e5e5]">
              {interests.map((item, i) => {
                const isActive = i === selected;
                //const itemStamp = pickStamp(item.title);
                return (
                  <button
                    key={`${item.title}-${i}`}
                    onClick={() => setSelected(i)}
                    className={[
                      "w-full text-left px-3 py-3",
                      "hover:bg-[#e9e9ff]",
                      isActive ? "bg-[#000080] text-white hover:bg-[#000080]" : "text-black",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[13px] font-bold leading-tight">
                        {item.title}
                      </div>

                    </div>
                    <div
                      className={[
                        "text-[12px] leading-tight mt-1",
                        isActive ? "text-white/85" : "text-[#333]",
                      ].join(" ")}
                    >
                      {item.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right viewer */}
        <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
          <div className={["bg-[#c0c0c0] p-2", bevelInner].join(" ")}>
            {/* Viewer title bar */}
            <div className="bg-[#000080] text-white px-3 py-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-bold text-[13px] truncate">
                  {active.title}.jpg
                </div>
                <div className="text-[11px] text-white/80 truncate">
                  {selected + 1}/{interests.length} • album: FUN
                </div>
              </div>
            </div>

            {/* Photo viewer area */}
            <div className="bg-white p-4 text-black">
              <div className="grid grid-cols-1 gap-3">
                {/* big image */}
                <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
                  <div className={["bg-white relative overflow-hidden", bevelInner].join(" ")}>
                    <img
                      src={active.image}
                      alt={active.title}
                      className="w-full h-[320px] md:h-[420px] object-cover"
                    />

                    {/* scanlines overlay */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(to bottom, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px)",
                      }}
                    />


                  </div>
                </div>

                {/* caption like a polaroid strip */}
                <div className={["bg-[#c0c0c0] p-2", bevelOuter].join(" ")}>
                  <div className={["bg-white p-3", bevelInner].join(" ")}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[12px] font-bold">caption.txt</div>
                        <div className="text-[13px] text-[#333] mt-1 leading-relaxed">
                          {active.desc}
                        </div>
                      </div>
                      <div className="text-[11px] font-mono text-[#333] text-right whitespace-nowrap">

                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>

            {/* footer */}
            <div className="bg-[#c0c0c0] px-3 py-2 text-[11px] font-mono text-black flex justify-between">
              <span>Device: CRT</span>
              <span>Playback: 1x</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
