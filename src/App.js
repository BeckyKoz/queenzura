import './App.css';
import { useState } from 'react';

function Square({value, region, row, col, hasManualX, onSquareClick}) {
  return (
    <button 
      data-isManual={hasManualX} 
      className={`square region${region} row${row} col${col}`} 
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

  function ResetButton() {
    return (
      <button 
        className={'reset'} 
        onClick={() => setSquaresXY(Array(boardLength).fill(Array(boardLength).fill(Values.EMPTY)))}>
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

  const boardLength = 6;
  const [squaresXY, setSquaresXY] = useState(Array(boardLength).fill(Array(boardLength).fill(Values.EMPTY)));
  const [autoXisOn, setAutoXisOn] = useState(false);
  const regions = [
    [1, 1, 3, 3, 4, 4],
    [1, 2, 3, 4, 4, 5],
    [1, 2, 3, 3, 3, 5],
    [3, 3, 3, 3, 3, 5],
    [3, 3, 3, 3, 3, 6],
    [3, 3, 3, 6, 6, 6],
  ];
  const solutionIndexPairs = [
    {r: 0, c: 0},
    {r: 1, c: 3},
    {r: 2, c: 1},
    {r: 3, c: 5},
    {r: 4, c: 2},
    {r: 5, c: 4},
  ];

  const winner = calculateWinner(squaresXY);
  let status = "";
  if (winner) {
    status = "You win!";
  };

  // helper function to implement automatic X's when adding a queen
  function addAutoX(r, c, nextSquares) { 
    // helper function to do rows and columns
    function doRowsCols(r, c) {
      // r, c is row and col of queen being added. Use to calculate all X's to add automatically
      for (let i = 0; i < boardLength; i++) {
        // do row
        if (nextSquares[r][i] === Values.EMPTY) {
            nextSquares[r][i] = Values.AUTOX;
        };
        // do column
        if (nextSquares[i][c] === Values.EMPTY) {
            nextSquares[i][c] = Values.AUTOX;
        };
      };
    };
    // helper function to do make doing halo more efficient
    function doHalo(row, col) {
      if ((row >= 0) && (row < boardLength) && (col >= 0) && (col < boardLength)) {
        if (nextSquares[row][col] === Values.EMPTY) { 
        nextSquares[row][col] = Values.AUTOX;
        };
      };
    };
    // helper function to do region
    function doRegion(r, c, nextSquares) {
      // do region
      const reg = regions[r][c];
      for (let i = 0; i < boardLength; i++) {
        for (let j = 0; j < boardLength; j++) {
          if (regions[i][j] === reg) {
            if (nextSquares[i][j] === Values.EMPTY) {
              nextSquares[i][j] = Values.AUTOX;
            }
          }
        }
      }
    };
    doRowsCols(r, c);
    doHalo(r-1, c-1, );
    doHalo(r-1, c+1);
    doHalo(r+1, c-1);
    doHalo(r+1, c+1);
    doRegion(r, c, nextSquares);
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

  function handleAutoXButton() {
    const newAutoX = !autoXisOn; // this is the copy of state
    setAutoXisOn(newAutoX);

    const nextSquares = [];
    for (let row of squaresXY) {
      nextSquares.push(row.slice());
    };

    if (newAutoX === false) {
      removeAutoX(nextSquares);
    } else {
      updateAutoX(nextSquares);
    };
    setSquaresXY(nextSquares);
    return;
  };

  function handleClickXY(r, c) {
    if (calculateWinner(squaresXY)) {
      return;
    }  

    const nextSquares = [];
    for (let row of squaresXY) {
      nextSquares.push(row.slice());
    };

    // use switch statement to get current state of square and generate new
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
        alert("Oops! default in switch case");
        break;
    };
    setSquaresXY(nextSquares); // next state of squares array
  }

  function calculateWinner(squaresXY) {
    // first confirm correct number of Queens
    let queenCounter = 0;
    for (let element of squaresXY) {
      for (let e of element) {
        if (e == "Q") {
          queenCounter += 1;
        }
      }
    }
    if (queenCounter != boardLength) {
      return;
    }
    // if correct number of queens, compare their locations with the solution
    for (let solution of solutionIndexPairs) {
      if (squaresXY[solution.r][solution.c] !== "Q") {
        return false;
      }
    }
    return true;
  }

  return (
    <>
      <div className="status">{status}</div>
        {squaresXY.map((row, r) => (
          <div className="board-row">
            {row.map((col, c) => (
              <Square 
                value={squaresXY[r][c] === Values.AUTOX ? squaresXY[r][c].toLowerCase() : squaresXY[r][c]}
                row={r} 
                col={c} 
                region={regions[r][c]} 
                hasManualX={squaresXY[r][c]===Values.MANUALX} //bool
                onSquareClick={() => handleClickXY(r, c)} 
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
