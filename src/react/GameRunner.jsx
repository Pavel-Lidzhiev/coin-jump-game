import { useEffect } from "react";
import { runGame } from "../engine/runGame";
import { GAME_LEVELS } from "../level/levels";

const GameRunner = ({ addCoin, hudRef }) => {
  useEffect(() => {
    if (window.CanvasDisplay) {
      runGame(GAME_LEVELS, window.CanvasDisplay, addCoin?.current, hudRef);
    } else {
      console.error("CanvasDisplay не найден");
    }
  }, [addCoin, hudRef]);

  return null;
};

export default GameRunner;
