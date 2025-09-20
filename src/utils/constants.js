export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const TETROMINOS = {
  O: { shape: [[1, 1], [1, 1]], color: 'yellow' },
  I: { shape: [[1, 1, 1, 1]], color: 'cyan' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: 'red' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 'green' },
  L: { shape: [[1, 0], [1, 0], [1, 1]], color: 'orange' },
  J: { shape: [[0, 1], [0, 1], [1, 1]], color: 'pink' },
  T: { shape: [[1, 1, 1], [0, 1, 0]], color: 'purple' }
};
export const TETROMINO_NAMES = ['O', 'I', 'S', 'Z', 'L', 'J', 'T'];
