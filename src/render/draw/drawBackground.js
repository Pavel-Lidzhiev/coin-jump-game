import { otherSprites, scale } from "../../utils/constants";

export function drawBackground(level) {
  let { left, top, width, height } = this.viewport;

  let xStart = Math.floor(left);
  let xEnd = Math.ceil(left + width);
  let yStart = Math.floor(top);
  let yEnd = Math.ceil(top + height);

  // 🔥 защита от выхода за границы уровня
  xEnd = Math.min(xEnd, level.width);
  yEnd = Math.min(yEnd, level.height);

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      let row = level.rows[y];
      if (!row) continue; // дополнительная защита

      let tile = row[x];
      if (!tile || tile === "empty") continue;

      let screenX = (x - left) * scale;
      let screenY = (y - top) * scale;
      let tileX = tile === "lava" ? scale : 0;

      this.cx.drawImage(
        otherSprites,
        tileX,
        0,
        scale,
        scale,
        screenX,
        screenY,
        scale,
        scale,
      );
    }
  }
}
