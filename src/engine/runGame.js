import { Level } from "../level/Level";
import { CanvasDisplay } from "../render/CanvasDisplay";
import { runLevel } from "./runLevel";

export async function runGame(plans, Display, addCoin, hudRef, setPlayer) {
  for (let level = 0; level < plans.length; ) {
    const addCoinCallback = () => {
      if (addCoin) addCoin();
    };

    let status = await runLevel(
      new Level(plans[level]),
      Display,
      addCoinCallback,
      setPlayer,
    );

    if (status === "won") {
      hudRef?.current?.saveLevelCoins();
      level++;
    } else if (status === "lost") {
      hudRef?.current?.resetLevelCoins();
    }
  }

  console.log("Ты победил!");
}

window.CanvasDisplay = CanvasDisplay;
