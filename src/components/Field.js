import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { switchCell } from '../redux/actions';
import { isPlayingSelector } from '../redux/selectors';

export default function Field() {
  const cells = useSelector((state) => state.cells);
  const isPlaying = useSelector(isPlayingSelector);
  const dispatch = useDispatch();

  const clickHandler = (e) => {
    if (isPlaying) return;

    const { rowIndex } = e.target.parentElement;
    const { cellIndex } = e.target;

    dispatch(switchCell(rowIndex, cellIndex));
  };

  return (
    <TableWrapper>
      {cells.map((row, ri) => (
        <tr key={ri}>
          {row.map((cell, ci) => (
            <Cell key={ci} alive={cell} onClick={clickHandler} />
          ))}
        </tr>
      ))}
    </TableWrapper>
  );
}

const TableWrapper = (props) => (
  <Table id="gameTable">
    <tbody>{props.children}</tbody>
  </Table>
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
