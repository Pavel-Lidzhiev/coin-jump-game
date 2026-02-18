import { useState, useEffect } from "react";
import "./PauseButton.css";

export default function PauseButton() {
  const [paused, setPaused] = useState(false);

  const triggerSpace = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        code: "Space",
        key: " ",
      }),
    );
  };

  const handlePress = () => {
    triggerSpace();
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        setPaused((p) => !p);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <div className="pause-container">
        <div
          className={`pause-btn ${paused ? "active" : ""}`}
          onPointerDown={handlePress}
        >
          {paused ? "▶" : "⏸"}
        </div>
      </div>
      {paused && <div className="pause-overlay">ПАУЗА</div>}
    </>
  );
}
