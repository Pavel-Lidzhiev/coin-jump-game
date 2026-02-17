import { State } from "../core/State";
import { Vec } from "../core/Vec";

export class Lava {
  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
    this.size = new Vec(1, 1);
  }

  get type() {
    return "lava";
  }

  static create(pos, ch) {
    if (ch === "=") return new Lava(pos, new Vec(2, 0));
    if (ch === "|") return new Lava(pos, new Vec(0, 2));
    if (ch === "v") return new Lava(pos, new Vec(0, 3), pos);
  }
}

Lava.prototype.collide = function (state) {
  const player = state.player;

  if (player.invincibleTime > 0) return state;

  if (player.lives > 1) {
    const newActors = state.actors.map((a) => {
      if (a.type === "player") {
        return new a.constructor(a.pos, a.speed, a.size, a.lives - 1, 1);
      }
      return a;
    });
    return new State(state.level, newActors, "playing");
  } else {
    return new State(state.level, state.actors, "lost");
  }
};

Lava.prototype.update = function (time, state) {
  let newPos = this.pos.plus(this.speed.times(time));
  if (!state.level.touches(newPos, this.size, "wall")) {
    return new Lava(newPos, this.speed, this.reset);
  } else if (this.reset) {
    return new Lava(this.reset, this.speed, this.reset);
  } else {
    return new Lava(this.pos, this.speed.times(-1));
  }
};
