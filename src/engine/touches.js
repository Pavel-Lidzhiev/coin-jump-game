export function touches(pos, size, type) {
  const xStart = Math.floor(pos.x);
  const xEnd = Math.ceil(pos.x + size.x);
  const yStart = Math.floor(pos.y);
  const yEnd = Math.ceil(pos.y + size.y);

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      const isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
      const here = isOutside ? "wall" : this.rows[y][x];
      if (here === type) return true;
    }
  }
  return false;
}
