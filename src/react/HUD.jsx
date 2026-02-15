// HUD.jsx
import "./HUD.css";

const HUD = () => {
  const lives = 3;
  const coins = 0;

  return (
    <div className="hud">
      <div className="lives">
        {Array.from({ length: lives }).map((_, i) => (
          <span key={i} className="heart">
            ❤️
          </span>
        ))}
      </div>

      <div className="coins">
        <span className="coin">🪙</span>
        <span className="coin-count">{coins}</span>
      </div>
    </div>
  );
};

export default HUD;
