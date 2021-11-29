import { Fragment } from 'react';
import { connect } from 'react-redux';

import { clear, pause, play, reset, step } from '../redux/actions';
import { isPlayingSelector } from '../redux/selectors';

const Controls = ({
  clear,
  generation,
  isPlaying,
  pause,
  play,
  reset,
  step,
}) => (
  <section id="controls">
    <button onClick={play}>Play</button>
    {generation === 0 ? (
      <button onClick={clear}>Clear</button>
    ) : (
      <Fragment>
        <button onClick={step} disabled={isPlaying}>
          Step
        </button>
        <button onClick={pause} disabled={!isPlaying}>
          Pause
        </button>
        <button onClick={reset}>Reset</button>
      </Fragment>
    )}
  </section>
);

export default connect(
  (state) => ({
    generation: state.generation,
    isPlaying: isPlayingSelector(state),
  }),
  { clear, pause, play, reset, step }
)(Controls);
