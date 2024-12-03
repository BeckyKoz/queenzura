const Values = Object.freeze({
    EMPTY: " ",
    AUTOX: "X",
    QUEEN: "Q",
    MANUALX: "x",
  });

let queens = [];

const generatedBoard = 
    {
      solutionIndexPairs: [
      ],
      regions: [
      ],
    //  madeBy: Makers.AUTO,
    };

function generateRandomIndex(boardLen) {
    let ind = Math.floor(Math.random() * boardLen);
    return ind;
}
// helper function to return solution index pairs
function returnGeneratedSolutionIndexPairs(genQueens) {
    let indexPairsArray = [];
    console.log("test");
    for (let i = 0; i < genQueens.length; i++) {
        let ind = genQueens[i].indexOf(Values.QUEEN);
        console.log(genQueens[i]);
        let indexPair = { r: i, c: ind };
        console.log("ind =", ind);
        console.log("indexPair =", indexPair);
        indexPairsArray.push(indexPair);
    } 
    return indexPairsArray;
}

function placeQueens(boardLen) { // boardlength
    queens = [];
    for (let i = 0; i < boardLen; i++) {
        queens.push([]);
        for (let j = 0; j < boardLen; j++) {
            queens[i].push(0);
        }
    }
    let queenCount = 0;
    for (let i = 0; i < boardLen; i++) {
        if (!queens[i].includes(0)) {
            return false;
        }
        while (queens[i].includes(0)) {
            let ind = generateRandomIndex(boardLen);
            while (queens[i][ind] !== 0){
                ind = generateRandomIndex(boardLen);
            }
            if (queens[i][ind] === 0) { // find empty spot
                queens[i][ind] = Values.QUEEN;
                queenCount += 1;
                addAutoX(i, ind, queens, boardLen);
            }; 
        }
    };
    if (queenCount !== boardLen) {
        return false;        }
    return true;
  }

  // helper function to implement automatic X's when adding a queen
  function addAutoX(r, c, queens, boardLen) { 
    function updateEmptyToAutoX(r, c) {
      if (queens[r][c] === 0) {
        queens[r][c] = Values.AUTOX;
      };
    };

    // helper function to do rows and columns
    function doRowsCols(r, c) {
      for (let i = 0; i < boardLen; i++) {
        // do row
        updateEmptyToAutoX(r, i);
        // do column
        updateEmptyToAutoX(i, c);
      };
    };
    // helper function to do make doing halo more efficient
    function doHalo(row, col) {
      if ((row >= 0) && (row < boardLen) && (col >= 0) && (col < boardLen)) {
        updateEmptyToAutoX(row, col);
      };
    };
    doRowsCols(r, c);
    doHalo(r-1, c-1);
    doHalo(r-1, c+1);
    doHalo(r+1, c-1);
    doHalo(r+1, c+1);
  };

function generateQueenBoard(num) {
    let result = false;
    while (result === false) {
        let answer = placeQueens(num);
        if (answer === true) {
            result = true; 
        }; 
    };
};

generateQueenBoard(6);
for (let row of queens) {
    console.log(row);
}
let arr = returnGeneratedSolutionIndexPairs(queens);
console.log(arr);
generatedBoard.solutionIndexPairs = arr;
console.log(generatedBoard.solutionIndexPairs);