import { useEffect, useState } from "react";
import "./VictoryScreen.css";

export default function VictoryScreen({ show = false }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    const handleVictory = () => setVisible(true);

    window.addEventListener("victory", handleVictory);
    return () => window.removeEventListener("victory", handleVictory);
  }, []);

  if (!visible) return null;

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
