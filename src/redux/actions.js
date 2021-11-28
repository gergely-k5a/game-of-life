import { defaultInterval } from '../constants';
import { deepCopyCells } from '../utils';

export const CLEAR = 'CLEAR';
export const PAUSE = 'PAUSE';
export const PLAY = 'PLAY';
export const RESET = 'RESET';
export const STEP = 'STEP';
export const SWITCH_CELL = 'SWITCH_CELL';

export const switchCell = (x, y) => ({
  type: SWITCH_CELL,
  payload: { x, y },
});

export const step = () => ({
  type: STEP,
});

export const clear = () => ({
  type: CLEAR,
});

export const play = () => (dispatch, getState) => {
  const { cells, generation, intervalID, initialCells } = getState();
  if (intervalID !== null) return;

  const payload = {
    initialCells: generation === 0 ? deepCopyCells(cells) : initialCells,
    intervalID: setInterval(() => {
      dispatch(step());
    }, defaultInterval),
  };

  dispatch({
    type: PLAY,
    payload,
  });
};

export const pause = () => (dispatch, getState) => {
  const { intervalID } = getState();

  clearInterval(intervalID);

  dispatch({
    type: PAUSE,
  });
};

export const reset = () => (dispatch, getState) => {
  dispatch(pause());

  dispatch({
    type: RESET,
  });
};
