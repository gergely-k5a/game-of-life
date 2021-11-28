import { useState } from 'react';
import styled from 'styled-components';
import { countNeighbours } from '../../utils';

function Field({ size = 30 }) {
  const cellsInitState = Array(size)
    .fill(null)
    .map(() => Array(size).fill(false));

  const [cells, setCells] = useState(cellsInitState);
  const [intervalID, setIntervalID] = useState(null);

  const clickHandler = (e) => {
    const { rowIndex } = e.target.parentElement;
    const { cellIndex } = e.target;

    const newCellState = Array.from(cells);
    newCellState[rowIndex][cellIndex] = !cells[rowIndex][cellIndex];

    setCells(newCellState);
  };

  const step = () => {
    const newCellState = Array.from(cells);

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

    setCells(newCellState);
  };

  const startSimulation = () => {
    if (intervalID !== null) return;

    const newIntervalID = setInterval(step, 500);
    setIntervalID(newIntervalID);
  };

  const stopSimulation = () => {
    clearInterval(intervalID);
    setIntervalID(null);
  };

  const FieldWrapper = (props) => (
    <div>
      <div>
        <button onClick={step}>Step</button>
        <button onClick={startSimulation}>Start</button>
        <button onClick={stopSimulation}>Stop</button>
      </div>

      <Table>
        <tbody>{props.children}</tbody>
      </Table>
    </div>
  );

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

const Table = styled.table`
  border-collapse: collapse;
`;

const Cell = styled.td`
  width: 20px;
  height: 20px;
  border: 2px solid grey;
  background-color: ${(props) => (props.alive ? 'black' : 'white')};
`;

export default Field;
