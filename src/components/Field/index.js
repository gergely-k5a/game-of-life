import { connect } from 'react-redux';
import styled from 'styled-components';
import { switchCell } from '../../redux/actions';
import { isPlayingSelector } from '../../redux/selectors';
import Controls from './Controls';

function Field({ cells, isPlaying, switchCell }) {
  const clickHandler = (e) => {
    if (isPlaying) return;

    const { rowIndex } = e.target.parentElement;
    const { cellIndex } = e.target;

    switchCell(rowIndex, cellIndex);
  };

  return (
    <FieldWrapper>
      {cells.map((row, ri) => (
        <tr key={ri}>
          {row.map((cell, ci) => (
            <Cell key={ci} alive={cell} onClick={clickHandler} />
          ))}
        </tr>
      ))}
    </FieldWrapper>
  );
}

const FieldWrapper = (props) => (
  <div>
    <Controls />
    <Table>
      <tbody>{props.children}</tbody>
    </Table>
  </div>
);

const Table = styled.table`
  border-collapse: collapse;
`;

const Cell = styled.td`
  width: 20px;
  height: 20px;
  border: 2px solid grey;
  background-color: ${(props) => (props.alive ? 'black' : 'white')};
`;

const mapStateToProps = (state) => ({
  cells: state.cells,
  isPlaying: isPlayingSelector(state),
});

const mapDispatchToProps = { switchCell };

export default connect(mapStateToProps, mapDispatchToProps)(Field);
