/** Represents a cell in the minesweeper grid */
export interface Cell {
  hasMine: boolean;
  x: number;
  y: number;
  isRevealed: boolean;
  adjacentMines: number;
}

/** Configuration options for generating a minesweeper grid */
export interface GridConfig {
  rows: number;
  columns: number;
  mines: number;
}

/**
 * Generates a boolean matrix representing mine positions
 * @param columns Number of columns in the grid
 * @param rows Number of rows in the grid
 * @param mines Number of mines to place
 * @returns Boolean matrix where true represents a mine
 * @throws {Error} If mine count exceeds grid size or invalid dimensions
 */
export function generateGrid(columns: number, rows: number, mines: number): boolean[][] {
  // Add input validation
  if (rows <= 0 || columns <= 0) {
    throw new Error('Grid dimensions must be positive numbers');
  }
  if (mines < 0) {
    throw new Error('Mine count must be non-negative');
  }
  if (mines > columns * rows) {
    throw new Error('Mine count cannot exceed total number of squares');
  }

  // Initialize empty grid with all false values
  const grid: boolean[][] = Array(rows)
    .fill(null)
    .map(() => Array(columns).fill(false));

  // Place mines randomly
  let remainingMines = mines;
  while (remainingMines > 0) {
    const randomX = Math.floor(Math.random() * columns);
    const randomY = Math.floor(Math.random() * rows);

    // If square doesn't already have a mine, place one
    if (!grid[randomY][randomX]) {
      grid[randomY][randomX] = true;
      remainingMines--;
    }
  }

  return grid;
}

/**
 * Counts adjacent mines for a given cell
 * @param grid Boolean matrix representing mine positions
 * @param x Number on the x axis of the grid
 * @param y Number on the y axis of the grid
 * @returns Number of adjacent mines for a given cell
 */
const countAdjacentMines = (grid: boolean[][], x: number, y: number): number => {
  let count = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      let nx = x + dx;
      let ny = y + dy;
      if (nx >= 0 && nx < grid[0].length && ny >= 0 && ny < grid.length && grid[ny][nx]) {
        count++;
      }
    }
  }
  return count;
};

/** Initializes the grid with Cell objects */
export function initializeGrid(): Cell[][] {
  const grid = generateGrid(10, 10, 10)
  return grid.map((row, y) => row.map((hasMine, x) => ({
    hasMine,
    x,
    y,
    isRevealed: false,
    adjacentMines: hasMine ? 0 : countAdjacentMines(grid, x, y)
  })));
};
