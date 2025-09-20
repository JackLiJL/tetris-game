import { BOARD_WIDTH, BOARD_HEIGHT } from '../utils/constants';

export class Board {
    constructor() {
        this.width = BOARD_WIDTH;
        this.height = BOARD_HEIGHT;
        this.grid = this.createInitialGrid();
        this.gameOver = false;
    }

    // Creat an initial empty grid
    createInitialGrid() {
        const gridMatrix = [];
        for (let i = 0; i < this.height; i++) {
            gridMatrix[i] = [];
            for (let j = 0; j < this.width; j++) {
                gridMatrix[i][j] = null;
            }
        }
        return gridMatrix
    }

    // Check if a position is in the grid
    isValidPosition(tetromino, position = tetromino.position) {
        for (let y = 0; y < tetromino.shape.length; y++) {
            for (let x = 0; x < tetromino.shape[y].length; x++){
                if (tetromino.shape[y][x] !== 0) {
                    const boardX = x + position.x;
                    const boardY = y + position.y;

                    if (
                        boardX < 0 ||
                        boardX  >= this.width ||
                        boardY >= this.height ||
                        (boardY >= 0 && this.grid[boardY][boardX] !== null) // we don't want to check for collisions if a piece is still above the board
                    ) {
                        return false
                    }
                }
            }
        }
        return true;
    }

    // Place a tetromino on the board
    placeTetrominoOnBoard(tetromino) {
        for (let y = 0; y < tetromino.shape.length; y++){
            for (let x = 0; x < tetromino.shape[y].length; x++){
                if (tetromino.shape[y][x] !== 0) {
                    const boardX = tetromino.position.x + x;
                    const boardY = tetromino.position.y + y;

                    if (boardY < 0) {
                        this.gameOver = true;
                        return;
                    }

                    this.grid[boardY][boardX] = tetromino.color;
                }
            }
        }

        this.clearCompletedLines();
    }

    // Clear multiple completed lines
    clearCompletedLines() {
        let completedLinesCleared = 0;

        for (let y = this.height - 1; y >= 0; y--) {
            if (this.grid[y].every(gridCell => gridCell !== null)) {
                // Remove the line
                this.grid.splice(y, 1);
                // Add a new empty line at the top of the grid
                this.grid.unshift(Array(this.width).fill(null));
                completedLinesCleared++;
                y++;
            }
        }

        return completedLinesCleared;
    }

    // Reset the board
    resetBoard() {
        this.grid = this.createInitialGrid();
        this.gameOver = false;
    }
}

