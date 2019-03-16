import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const GRID_SIZE = 4;

const initialGameState = {
  gridState: [[0, 2, 8, 4], [2, 0, 0, 32], [0, 16, 0, 2], [32, 0, 2, 0]],
  leftPressed: false,
  rightPressed: false,
  downPressed: false,
  upPressed: false
};

// For each row n in the grid, return a new row of each row's nth element
function transpose(grid) {
  return grid.map((_, rowIndex) => grid.map((row, _) => row[rowIndex]));
}

const shiftRowLeft = row => {
  const numbers = row.filter(boxVal => boxVal !== 0);
  const zeroes = row.filter(boxVal => boxVal === 0);
  return numbers.concat(zeroes);
};

const shiftRowRight = row => {
  const numbers = row.filter(boxVal => boxVal !== 0);
  const zeroes = row.filter(boxVal => boxVal === 0);
  return zeroes.concat(numbers);
};

const shiftRowUp = row => {
  const numbers = row.filter(boxVal => boxVal !== 0);
  const zeroes = row.filter(boxVal => boxVal === 0);
  return numbers.concat(zeroes);
};

const shiftRowDown = row => {
  const numbers = row.filter(boxVal => boxVal !== 0);
  const zeroes = row.filter(boxVal => boxVal === 0);
  return zeroes.concat(numbers);
};

const ParentController = () => {
  const [gameState, setGameState] = useState(initialGameState);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleKeyPress = e => {
    switch (e.keyCode) {
      case ARROW_LEFT:
        setGameState({
          gridState: gameState.gridState.map(shiftRowLeft)
        });
        break;
      case ARROW_RIGHT:
        setGameState({
          gridState: gameState.gridState.map(shiftRowRight)
        });
        break;
      case ARROW_UP:
        setGameState({
          gridState: transpose(transpose(gameState.gridState).map(shiftRowLeft))
        });
        break;
      case ARROW_DOWN:
        setGameState({
          gridState: transpose(
            transpose(gameState.gridState).map(shiftRowRight)
          )
        });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Grid gridState={gameState["gridState"]} />
    </div>
  );
};

const Grid = ({ gridState }) => (
  <div className={"grid"}>
    {gridState.map(rowValues => (
      <Row rowValues={rowValues} />
    ))}
  </div>
);

const Row = ({ rowValues }) => (
  <div className={"row"}>
    {rowValues.map(boxValue =>
      boxValue > 0 ? <LilBox value={boxValue} /> : <EmptyBox />
    )}
  </div>
);

const LilBox = ({ value }) => (
  <div className={`lil-box ${boxColor(value)}`}>{value}</div>
);

const EmptyBox = () => <div className={"empty-box"} />;

const boxColor = boxValue => `color-${boxValue}`;

const rootElement = document.getElementById("root");
ReactDOM.render(<ParentController />, rootElement);

// new 2 pops up every time
// 4x4 empty spaces

const generateGrid = size => {
  const values = [0, 2, 4, 8, 16, 32];
  const grid = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(values[Math.floor(Math.random() * values.length)]);
    }
    grid.push(row);
  }
  return grid;
};
