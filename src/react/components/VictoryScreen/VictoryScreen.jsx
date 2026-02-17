import React, { useEffect, useState } from "react";
import "./VictoryScreen.css";

export default function VictoryScreen({ onClose }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, 5000); // экран автоматически исчезает через 5 секунд

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="victory-screen">
      <div className="victory-text">🎉 Победа! 🎉</div>
      <div className="confetti-container">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
