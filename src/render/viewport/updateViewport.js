export function updateViewport(state) {
  let view = this.viewport;
  let player = state.player;
  let level = state.level;
  let center = player.pos.plus(player.size.times(0.5));

  let marginX = view.width / 3;
  let marginY = view.height / 3;

  if (level.width <= view.width) {
    view.left = (level.width - view.width) / 2;
  } else {
    if (center.x < view.left + marginX) {
      view.left = Math.max(center.x - marginX, 0);
    } else if (center.x > view.left + view.width - marginX) {
      view.left = Math.min(
        center.x + marginX - view.width,
        level.width - view.width,
      );
    }
  }

  if (level.height <= view.height) {
    view.top = (level.height - view.height) / 2;
  } else {
    if (center.y < view.top + marginY) {
      view.top = Math.max(center.y - marginY, 0);
    } else if (center.y > view.top + view.height - marginY) {
      view.top = Math.min(
        center.y + marginY - view.height,
        level.height - view.height,
      );
    }
  }
}
