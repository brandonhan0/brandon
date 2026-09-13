import { useState } from "react";

import Desktop from "./components/Desktop";
import BrowserWindow from "./components/BrowserWindow";
import LoginScreen from "./components/LoginScreen";

import AboutContent from "./components/content/AboutContent";
import ProjectsContent from "./components/content/ProjectsContent";
import WorkContent from "./components/content/WorkContent";
import FunContent from "./components/content/FunContent";
import ContactContent from "./components/content/ContactContent";
import CameraContent from "./components/content/CameraContent";


import loginBg from "./assets/backgrounds/blue.png"
import logo from "./assets/icons/brandon_2.gif"

export type AppType = "about" | "projects" | "work" | "fun" | "contact" | "camera";

interface OpenWindow {
  id: string;
  type: AppType;
  title: string;
  zIndex: number;
}

export default function App() {
  /** 🔐 login gate */
  const [entered, setEntered] = useState(false);

  /** 🪟 window management */
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1);

  const openApp = (type: AppType, title: string) => {
    const existing = openWindows.find((w) => w.type === type);
    if (existing) {
      bringToFront(existing.id);
      return;
    }

    const win: OpenWindow = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      zIndex: maxZIndex + 1,
    };

    setOpenWindows([...openWindows, win]);
    setMaxZIndex((z) => z + 1);
  };

  const closeWindow = (id: string) => {
    setOpenWindows((wins) => wins.filter((w) => w.id !== id));
  };

  const bringToFront = (id: string) => {
    const newZ = maxZIndex + 1;
    setOpenWindows((wins) =>
      wins.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w))
    );
    setMaxZIndex(newZ);
  };

  const getContent = (type: AppType) => {
    switch (type) {
      case "about":
        return <AboutContent />;
      case "projects":
        return <ProjectsContent />;
      case "work":
        return <WorkContent />;
      case "fun":
        return <FunContent />;
      case "contact":
        return <ContactContent />;
      case "camera":
        return <CameraContent />;
    }
  };

  /** 🔐 LOGIN SCREEN (FIRST) */
  if (!entered) {
    return (
      <LoginScreen
        onEnter={() => setEntered(true)}
        backgroundImage={loginBg}
        logoImage={logo}
        showScanlines={false}
      />
    );
  }

  /** 🖥️ DESKTOP + WINDOWS (AFTER ENTER) */
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Desktop onOpenApp={openApp} />

      {openWindows.map((win) => (
        <BrowserWindow
          key={win.id}
          id={win.id}
          title={win.title}
          zIndex={win.zIndex}
          onClose={() => closeWindow(win.id)}
          onFocus={() => bringToFront(win.id)}
        >
          {getContent(win.type)}
        </BrowserWindow>
      ))}
    </div>
  );
}
