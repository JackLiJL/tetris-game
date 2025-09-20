# Tetris Game - React Implementaiton

This is a classic Tetris game built with React using Object-Oriented Programming principles. This implementation features the seven standard tetromnio pieces, a 10*20 game grid, and keyboard controls for movement.

## Features
•  Seven standard tetromino pieces
•  Automatic piece movement (falls every second)
•  Keyboard controls for left, right, and down movement
•  Line clearing functionality
•  Game over detection and restart option

## Prerequisites
Before running this project, make sure you have the following installed:
•  Node.js (version 14 or higher)
•  npm

## Installation & Setup
1. Navigate to the project directory in your terminal:
```
cd jie-li-frontend-assigment
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

## Project Structure
Below are some important files in the project
```
src/
  ├── classes/             # OOP classes
  │   ├── game.js          # Game board logic class
  │   └── tetromino.js     # Tetromino class
  ├── components/          # React components
  │   ├── Board.jsx        # Board display component
  │   ├── Cell.jsx         # Individual cell component
  │   ├── Controls.jsx     # Game controls component
  │   ├── Game.css         # Main game component css style
  │   └── Game.jsx         # Main game component
  ├── hooks/               # Custom React hooks
  │   └── useGameLogic.js  # Game logic hook
  ├── utils/               # Utility functions
  │   └── constants.js     # Game constants
  ├── App.js               # Root app component
  └── index.js             # Entry point
```
