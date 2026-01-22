import { Level } from "../level/Level";
import { Vec } from "../core/Vec";
import { Player } from "../entities/Player";
import { Coin } from "../entities/Coin";
import { CanvasDisplay } from "../render/CanvasDisplay";
import { Lava } from "../entities/Lava";
import { trackKeys } from "../input/trackKeys";
import { runLevel } from "./runLevel";

let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

Player.prototype.size = new Vec(0.8, 1.5);

Lava.prototype.size = new Vec(1, 1);

Coin.prototype.size = new Vec(0.6, 0.6);

export const levelChars = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  o: Coin,
  "=": Lava,
  "|": Lava,
  v: Lava,
};

export let simpleLevel = new Level(simpleLevelPlan);

export const scale = 20;

export const wobbleSpeed = 8,
  wobbleDist = 0.07;

export const playerXSpeed = 7;
export const gravity = 30;
export const jumpSpeed = 17;
export const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

export const otherSprites = document.createElement("img");
otherSprites.src = "/sprites.png";

export const playerSprites = document.createElement("img");
playerSprites.src = "/player.png";

export const playerXOverlap = 4;

export async function runGame(plans, Display) {
  for (let level = 0; level < plans.length; ) {
    let status = await runLevel(new Level(plans[level]), Display);
    if (status === "won") level++;
  }
  console.log("Ты победил!");
}

window.CanvasDisplay = CanvasDisplay;
