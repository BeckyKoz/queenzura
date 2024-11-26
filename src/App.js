import './App.css';
import { useEffect, useState } from 'react';

function Square({value, region, onSquareClick}) {
  return (
    <button 
      className={`square region${region}`} 
      onClick={onSquareClick}>
        {value} 
    </button>
  );
}

function Board() {

  const Values = Object.freeze({
    EMPTY: " ",
    AUTOX: "X",
    QUEEN: "Q",
    MANUALX: "x",
  });

  const allGames = [
    {
      solutionIndexPairs: [
        {r: 0, c: 0},
        {r: 1, c: 3},
        {r: 2, c: 1},
        {r: 3, c: 5},
        {r: 4, c: 2},
        {r: 5, c: 4},
      ], 
      regions: [
        [1, 1, 3, 3, 4, 4],
        [1, 2, 3, 4, 4, 5],
        [1, 2, 3, 3, 3, 5],
        [3, 3, 3, 3, 3, 5],
        [3, 3, 3, 3, 3, 6],
        [3, 3, 3, 6, 6, 6],
      ],
    },
];
  const solutionIndexPairs = allGames[0].solutionIndexPairs;
  const regions = allGames[0].regions;  
  const boardLength = regions.length;
  const [squares, setSquares] = useState(generateEmptyBoard());
  const [autoXisOn, setAutoXisOn] = useState(false);
  const [winner, setWinner] = useState(false);

  useEffect (() => {
    calculateWinner();
    }, 
  );

  function generateEmptyBoard() {
    return Array(boardLength).fill(Array(boardLength).fill(Values.EMPTY));
  }

  // helper function to implement automatic X's when adding a queen
  function addAutoX(r, c, nextSquares) { 
    function updateEmptyToAutoX(r, c) {
      if (nextSquares[r][c] === Values.EMPTY) {
        nextSquares[r][c] = Values.AUTOX;
      };
    };

    // helper function to do rows and columns
    function doRowsCols(r, c) {
      // r, c is row and col of queen being added. Use to calculate all X's to add automatically
      for (let i = 0; i < boardLength; i++) {
        // do row
        updateEmptyToAutoX(r, i);
        // do column
        updateEmptyToAutoX(i, c);
      };
    };
    // helper function to do make doing halo more efficient
    function doHalo(row, col) {
      if ((row >= 0) && (row < boardLength) && (col >= 0) && (col < boardLength)) {
        updateEmptyToAutoX(row, col);
      };
    };
    // helper function to do region
    function doRegion(r, c) {
      const reg = regions[r][c];
      for (let i = 0; i < boardLength; i++) {
        for (let j = 0; j < boardLength; j++) {
          if (regions[i][j] === reg) {
            updateEmptyToAutoX(i, j);
          };
        }
      }
    };
    doRowsCols(r, c);
    doHalo(r-1, c-1);
    doHalo(r-1, c+1);
    doHalo(r+1, c-1);
    doHalo(r+1, c+1);
    doRegion(r, c);
  };

  // helper function to remove auto x's
  function removeAutoX(nextSquares) {
    for (let i = 0; i < boardLength; i++) {
      for (let j = 0; j < boardLength; j++) {
        if (nextSquares[i][j] === Values.AUTOX) {
          nextSquares[i][j] = Values.EMPTY;
        }
      };
    };
  };

  // helper function to update auto x's 
  function updateAutoX(nextSquares) {
    removeAutoX(nextSquares);
    for (let i = 0; i < boardLength; i++) {
      for (let j = 0; j < boardLength; j++) {
        if (nextSquares[i][j] === Values.QUEEN) {
          addAutoX(i, j, nextSquares);
        }
      };
    };
  };

  function copySquaresState(squares) {
    const nextSquares = [];
    for (let row of squares) {
      nextSquares.push(row.slice());
    };
    return nextSquares;
  };

  function handleAutoXButton() {
    const nextSquares = copySquaresState(squares);

    const newAutoX = !autoXisOn; // this is the copy of state
    setAutoXisOn(newAutoX);

    if (newAutoX === false) {
      removeAutoX(nextSquares);
    } else {
      updateAutoX(nextSquares);
    };
    setSquares(nextSquares);
    return;
  };

  function handleClick(r, c) {
    const nextSquares = copySquaresState(squares);

    // get current state of square and generate new
    switch(nextSquares[r][c]) {
      case Values.EMPTY: 
        nextSquares[r][c] = Values.MANUALX;
        break;
      case Values.AUTOX: 
      case Values.MANUALX:
        nextSquares[r][c] = Values.QUEEN;
        if (autoXisOn === true) {
          addAutoX(r, c, nextSquares);
        };
        break;
      case Values.QUEEN:
        nextSquares[r][c] = Values.EMPTY;
        if (autoXisOn === true) {
          updateAutoX(nextSquares);
        };
        break;
      default:
        break;
    };
    setSquares(nextSquares); 
  }

  function calculateWinner() {
    // first confirm correct number of Queens
    let queenCounter = 0;
    for (let element of squares) {
      for (let e of element) {
        if (e === Values.QUEEN) {
          queenCounter += 1;
        }
      }
    }
    if (queenCounter !== boardLength) {
      setWinner(false);
      return false;
    }
    // if correct number of queens, compare their locations with the solution
    for (let solution of solutionIndexPairs) {
      if (squares[solution.r][solution.c] !== Values.QUEEN) {
        setWinner(false);
        return false;;
      }
    }
    setWinner(true);
    return true;
  };

  function ResetButton() {
    return (
      <button 
        className={'reset'} 
        onClick={() => setSquares(generateEmptyBoard())}>
          Reset
      </button>
    )
  };

  function AutoXButton() {
    return (
      <button 
        className={'autoXButton'} 
        onClick={() => handleAutoXButton()}>
          {!autoXisOn ? "Turn on Auto-X" : "Turn off Auto-X"}
      </button>
    );
  };

  return (
    <>
      <div className="status">&nbsp;{winner ? "You win!" : ""}</div>
        {squares.map((row, r) => (
          <div className="board-row">
            {row.map((col, c) => (
              <Square 
                value={squares[r][c] === Values.AUTOX ? squares[r][c].toLowerCase() : squares[r][c]}
                region={regions[r][c]} 
                onSquareClick={() => handleClick(r, c)} 
              />
            ))}
          </div>
        ))}
      <ResetButton />
      <AutoXButton />
    </>
  ) 
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Queenzura!</h1>
        <h2>{}</h2>
        <Board />
      </header>
    </div>
  );
}

export default App;
