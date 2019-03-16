import {
  shiftRowLeft,
  shiftRowRight,
  shiftGridUp,
  shiftGridDown,
  transpose
} from "../src/move-box-helpers";

describe("Grid movement functions:", () => {
  // eslint-disable-next-line no-use-before-define
  const grid = [[0, 2, 4, 8], [0, 8, 4, 8], [0, 0, 4, 8], [32, 0, 32, 0]];

  it("transpose swaps matrix rows", () => {
    expect(transpose(grid)).toEqual([
      [0, 0, 0, 32],
      [2, 8, 0, 0],
      [4, 4, 4, 32],
      [8, 8, 8, 0]
    ]);
  });

  it("shifts matrix rows left", () => {
    expect(grid.map(shiftRowLeft)).toEqual([
      [2, 4, 8, 0],
      [8, 4, 8, 0],
      [4, 8, 0, 0],
      [32, 32, 0, 0]
    ]);
  });

  it("shifts matrix rows right", () => {
    expect(grid.map(shiftRowRight)).toEqual([
      [0, 2, 4, 8],
      [0, 8, 4, 8],
      [0, 0, 4, 8],
      [0, 0, 32, 32]
    ]);
  });

  it("shifts matrix rows up", () => {
    expect(shiftGridUp(grid)).toEqual([
      [32, 2, 4, 8],
      [0, 8, 4, 8],
      [0, 0, 4, 8],
      [0, 0, 32, 0]
    ]);
  });

  it("shifts matrix rows down", () => {
    expect(shiftGridDown(grid)).toEqual([
      [0, 0, 4, 0],
      [0, 0, 4, 8],
      [0, 2, 4, 8],
      [32, 8, 32, 8]
    ]);
  });
});
