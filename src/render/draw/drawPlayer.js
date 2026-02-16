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
    tile = 9; // прыжок
  } else if (player.speed.x !== 0) {
    tile = Math.floor(Date.now() / 60) % 8; // бег
  }

  // 🌟 Приседание: меняем высоту спрайта
  let drawHeight = height;
  let drawY = y;
  if (player.crouching) {
    drawHeight = scale; // высота одного блока
    drawY = y + (height - drawHeight); // сдвигаем вниз, чтобы низ оставался на месте
  }

  this.cx.save();
  if (this.flipPlayer) {
    flipHorizontally(this.cx, x + width / 2);
  }

  let tileX = tile * width;
  this.cx.drawImage(
    playerSprites,
    tileX,
    0,
    width,
    height,
    x,
    drawY,
    width,
    drawHeight,
  );
  this.cx.restore();
}
