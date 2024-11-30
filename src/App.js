import './App.css';
import { useEffect, useState } from 'react';

function Square({value, region, onSquareClick, idkey}) {
  return (
    <button 
      key={`id${idkey}`}
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

  const allBoards = [
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
    {
      solutionIndexPairs: [
        {r: 0, c: 0},
        {r: 1, c: 3},
        {r: 2, c: 1},
        {r: 3, c: 5},
        {r: 4, c: 2},
        {r: 5, c: 4},
        {r: 6, c: 6},

      ], 
      regions: [
        [1, 1, 3, 3, 4, 4, 7],
        [1, 2, 3, 4, 4, 5, 7],
        [1, 2, 3, 3, 3, 5, 7],
        [3, 3, 3, 3, 3, 5, 7],
        [3, 3, 3, 3, 3, 6, 7],
        [3, 3, 3, 6, 6, 6, 7],
        [7, 7, 7, 7, 7, 7, 7],
      ],
    },
    {
      solutionIndexPairs: [
        {r: 0, c: 1},
        {r: 1, c: 4},
        {r: 2, c: 2},
        {r: 3, c: 0},
        {r: 4, c: 6},
        {r: 5, c: 3},
        {r: 6, c: 5},
      ], 
      regions: [
        [2, 2, 2, 7, 7, 7, 7],
        [2, 1, 2, 2, 7, 7, 7],
        [2, 1, 1, 7, 7, 4, 4],
        [4, 1, 4, 4, 4, 4, 4],
        [4, 1, 4, 6, 6, 4, 6],
        [4, 4, 4, 3, 6, 6, 6],
        [4, 3, 3, 3, 6, 5, 5],
      ],
    },
    {
      solutionIndexPairs: [
        {r: 0, c: 2},
        {r: 1, c: 0},
        {r: 2, c: 5},
        {r: 3, c: 1},
        {r: 4, c: 4},
        {r: 5, c: 6},
        {r: 6, c: 3},
      ], 
      regions: [
        [2, 2, 5, 5, 1, 4, 4],
        [2, 2, 2, 5, 1, 4, 4],
        [2, 7, 7, 5, 1, 4, 4],
        [2, 7, 7, 7, 1, 4, 4],
        [1, 1, 1, 1, 1, 3, 3],
        [1, 1, 1, 6, 3, 3, 3],
        [1, 1, 1, 6, 3, 3, 3],
      ],
    },
    {
      solutionIndexPairs: [
        {r: 0, c: 1},
        {r: 1, c: 6},
        {r: 2, c: 4},
        {r: 3, c: 2},
        {r: 4, c: 0},
        {r: 5, c: 5},
        {r: 6, c: 3},
      ], 
      regions: [
        [2, 6, 6, 1, 1, 1, 1],
        [2, 6, 6, 1, 4, 4, 4],
        [2, 2, 6, 1, 7, 7, 4],
        [2, 2, 3, 1, 7, 7, 4],
        [2, 2, 2, 1, 1, 1, 4],
        [5, 5, 5, 1, 5, 1, 1],
        [5, 5, 5, 5, 5, 1, 1],
      ],
    },
    {
      solutionIndexPairs: [
        {r: 0, c: 0},
        {r: 1, c: 3},
        {r: 2, c: 1},
        {r: 3, c: 4},
        {r: 4, c: 2},
      ], 
      regions: [
        [5, 5, 2, 3, 3],
        [4, 4, 2, 2, 3],
        [1, 4, 2, 3, 3],
        [1, 1, 1, 1, 3],
        [1, 1, 1, 1, 1],
      ],
    },

];
  const [boardChoice, setBoardChoice] = useState(0);
  const [solutionIndexPairs, setSolutionIndexPairs] = useState(allBoards[boardChoice].solutionIndexPairs);
  const [regions, setRegions] = useState(allBoards[boardChoice].regions);  
  const [boardLength, setBoardLength] = useState(allBoards[boardChoice].regions.length);
  const [squares, setSquares] = useState(generateEmptyBoard(boardLength));
  const [autoXisOn, setAutoXisOn] = useState(false);
  const [winner, setWinner] = useState(false);

  useEffect (() => {
    calculateWinner();
    }, 
  );

  function selectBoard() {
    const len = allBoards.length;
    const choice = Math.floor(Math.random() * len);
    setBoardChoice(choice);
    const newLength = allBoards[choice].regions.length;
    setRegions(allBoards[choice].regions);
    setBoardLength(newLength);
    setSolutionIndexPairs(allBoards[choice].solutionIndexPairs);
    setSquares(generateEmptyBoard(newLength));
  }

  function generateEmptyBoard(boardLen) {
    return Array(boardLen).fill(Array(boardLen).fill(Values.EMPTY));
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

  function handleNewGameButton() {
    selectBoard();
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

  function ClearButton() {
    return (
      <button 
        className={'clearboard'} 
        onClick={() => setSquares(generateEmptyBoard(boardLength))}>
          Clear Board
      </button>
    )
  };

  function NewGameButton() {
    return (
      <button 
        className={'newgame'} 
        onClick={() => handleNewGameButton()}>
          New Game
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
                key={`${r}+${c}`}
                value={squares[r][c] === Values.AUTOX ? squares[r][c].toLowerCase() : squares[r][c]}
                region={regions[r][c]} 
                onSquareClick={() => handleClick(r, c)} 
              />
            ))}
          </div>
        ))}
      <ClearButton />
      <AutoXButton />
      <NewGameButton />
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
