import { TETROMINOS, TETROMINO_NAMES } from '../utils/constants'

export class Tetromino {
    constructor(type) {
        this.type = type;
        this.shape = TETROMINOS[type].shape;
        this.color = TETROMINOS[type].color;
        this.position = { x: 0, y: 0 }
    }

    static createRandomTetromino() {
        const randomType = TETROMINO_NAMES[Math.floor(Math.random() * TETROMINO_NAMES.length)];
        return new Tetromino(randomType);
    }

    moveTetromino(dx, dy) {
        this.position.x += dx;
        this.position.y += dy;
    }

    // Need to create a copy of Tetromino before attempting to move it
    cloneTetromino() {
        const clonedTetromino = new Tetromino(this.type);
        clonedTetromino.position = {...this.position};
        return clonedTetromino;
    }
}
