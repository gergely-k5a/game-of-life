import { calculateNextCellState, deepCopyCells, switchCell } from '.';
import { cellsMock, steppedCellsMock } from './mocks';

test('deepCopyCells returns a new deep copy of the cell array', () => {
  const newCells = deepCopyCells(cellsMock);

  expect(newCells).toEqual(cellsMock);
  expect(newCells).not.toBe(cellsMock);
});

test('switchCell switches the status of a given cell returning a new array', () => {
  const newCells = switchCell(cellsMock, 11, 8);
  expect(newCells[11][8]).toBe(true);

  const newCells2 = switchCell(cellsMock, 12, 8);
  expect(newCells2[12][8]).toBe(false);

  expect(newCells).not.toBe(cellsMock);
});

test('calculateNextCellState returns an object containing a new cell array representing the next generation of cells and the new population', () => {
  const { nextCellState, nextPopulation } = calculateNextCellState(cellsMock);

  expect(nextCellState).toEqual(steppedCellsMock);
  expect(nextPopulation).toBe(5);
  expect(nextCellState).not.toBe(cellsMock);
});
