import { useState } from 'react';
import Desktop from './components/Desktop';
import BrowserWindow from './components/BrowserWindow';
import AboutContent from './components/content/AboutContent';
import ProjectsContent from './components/content/ProjectsContent';
import WorkContent from './components/content/WorkContent';
import FunContent from './components/content/FunContent';
import ContactContent from './components/content/ContactContent';

export type AppType = 'about' | 'projects' | 'work' | 'fun' | 'contact';

interface OpenWindow {
  id: string;
  type: AppType;
  title: string;
  zIndex: number;
}

function App() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1);

  const openApp = (type: AppType, title: string) => {
    const existingWindow = openWindows.find(w => w.type === type);
    if (existingWindow) {
      bringToFront(existingWindow.id);
      return;
    }

    const newWindow: OpenWindow = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      zIndex: maxZIndex + 1,
    };
    setOpenWindows([...openWindows, newWindow]);
    setMaxZIndex(maxZIndex + 1);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
  };

  const bringToFront = (id: string) => {
    const newZIndex = maxZIndex + 1;
    setOpenWindows(openWindows.map(w =>
      w.id === id ? { ...w, zIndex: newZIndex } : w
    ));
    setMaxZIndex(newZIndex);
  };

  const getContent = (type: AppType) => {
    switch (type) {
      case 'about':
        return <AboutContent />;
      case 'projects':
        return <ProjectsContent />;
      case 'work':
        return <WorkContent />;
      case 'fun':
        return <FunContent />;
      case 'contact':
        return <ContactContent />;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Desktop onOpenApp={openApp} />

      {openWindows.map((window) => (
        <BrowserWindow
          key={window.id}
          id={window.id}
          title={window.title}
          zIndex={window.zIndex}
          onClose={() => closeWindow(window.id)}
          onFocus={() => bringToFront(window.id)}
        >
          {getContent(window.type)}
        </BrowserWindow>
      ))}
    </div>
  );
}

export default App;
