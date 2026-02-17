import { overlap } from "../engine/overlap";

export class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level) {
    return new State(level, level.startActors, "playing");
  }

  get player() {
    return this.actors.find((a) => a.type === "player");
  }
}

State.prototype.update = function (time, keys, addCoin) {
  let actors = this.actors.map((actor) => actor.update(time, this, keys));
  let newState = new State(this.level, actors, this.status);

  if (newState.status !== "playing") return newState;

  let player = newState.player;

  if (this.level.touches(player.pos, player.size, "lava")) {
    if (player.invincibleTime <= 0) {
      if (player.lives > 1) {
        actors = actors.map((a) => {
          if (a.type === "player") {
            return new a.constructor(a.pos, a.speed, a.size, a.lives - 1, 1);
          }
          return a;
        });
        newState = new State(this.level, actors, "playing");
        player = newState.player;
      } else {
        return new State(this.level, actors, "lost");
      }
    }
  }

  for (let actor of actors) {
    if (actor !== player && overlap(actor, player)) {
      if (actor.type === "lava" && typeof actor.collide === "function") {
        newState = actor.collide(newState);
      } else if (typeof actor.collide === "function") {
        newState = actor.collide(newState, addCoin);
      }
      player = newState.player;
    }
  }

  return newState;
};
