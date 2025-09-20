import { useState, useCallback, useEffect, useRef } from 'react';
import { Board } from '../classes/game';
import { Tetromino } from '../classes/tetromino';   

export const useGameLogic = () => {
  const [board, setBoard] = useState(new Board());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const gameInterval = useRef(null);
  
  // Store the latest state values
  const boardRef = useRef(board);
  const currentPieceRef = useRef(currentPiece);
  const isPlayingRef = useRef(isPlaying);
  const gameOverRef = useRef(gameOver);

  // Update refs when state changes
  useEffect(() => {
    boardRef.current = board;
    currentPieceRef.current = currentPiece;
    isPlayingRef.current = isPlaying;
    gameOverRef.current = gameOver;
  }, [board, currentPiece, isPlaying, gameOver]);

  // Start a new game
  const startGame = useCallback(() => {
    const newBoard = new Board();
    const newPiece = Tetromino.createRandomTetromino();
    
    setBoard(newBoard);
    setCurrentPiece(newPiece);
    setIsPlaying(true);
    setGameOver(false);
    
    // Update refs immediately
    boardRef.current = newBoard;
    currentPieceRef.current = newPiece;
    isPlayingRef.current = true;
    gameOverRef.current = false;
    
    // Start the game loop
    if (gameInterval.current) {
      clearInterval(gameInterval.current);
    }
    
    gameInterval.current = setInterval(() => {
      // Use the ref values to avoid stale closure issue
      if (!currentPieceRef.current || !isPlayingRef.current || gameOverRef.current) return;
      
      const movedPiece = currentPieceRef.current.cloneTetromino();
      movedPiece.moveTetromino(0, 1);
      
      if (boardRef.current.isValidPosition(movedPiece)) {
        setCurrentPiece(movedPiece);
        currentPieceRef.current = movedPiece;
      } else {
        // If moving down and can't move, place the piece
        const newBoard = new Board();
        
        // Copy the current board state
        newBoard.grid = boardRef.current.grid.map(row => [...row]);
        
        // Place the current piece
        newBoard.placeTetrominoOnBoard(currentPieceRef.current);
        
        // Check if game is over
        if (newBoard.gameOver) {
          setGameOver(true);
          setIsPlaying(false);
          gameOverRef.current = true;
          isPlayingRef.current = false;
          
          if (gameInterval.current) {
            clearInterval(gameInterval.current);
            gameInterval.current = null;
          }
        } else {
          setBoard(newBoard);
          boardRef.current = newBoard;
          
          // Create a new piece and check if the new piece can be placed
          const newPiece = Tetromino.createRandomTetromino();
          if (!newBoard.isValidPosition(newPiece)) {
            setGameOver(true);
            setIsPlaying(false);
            gameOverRef.current = true;
            isPlayingRef.current = false;
            
            if (gameInterval.current) {
              clearInterval(gameInterval.current);
              gameInterval.current = null;
            }
          } else {
            setCurrentPiece(newPiece);
            currentPieceRef.current = newPiece;
          }
        }
      }
    }, 1000);
  }, []);

  // Reset the game
  const resetGame = useCallback(() => {
    if (gameInterval.current) {
      clearInterval(gameInterval.current);
      gameInterval.current = null;
    }
    startGame();
  }, [startGame]);

  // Move the current piece
  const movePiece = useCallback((dx, dy) => {
    if (!currentPiece || !isPlaying || gameOver) return;
    
    const movedPiece = currentPiece.cloneTetromino();
    movedPiece.moveTetromino(dx, dy);
    
    if (board.isValidPosition(movedPiece)) {
      setCurrentPiece(movedPiece);
      currentPieceRef.current = movedPiece;
    } else if (dy > 0) {
      // If moving down and can't move, place the piece
      const newBoard = new Board();
      
      // Copy the current board state
      newBoard.grid = board.grid.map(row => [...row]);
      
      // Place the current piece
      newBoard.placeTetrominoOnBoard(currentPiece);
      
      // Check if game is over
      if (newBoard.gameOver) {
        setGameOver(true);
        setIsPlaying(false);
        gameOverRef.current = true;
        isPlayingRef.current = false;
        
        if (gameInterval.current) {
          clearInterval(gameInterval.current);
          gameInterval.current = null;
        }
      } else {
        setBoard(newBoard);
        boardRef.current = newBoard;
        
        // Create a new piece and check if the new piece can be placed
        const newPiece = Tetromino.createRandomTetromino();
        if (!newBoard.isValidPosition(newPiece)) {
          setGameOver(true);
          setIsPlaying(false);
          gameOverRef.current = true;
          isPlayingRef.current = false;
          
          if (gameInterval.current) {
            clearInterval(gameInterval.current);
            gameInterval.current = null;
          }
        } else {
          setCurrentPiece(newPiece);
          currentPieceRef.current = newPiece;
        }
      }
    }
  }, [board, currentPiece, isPlaying, gameOver]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPlaying || gameOver) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          movePiece(0, 1);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, movePiece, gameOver]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (gameInterval.current) {
        clearInterval(gameInterval.current);
      }
    };
  }, []);

  return {
    board,
    currentPiece,
    isPlaying,
    gameOver,
    startGame,
    resetGame,
    movePiece
  };
};
