import { Vec } from "../core/Vec";
import { gravity, jumpSpeed, playerXSpeed } from "../utils/constants";

export class Player {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }

  get type() {
    return "player";
  }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }
}

Player.prototype.update = function (time, state, keys) {
  let xSpeed = 0;
  if (keys.ArrowLeft) xSpeed -= playerXSpeed;
  if (keys.ArrowRight) xSpeed += playerXSpeed;

  let crouching = !!keys.ArrowDown;
  if (crouching) xSpeed *= 0.5;

  let pos = this.pos;

  // --- Горизонтальное движение ---
  let movedX = pos.plus(new Vec(xSpeed * time, 0));
  if (!state.level.touches(movedX, this.size, "wall")) pos = movedX;

  // --- Вертикальное движение ---
  let ySpeed = this.speed.y + gravity * time;
  let movedY = pos.plus(new Vec(0, ySpeed * time));
  if (!state.level.touches(movedY, this.size, "wall")) {
    pos = movedY;
  } else if (keys.ArrowUp && ySpeed > 0) {
    ySpeed = -jumpSpeed;
  } else {
    ySpeed = 0;
  }

  // --- Приседание / вставание ---
  const normalHeight = 1.5;
  const crouchHeight = 1;
  const targetHeight = crouching ? crouchHeight : normalHeight;

  // Нижняя граница игрока остаётся на месте
  const bottom = pos.y + this.size.y;
  const newPos = new Vec(pos.x, bottom - targetHeight);
  const newSize = new Vec(this.size.x, targetHeight);

  // Проверяем, можем ли изменить высоту
  if (!state.level.touches(newPos, newSize, "wall")) {
    pos = newPos;
    this.size = newSize;
  }

  // --- Возвращаем новый объект игрока ---
  const newPlayer = new Player(pos, new Vec(xSpeed, ySpeed));
  newPlayer.size = this.size;
  newPlayer.crouching = crouching && this.size.y === crouchHeight;
  return newPlayer;
};
