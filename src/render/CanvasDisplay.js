import { otherSprites, scale } from "../utils/constants";
import { drawBackground } from "./draw/drawBackground";
import { drawPlayer } from "./draw/drawPlayer";
import { updateViewport } from "./viewport/updateViewport";

export class CanvasDisplay {
  constructor(parent, level) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = Math.min(600, level.width * scale);
    this.canvas.height = Math.min(450, level.height * scale);
    parent.appendChild(this.canvas);
    this.cx = this.canvas.getContext("2d");

    this.flipPlayer = false;

    this.viewport = {
      left: 0,
      top: 0,
      width: this.canvas.width / scale,
      height: this.canvas.height / scale,
    };
  }

  clear() {
    this.canvas.remove();
  }
}

CanvasDisplay.prototype.drawActors = function (actors) {
  for (let actor of actors) {
    let width = actor.size.x * scale;
    let height = actor.size.y * scale;
    let x = (actor.pos.x - this.viewport.left) * scale;
    let y = (actor.pos.y - this.viewport.top) * scale;
    if (actor.type === "player") {
      this.drawPlayer(actor, x, y, width, height);
    } else {
      let tileX = (actor.type === "coin" ? 2 : 1) * scale;
      this.cx.drawImage(
        otherSprites,
        tileX,
        0,
        width,
        height,
        x,
        y,
        width,
        height,
      );
    }
  }
};

CanvasDisplay.prototype.clearDisplay = function (status) {
  if (status === "won") {
    this.cx.fillStyle = "rgb(68, 191, 255)";
  } else if (status === "lost") {
    this.cx.fillStyle = "rgb(44, 136, 214)";
  } else {
    this.cx.fillStyle = "rgb(52, 166, 251)";
  }
  this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

CanvasDisplay.prototype.syncState = function (state) {
  this.updateViewport(state);
  this.clearDisplay(state.status);
  this.drawBackground(state.level);
  this.drawActors(state.actors);
};

CanvasDisplay.prototype.drawPlayer = drawPlayer;
CanvasDisplay.prototype.updateViewport = updateViewport;
CanvasDisplay.prototype.drawBackground = drawBackground;
