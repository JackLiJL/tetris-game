import { useGameLogic } from '../hooks/useGameLogic';
import Board from './Board';
import Controls from './Controls';
import './Game.css';

const Game = () => {
  const { board, currentPiece, isPlaying, gameOver, startGame, resetGame } = useGameLogic();

  return (
    <div className="game">
      <h1>Tetris</h1>
      
      <Controls 
        isPlaying={isPlaying}
        gameOver={gameOver}
        onStart={startGame}
        onReset={resetGame}
      />
      
      <Board board={board} currentPiece={currentPiece} />
      
      <div className="instructions">
        <p>Use arrow keys to move pieces</p>
        <p>← → : Move left/right</p>
        <p>↓ : Move down</p>
      </div>
    </div>
  );
};

export default Game;
