import Button from 'react-bootstrap/Button';
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
  <section id="controls" className="d-grid gap-2">
    {isPlaying ? (
      <Button onClick={pause} size="lg">
        Pause
      </Button>
    ) : (
      <Button onClick={play} size="lg">
        Play
      </Button>
    )}
    {generation === 0 ? (
      <Button onClick={clear} variant="danger" size="lg">
        Clear
      </Button>
    ) : (
      <Fragment>
        <Button onClick={step} disabled={isPlaying} size="lg">
          Step
        </Button>
        <Button onClick={reset} variant="warning" size="lg">
          Reset
        </Button>
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
