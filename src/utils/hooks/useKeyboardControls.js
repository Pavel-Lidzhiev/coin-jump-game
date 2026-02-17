import { useState, useEffect } from "react";

export default function useKeyboardControls(initialKeys) {
  const [activeKeys, setActiveKeys] = useState(initialKeys);

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

  const pressStart = (direction) => {
    setActiveKeys((prev) => ({ ...prev, [direction]: true }));
  };

  const pressEnd = (direction) => {
    setActiveKeys((prev) => ({ ...prev, [direction]: false }));
  };

  return [activeKeys, pressStart, pressEnd];
}
