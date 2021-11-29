import { CLEAR, PLAY, PAUSE, STEP, RESET, SWITCH_CELL } from './actions/types';
import * as constants from '../constants';
import { calculateNextCellState, switchCell } from '../utils';

const initialState = {
  cells: constants.BLANK_CELLS,
  generation: 0,
  initialCells: [],
  initialPopulation: 0,
  intervalID: null,
  population: 0,
};

export default function reducer(state = initialState, action) {
  const { cells } = state;

  switch (action.type) {
    case CLEAR:
      return {
        ...state,
        cells: constants.BLANK_CELLS,
        population: 0,
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
        population: state.initialPopulation,
      };

    case STEP:
      const { nextCellState, nextPopulation } = calculateNextCellState(cells);

      return {
        ...state,
        cells: nextCellState,
        generation: state.generation + 1,
        population: nextPopulation,
      };

    case SWITCH_CELL:
      const { rowIndex, cellIndex } = action.payload;
      const newCells = switchCell(cells, rowIndex, cellIndex);

      return {
        ...state,
        cells: newCells,
        population: cells[rowIndex][cellIndex]
          ? state.population - 1
          : state.population + 1,
      };

    default:
      return state;
  }
}
