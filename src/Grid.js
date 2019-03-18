import React from "react";
import Row from "./Row";

const Grid = ({ gridState }) => (
  <div className={"grid"}>
    {gridState.map(rowValues => (
      <Row rowValues={rowValues} />
    ))}
  </div>
);

export default Grid;
