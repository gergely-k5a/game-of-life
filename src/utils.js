export const countNeighbours = (x, y, cells) => {
  const xmin = Math.max(x - 1, 0);
  const xmax = Math.min(x + 1, cells.length - 1);
  const ymin = Math.max(y - 1, 0);
  const ymax = Math.min(y + 1, cells.length - 1);
  let count = 0;

  for (let xo = xmin; xo <= xmax; xo++) {
    for (let yo = ymin; yo <= ymax; yo++) {
      count += cells[xo][yo];
    }
  }

  return count;
};

export const deepCopyCells = (cells) => {
  return cells.map((row) => Array.from(row));
};

export const switchCell = (cells, coord) => {
  const { x, y } = coord;
  const newCellState = deepCopyCells(cells);

  newCellState[x][y] = !cells[x][y];

  return newCellState;
};

export const calculateNextCellState = (cells) => {
  const nextCellState = deepCopyCells(cells);
  const size = cells.length;

  for (let ri = 0; ri < size; ri++) {
    for (let ci = 0; ci < size; ci++) {
      const count = countNeighbours(ri, ci, cells);
      if (cells[ri][ci] && (count < 3 || count > 4)) {
        nextCellState[ri][ci] = false;
      }
      if (!cells[ri][ci] && count === 3) {
        nextCellState[ri][ci] = true;
      }
    }
  }

  return nextCellState;
};
