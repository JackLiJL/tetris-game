import Cell from './Cell';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../utils/constants';

const Board = ({ board, currentPiece }) => {
    // Create a copy of the board to render with the current piece
    const renderBoard = () => {
        const displayBoard = board.grid.map(row => [...row]);

        if (currentPiece) {
            for (let y = 0; y < currentPiece.shape.length; y++) {
                for (let x = 0; x < currentPiece.shape[y].length; x++) {
                    if (currentPiece.shape[y][x] !== 0) {
                        const boardX = currentPiece.position.x + x;
                        const boardY = currentPiece.position.y + y;

                        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
                            displayBoard[boardY][boardX] = currentPiece.color;
                        }
                    }
                }
            }
        }

        return displayBoard
    };

    return (
        <div className="board">
            {renderBoard().map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, cellIndex) => (
                        <Cell key={cellIndex} color={cell} />
                    ))}
                </div>
            ))}
        </div>
    );
    
}

export default Board;
