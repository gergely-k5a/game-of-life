import { Component } from 'react';
import styled from 'styled-components';
import { countNeighbours } from '../../utils';
import { InitControls, RunControls } from './Controls';

class Field extends Component {
  constructor(props) {
    super(props);

    this.size = props.size || 30;

    this.blankCells = Array(this.size)
      .fill(null)
      .map(() => Array(this.size).fill(false));

    this.state = {
      cells: this.blankCells,
      intervalID: null,
      generation: 0,
      initialCells: [],
    };
  }

  clear = () => {
    this.setState({ cells: this.blankCells });
  };

  isPlaying = () => this.state.intervalID !== null;

  clickHandler = (e) => {
    if (this.state.generation > 0) return;

    const { rowIndex } = e.target.parentElement;
    const { cellIndex } = e.target;
    const { cells } = this.state;

    const newCellState = cells.map((row) => Array.from(row));
    newCellState[rowIndex][cellIndex] = !cells[rowIndex][cellIndex];

    this.setState({ cells: newCellState });
  };

  step = () => {
    const { cells } = this.state;
    const newCellState = cells.map((row) => Array.from(row));

    for (let ri = 0; ri < this.size; ri++) {
      for (let ci = 0; ci < this.size; ci++) {
        const count = countNeighbours(ri, ci, cells);
        if (cells[ri][ci] && (count < 3 || count > 4)) {
          newCellState[ri][ci] = false;
        }
        if (!cells[ri][ci] && count === 3) {
          newCellState[ri][ci] = true;
        }
      }
    }

    this.setState((prevState) => ({
      cells: newCellState,
      generation: prevState.generation + 1,
    }));
  };

  play = () => {
    if (this.state.intervalID !== null) return;
    if (this.state.generation === 0)
      this.setState((prevState) => ({ initialCells: prevState.cells }));

    const newIntervalID = setInterval(this.step, 5);
    this.setState({ intervalID: newIntervalID });
  };

  pause = () => {
    clearInterval(this.state.intervalID);
    this.setState({ intervalID: null });
  };

  reset = () => {
    this.pause();
    this.setState((prevState) => ({
      cells: prevState.initialCells,
      generation: 0,
    }));
  };

  render() {
    return (
      <div>
        <div>
          {this.state.generation > 0 ? (
            <RunControls
              play={this.play}
              pause={this.pause}
              reset={this.reset}
              step={this.step}
              isPlaying={this.isPlaying()}
            />
          ) : (
            <InitControls play={this.play} clear={this.clear} />
          )}
        </div>
        <TableWrapper>
          {this.state.cells.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <Cell key={ci} alive={cell} onClick={this.clickHandler} />
              ))}
            </tr>
          ))}
        </TableWrapper>
      </div>
    );
  }
}

const TableWrapper = ({ children }) => (
  <Table>
    <tbody>{children}</tbody>
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

export default Field;
