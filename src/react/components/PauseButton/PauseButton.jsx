import { useState, useEffect } from "react";
import "./PauseButton.css";

export default function PauseButton() {
  const [paused, setPaused] = useState(false);

  const togglePause = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        code: "Space",
        key: " ",
      }),
    );
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
    <div className="pause-container">
      <button
        className={`pause-btn ${paused ? "active" : ""}`}
        onMouseDown={togglePause}
        onTouchStart={togglePause}
      >
        {paused ? "▶" : "⏸"}
      </button>
    </div>
  );
}
