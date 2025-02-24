/** Represents a cell in the minesweeper grid */
export interface Cell {
  hasMine: boolean;
  x: number;
  y: number;
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
