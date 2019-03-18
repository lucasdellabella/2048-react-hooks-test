import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Grid from "./Grid";
import {
  shiftRowLeft,
  shiftRowRight,
  shiftRowUp,
  shiftRowDown,
  transpose
} from "./move-box-helpers";

import "./styles.css";

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const GRID_SIZE = 4;

const multiplesOfTwo = [0, 2, 4, 8, 16, 32];
const genRandomMultOfTwo = () =>
  multiplesOfTwo[Math.floor(Math.random() * multiplesOfTwo.length)];
const randomGameState = size => {
  const grid = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(genRandomMultOfTwo());
    }
    grid.push(row);
  }
  return grid;
};

const initialGameState = {
  gridState: [[8, 2, 8, 4], [2, 4, 0, 32], [0, 16, 0, 2], [32, 4, 2, 0]]
};

const ParentController = () => {
  const [gameState, setGameState] = useState({
    gridState: randomGameState(GRID_SIZE)
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  let handleKeyPress = e => {
    switch (e.keyCode) {
      case ARROW_LEFT:
        setGameState(previousState => ({
          gridState: previousState.gridState.map(shiftRowLeft)
        }));
        break;
      case ARROW_RIGHT:
        setGameState(previousState => ({
          gridState: previousState.gridState.map(shiftRowRight)
        }));
        break;
      case ARROW_UP:
        setGameState(previousState => ({
          gridState: transpose(
            transpose(previousState.gridState).map(shiftRowLeft)
          )
        }));
        break;
      case ARROW_DOWN:
        setGameState(previousState => ({
          gridState: transpose(
            transpose(previousState.gridState).map(shiftRowRight)
          )
        }));
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

const rootElement = document.getElementById("root");
ReactDOM.render(<ParentController />, rootElement);
