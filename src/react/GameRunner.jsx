import { useEffect } from "react";
import { runGame } from "../engine/runGame";
import { GAME_LEVELS } from "../level/levels";

const GameRunner = () => {
  useEffect(() => {
    if (window.CanvasDisplay) {
      runGame(GAME_LEVELS, window.CanvasDisplay);
    } else {
      console.error("CanvasDisplay");
    }
  }, []);

  return null;
};

export default GameRunner;
