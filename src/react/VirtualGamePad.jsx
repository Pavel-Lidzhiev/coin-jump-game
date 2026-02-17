import React, { useState, useEffect } from "react";
import { arrowKeys } from "../utils/constants";
import "./VirtualGamePad.css";

export default function VirtualGamePad() {
  const [activeKeys, setActiveKeys] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key in activeKeys) {
        setActiveKeys((prev) => ({ ...prev, [e.key]: true }));
      }
    };

    const handleKeyUp = (e) => {
      if (e.key in activeKeys) {
        setActiveKeys((prev) => ({ ...prev, [e.key]: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [activeKeys]);

  const handlePressStart = (direction) => {
    arrowKeys[direction] = true;
    setActiveKeys((prev) => ({ ...prev, [direction]: true }));
  };

  const handlePressEnd = (direction) => {
    arrowKeys[direction] = false;
    setActiveKeys((prev) => ({ ...prev, [direction]: false }));
  };

  return (
    <div className="virtual-gamepad">
      <div className="arrow-row">
        <button
          className={`arrow-btn ${activeKeys.ArrowUp ? "active" : ""}`}
          onMouseDown={() => handlePressStart("ArrowUp")}
          onMouseUp={() => handlePressEnd("ArrowUp")}
          onMouseLeave={() => handlePressEnd("ArrowUp")}
          onTouchStart={() => handlePressStart("ArrowUp")}
          onTouchEnd={() => handlePressEnd("ArrowUp")}
        >
          ↑
        </button>
      </div>
      <div className="arrow-row">
        <button
          className={`arrow-btn ${activeKeys.ArrowLeft ? "active" : ""}`}
          onMouseDown={() => handlePressStart("ArrowLeft")}
          onMouseUp={() => handlePressEnd("ArrowLeft")}
          onMouseLeave={() => handlePressEnd("ArrowLeft")}
          onTouchStart={() => handlePressStart("ArrowLeft")}
          onTouchEnd={() => handlePressEnd("ArrowLeft")}
        >
          ←
        </button>
        <button
          className={`arrow-btn ${activeKeys.ArrowDown ? "active" : ""}`}
          onMouseDown={() => handlePressStart("ArrowDown")}
          onMouseUp={() => handlePressEnd("ArrowDown")}
          onMouseLeave={() => handlePressEnd("ArrowDown")}
          onTouchStart={() => handlePressStart("ArrowDown")}
          onTouchEnd={() => handlePressEnd("ArrowDown")}
        >
          ↓
        </button>
        <button
          className={`arrow-btn ${activeKeys.ArrowRight ? "active" : ""}`}
          onMouseDown={() => handlePressStart("ArrowRight")}
          onMouseUp={() => handlePressEnd("ArrowRight")}
          onMouseLeave={() => handlePressEnd("ArrowRight")}
          onTouchStart={() => handlePressStart("ArrowRight")}
          onTouchEnd={() => handlePressEnd("ArrowRight")}
        >
          →
        </button>
      </div>
    </div>
  );
}
