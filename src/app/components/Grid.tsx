'use client';

import { useState } from 'react';
import { Cell } from '@/lib/minesweeper';
import styles from './Grid.module.css';

export const Grid: React.FC<{ gridData: Cell[][] }> = ({ gridData }) => {
  const [board, setBoard] = useState<Cell[][]>(gridData);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const revealCell = (x: number, y: number) => {
    if (gameOver || win || board[y][x].isRevealed) return;
    
    let newBoard = [...board];
    if (board[y][x].hasMine) {
      // Reveal all mines when game is over
      newBoard = newBoard.map(row => row.map(cell => ({
        ...cell,
        isRevealed: cell.hasMine ? true : cell.isRevealed
      })));
      setBoard(newBoard);
      setGameOver(true);
      return;
    }

    const reveal = (nx: number, ny: number) => {
      if (nx < 0 || nx >= newBoard[0].length || ny < 0 || ny >= newBoard.length || newBoard[ny][nx].isRevealed) return;
      newBoard[ny][nx].isRevealed = true;
      if (newBoard[ny][nx].adjacentMines === 0) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            reveal(nx + dx, ny + dy);
          }
        }
      }
    };
    reveal(x, y);
    
    // Check for win condition
    const hasWon = newBoard.every(row => 
      row.every(cell => cell.isRevealed || cell.hasMine)
    );
    
    if (hasWon) {
      setWin(true);
    }
    
    setBoard([...newBoard]);
  };

  return (
    <>
    <div className={styles.container}>
      {(gameOver || win) && (
        <div className={styles.overlay}>
          <h2 className={styles.overlayText}>
            {gameOver ? "Game Over!" : "You Win!"}
          </h2>
        </div>
      )}
      <div>
        {board.map((row, y) => (
          <div key={y} className={styles.row}>
            {row.map((cell, x) => (
              <div
                key={x}
                className={`${styles.cell} ${(y + x) % 2 === 0 ? styles.cellDark : styles.cellLight} ${cell.isRevealed ? styles.revealed : ""}`}
                onClick={() => revealCell(x, y)}
              >
                {cell.isRevealed ? (cell.hasMine ? "💣" : cell.adjacentMines || "") : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
    <button 
        className={styles.button} 
        onClick={() => window.location.reload()}
      >
        <b>Reset</b>
      </button>
    </>
  );
};

export default Grid;
