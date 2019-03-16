// For each row n in the grid, return a new row of each row's nth element
export function transpose(grid) {
  return grid.map((_, rowIndex) => grid.map((row, _) => row[rowIndex]));
}

export const shiftRowLeft = row => {
  const numbers = row.filter(boxVal => boxVal !== 0);
  const zeroes = row.filter(boxVal => boxVal === 0);
  return numbers.concat(zeroes);
};

export const shiftRowRight = row => {
  const numbers = row.filter(boxVal => boxVal !== 0);
  const zeroes = row.filter(boxVal => boxVal === 0);
  return zeroes.concat(numbers);
};

export const shiftGridUp = grid => {
  return transpose(transpose(grid).map(shiftRowLeft));
};

export const shiftGridDown = grid => {
  return transpose(transpose(grid).map(shiftRowRight));
};
