import { CLEAR, PLAY, PAUSE, STEP, RESET, SWITCH_CELL } from './actions/types';
import * as constants from '../constants';
import { calculateNextCellState, switchCell } from '../utils';

const initialState = {
  cells: constants.BLANK_CELLS,
  intervalID: null,
  generation: 0,
  initialCells: [],
};

export default function reducer(state = initialState, action) {
  const { cells } = state;

  switch (action.type) {
    case CLEAR:
      return {
        ...state,
        cells: constants.BLANK_CELLS,
      };

    case PAUSE:
      return {
        ...state,
        intervalID: null,
      };

    case PLAY:
      return {
        ...state,
        ...action.payload,
      };

    case RESET:
      return {
        ...state,
        cells: state.initialCells,
        generation: 0,
      };

    case STEP:
      return {
        ...state,
        cells: calculateNextCellState(cells),
        generation: state.generation + 1,
      };

    case SWITCH_CELL:
      return {
        ...state,
        cells: switchCell(cells, action.payload),
      };

    default:
      return state;
  }
}
