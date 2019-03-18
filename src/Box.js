import React from "react";

export const LilBox = ({ value }) => (
  <div className={`lil-box ${boxColor(value)}`}>{value}</div>
);

export const EmptyBox = () => <div className={"empty-box"} />;

const boxColor = boxValue => `color-${boxValue}`;
