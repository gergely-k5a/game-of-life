export const calculateNextCellState = (cells) => {
  const nextCellState = deepCopyCells(cells);
  const size = cells.length;
  let nextPopulation = 0;

  for (let ri = 0; ri < size; ri++) {
    for (let ci = 0; ci < size; ci++) {
      const count = countNeighbours(cells, ri, ci);
      if (cells[ri][ci]) {
        if (count < 3 || count > 4) {
          nextCellState[ri][ci] = false;
        } else {
          nextPopulation++;
        }
      }
      if (!cells[ri][ci] && count === 3) {
        nextCellState[ri][ci] = true;
        nextPopulation++;
      }
    }
  }

  return { nextCellState, nextPopulation };
};

export const deepCopyCells = (cells) => {
  return cells.map((row) => Array.from(row));
};

export const switchCell = (cells, rowIndex, columnIndex) => {
  const newCellState = deepCopyCells(cells);

  newCellState[rowIndex][columnIndex] = !cells[rowIndex][columnIndex];

  return newCellState;
};

const countNeighbours = (cells, rowIndex, columnIndex) => {
  const rimin = Math.max(rowIndex - 1, 0);
  const rimax = Math.min(rowIndex + 1, cells.length - 1);
  const cimin = Math.max(columnIndex - 1, 0);
  const cimax = Math.min(columnIndex + 1, cells.length - 1);
  let count = 0;

  for (let ri = rimin; ri <= rimax; ri++) {
    for (let ci = cimin; ci <= cimax; ci++) {
      count += cells[ri][ci];
    }
  }

  return count;
};
