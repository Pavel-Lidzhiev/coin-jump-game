import { playerSprites, playerXOverlap, scale } from "../../utils/constants";
import { flipHorizontally } from "../../utils/flipHorizontally";

export function drawPlayer(player, x, y, width, height) {
  width += playerXOverlap * 2;
  x -= playerXOverlap;

  if (player.speed.x !== 0) {
    this.flipPlayer = player.speed.x < 0;
  }

  let tile = 8;
  if (player.speed.y !== 0) {
    tile = 9;
  } else if (player.speed.x !== 0) {
    tile = Math.floor(Date.now() / 60) % 8;
  }

  let drawHeight = height;
  let drawY = y;

  if (player.crouching) {
    const visualHeight = scale;
    drawY = y + (height - visualHeight);
    drawHeight = visualHeight;
  }

  const sourceHeight = playerSprites.height;
  const sourceY = 0;

  this.cx.save();
  if (this.flipPlayer) flipHorizontally(this.cx, x + width / 2);

  const tileX = tile * width;
  this.cx.drawImage(
    playerSprites,
    tileX,
    sourceY,
    width,
    sourceHeight,
    x,
    drawY,
    width,
    drawHeight,
  );

  this.cx.restore();
}
