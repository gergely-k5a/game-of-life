import { CLEAR, PLAY, PAUSE, STEP, RESET, SWITCH_CELL } from './actions';
import { blankCells } from '../constants';
import { countNeighbours, deepCopyCells } from '../utils';

const initialState = {
  cells: blankCells,
  intervalID: null,
  generation: 0,
  initialCells: [],
};

export default function reducer(state = initialState, action) {
  const { cells } = state;

  if (action.type === SWITCH_CELL) {
    const { x, y } = action.payload;
    const newCellState = deepCopyCells(cells);

    newCellState[x][y] = !state.cells[x][y];

    return {
      ...state,
      cells: newCellState,
    };
  }

  if (action.type === STEP) {
    const newCellState = deepCopyCells(cells);
    const size = cells.length;

    for (let ri = 0; ri < size; ri++) {
      for (let ci = 0; ci < size; ci++) {
        const count = countNeighbours(ri, ci, cells);
        if (cells[ri][ci] && (count < 3 || count > 4)) {
          newCellState[ri][ci] = false;
        }
        if (!cells[ri][ci] && count === 3) {
          newCellState[ri][ci] = true;
        }
      }
    }

    return {
      ...state,
      cells: newCellState,
      generation: state.generation + 1,
    };
  }

  if (action.type === CLEAR) {
    return {
      ...state,
      cells: blankCells,
    };
  }

  if (action.type === PLAY) {
    return {
      ...state,
      ...action.payload,
    };
  }

  if (action.type === PAUSE) {
    return {
      ...state,
      intervalID: null,
    };
  }

  if (action.type === RESET) {
    return {
      ...state,
      cells: state.initialCells,
      generation: 0,
    };
  }

  return state;
}
