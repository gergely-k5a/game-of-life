import { Fragment } from 'react';

export const InitControls = ({ clear, play }) => (
  <Fragment>
    <button onClick={play}>Play</button>
    <button onClick={clear}>Clear</button>
  </Fragment>
);

export const RunControls = ({ play, pause, step, reset, isPlaying }) => (
  <Fragment>
    <button onClick={step} disabled={isPlaying}>
      Step
    </button>
    <button onClick={play} disabled={isPlaying}>
      Play
    </button>
    <button onClick={pause} disabled={!isPlaying}>
      Pause
    </button>
    <button onClick={reset}>Reset</button>
  </Fragment>
);
