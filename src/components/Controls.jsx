import React from 'react';

const Controls = ({ isPlaying, gameOver, onStart, onReset }) => {
  return (
    <div className="controls">
      {!isPlaying && !gameOver && (
        <button onClick={onStart}>Start Game</button>
      )}
      
      {gameOver && (
        <div className="game-over">
          <p>Game Over!</p>
          <button onClick={onReset}>New Game</button>
        </div>
      )}
    </div>
  );
};

export default Controls;
