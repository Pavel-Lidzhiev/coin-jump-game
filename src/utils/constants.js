import { Vec } from "../core/Vec";
import { Player } from "../entities/Player";
import { Coin } from "../entities/Coin";
import { Lava } from "../entities/Lava";
import { trackKeys } from "../input/trackKeys";

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

export const scale = 20;

export const wobbleSpeed = 8,
  wobbleDist = 0.07;

export const playerXSpeed = 7;
export const gravity = 30;
export const jumpSpeed = 17;
export const arrowKeys = trackKeys([
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
]);

export const otherSprites = document.createElement("img");
otherSprites.src = "/sprites.png";

export const playerSprites = document.createElement("img");
playerSprites.src = "/player.png";

export const playerXOverlap = 4;
