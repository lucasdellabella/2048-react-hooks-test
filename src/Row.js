import React from "react";
import { LilBox, EmptyBox } from "./Box";

const Row = ({ rowValues }) => (
  <div className={"row"}>
    {rowValues.map(boxValue =>
      boxValue > 0 ? <LilBox value={boxValue} /> : <EmptyBox />
    )}
  </div>
);

export default Row;
