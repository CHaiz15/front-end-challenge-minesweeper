
# This is a fork of the Oxen Frontend developer challenge
### Proof of functionality 
<img width="1822" alt="minesweeper-default" src="https://github.com/user-attachments/assets/2b3a965d-022d-46ed-8400-b1f7feefdc79" />

https://github.com/user-attachments/assets/f2c8572f-4a44-4c32-9c12-9b073c1e879c

https://github.com/user-attachments/assets/4b71e5c1-0d1c-4c0b-a20c-2e4cd198e1c2

## Original README
To test your skills, we'd like you to build a simple minesweeper game.

## Instructions

Provided is a boilerplate next.js project, created with `npx create-next-app@latest`.

The project contains a single function, `generateGrid`, that will generate a minesweeper grid of a given size, with a given number of mines.

Your task is to build a simple minesweeper game using this function.

The `generateGrid` function is already implemented in `src/lib/minesweeper.ts`.

## Challenge

implement the logic for the game making sure to follow the rules of minesweeper, and fulfill the requirements below:

- Each cell should initially be covered
- When a cell is clicked, it should be revealed
- If the clicked cell has a mine, it should be shown and the game should be over
- If the clicked cell has adjacent mines, the number of adjacent mines should be shown in that cell
- The game should be won if all cells without mines are revealed
- The game should be lost if a cell with a mine is revealed
- The game should be resettable
- The game should be styled

### Bonus

- upon clicking a cell, any adjacent cells with no adjacent mines should be revealed
- generate the initial grid data server side, and pass it to the client component as prop to avoid hydration issues

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
