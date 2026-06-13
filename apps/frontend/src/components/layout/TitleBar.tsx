import React from 'react';
import { Minimize, Maximize, X } from 'lucide-react';

const TitleBar: React.FC = () => {
  const handleMinimize = () => {
    if (window.faliz && window.faliz.window) {
      window.faliz.window.minimize();
    }
  };

  const handleMaximize = () => {
    if (window.faliz && window.faliz.window) {
      window.faliz.window.maximize();
    }
  };

  const handleClose = () => {
    if (window.faliz && window.faliz.window) {
      window.faliz.window.close();
    }
  };

  return (
    <div className="flex justify-between items-center h-8 bg-void text-falizText px-2 draggable">
      <div className="flex-grow text-center text-sm font-syne">FALIZ AI</div>
      <div className="flex">
        <button onClick={handleMinimize} className="p-1 hover:bg-falizMuted rounded">
          <Minimize size={16} />
        </button>
        <button onClick={handleMaximize} className="p-1 hover:bg-falizMuted rounded mx-1">
          <Maximize size={16} />
        </button>
        <button onClick={handleClose} className="p-1 hover:bg-danger hover:text-white rounded">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};


export default TitleBar;
