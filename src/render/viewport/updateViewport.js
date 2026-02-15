export function updateViewport(state) {
  let view = this.viewport;
  let margin = view.width / 3;
  let player = state.player;
  let center = player.pos.plus(player.size.times(0.5));

  if (state.level.width < view.width) {
    view.left = (state.level.width - view.width) / 2;
  } else {
    if (center.x < view.left + margin) {
      view.left = Math.max(center.x - margin, 0);
    } else if (center.x > view.left + view.width - margin) {
      view.left = Math.min(
        center.x + margin - view.width,
        state.level.width - view.width,
      );
    }
  }

  if (state.level.height < view.height) {
    view.top = (state.level.height - view.height) / 2;
  } else {
    if (center.y < view.top + margin) {
      view.top = Math.max(center.y - margin, 0);
    } else if (center.y > view.top + view.height - margin) {
      view.top = Math.min(
        center.y + margin - view.height,
        state.level.height - view.height,
      );
    }
  }
}
