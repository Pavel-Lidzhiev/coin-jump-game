import { Vec } from "../core/Vec";
import { gravity, jumpSpeed, playerXSpeed } from "../utils/constants";

export class Player {
  constructor(pos, speed, size) {
    this.pos = pos;
    this.speed = speed;
    this.size = size;
  }

  get type() {
    return "player";
  }

  static create(pos) {
    return new Player(
      pos.plus(new Vec(0, -0.5)),
      new Vec(0, 0),
      new Vec(0.8, 1.5),
    );
  }
}

Player.prototype.update = function (time, state, keys) {
  let xSpeed = 0;
  if (keys.ArrowLeft) xSpeed -= playerXSpeed;
  if (keys.ArrowRight) xSpeed += playerXSpeed;

  const wantsCrouch = !!keys.ArrowDown;
  if (wantsCrouch) xSpeed *= 0.5;

  let pos = this.pos;
  let size = this.size;

  const normalHeight = 1.5;
  const crouchHeight = 0.5;

  let targetHeight;
  if (wantsCrouch) {
    targetHeight = crouchHeight;
  } else {
    const bottom = pos.y + size.y;
    const testSize = new Vec(size.x, normalHeight);
    const testPos = new Vec(pos.x, bottom - normalHeight);
    if (!state.level.touches(testPos, testSize, "wall")) {
      targetHeight = normalHeight;
    } else {
      targetHeight = size.y;
    }
  }

  const bottom = pos.y + size.y;
  size = new Vec(size.x, targetHeight);
  pos = new Vec(pos.x, bottom - size.y);

  const movedX = pos.plus(new Vec(xSpeed * time, 0));
  if (!state.level.touches(movedX, size, "wall")) pos = movedX;

  let ySpeed = this.speed.y + gravity * time;
  const movedY = pos.plus(new Vec(0, ySpeed * time));
  if (!state.level.touches(movedY, size, "wall")) {
    pos = movedY;
  } else if (keys.ArrowUp && ySpeed > 0) {
    ySpeed = -jumpSpeed;
  } else {
    ySpeed = 0;
  }

  const newPlayer = new Player(pos, new Vec(xSpeed, ySpeed), size);
  newPlayer.crouching = size.y <= crouchHeight;

  return newPlayer;
};
