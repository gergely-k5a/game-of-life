import * as constants from '../../constants';
import { deepCopyCells } from '../../utils';
import { CLEAR, PAUSE, PLAY, RESET, STEP, SWITCH_CELL } from './types';

export const clear = () => ({
  type: CLEAR,
});

export const pause = () => (dispatch, getState) => {
  const { intervalID } = getState();

  clearInterval(intervalID);

  dispatch({
    type: PAUSE,
  });
};

export const play = () => (dispatch, getState) => {
  const { cells, generation, intervalID, initialCells } = getState();
  if (intervalID !== null) return;

  const payload = {
    initialCells: generation === 0 ? deepCopyCells(cells) : initialCells,
    intervalID: setInterval(() => {
      dispatch(step());
    }, constants.DEFAULT_INTERVAL),
  };

  dispatch({
    type: PLAY,
    payload,
  });
};

export const reset = () => (dispatch) => {
  dispatch(pause());

  dispatch({
    type: RESET,
  });
};

export const step = () => ({
  type: STEP,
});

export const switchCell = (x, y) => ({
  type: SWITCH_CELL,
  payload: { x, y },
});
