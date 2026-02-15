import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./HUD.css";

const HUD = forwardRef(({ coinsRef }, ref) => {
  const [totalCoins, setTotalCoins] = useState(0);
  const [levelCoins, setLevelCoins] = useState(0);
  const lives = 3;

  useEffect(() => {
    if (coinsRef) {
      coinsRef.current = () => setLevelCoins((prev) => prev + 1);
    }
  }, [coinsRef]);

  useImperativeHandle(ref, () => ({
    saveLevelCoins: () => {
      setTotalCoins((prev) => prev + levelCoins);
      setLevelCoins(0);
    },
    resetLevelCoins: () => setLevelCoins(0),
  }));

  return (
    <div className="hud">
      <div className="lives">
        {Array.from({ length: lives }).map((_, i) => (
          <span key={i}>❤️</span>
        ))}
      </div>
      <div className="coins">🪙 {totalCoins + levelCoins}</div>
    </div>
  );
});

export default HUD;
