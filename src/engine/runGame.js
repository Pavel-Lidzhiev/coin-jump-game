import { Level } from "../level/Level";
import { CanvasDisplay } from "../render/CanvasDisplay";
import { runLevel } from "./runLevel";

export async function runGame(plans, Display) {
  for (let level = 0; level < plans.length; ) {
    let status = await runLevel(new Level(plans[level]), Display);
    if (status === "won") level++;
  }
  console.log("Ты победил!");
}

window.CanvasDisplay = CanvasDisplay;
