export const countNeighbours = (x, y, cells) => {
  const edge = cells.length - 1;
  let count = 0;

  for (let xo = Math.max(x - 1, 0); xo <= Math.min(x + 1, edge); xo++) {
    for (let yo = Math.max(y - 1, 0); yo <= Math.min(y + 1, edge); yo++) {
      count += cells[xo][yo];
    }
  }

  return count;
};
