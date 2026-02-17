import { State } from "../core/State";
import { runAnimation } from "../core/runAnimation";
import { arrowKeys } from "../utils/constants";

export function runLevel(level, Display, addCoin) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  let paused = false;

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      paused = !paused;
    }
  });

  return new Promise((resolve) => {
    runAnimation((time) => {
      if (paused) return true;

      state = state.update(time, arrowKeys, addCoin);
      display.syncState(state);

      if (state.status === "playing") return true;
      else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        resolve(state.status);
        return false;
      }
    });
  });
}
