const Values = Object.freeze({
    EMPTY: " ",
    AUTOX: "X",
    QUEEN: "Q",
    MANUALX: "x",
  });

const generatedBoard = 
    {
      solutionIndexPairs: [
      ],
      regions: [
      ],
    //  madeBy: Makers.AUTO,
    };
    
let queens = [];
let regionArray = [];

function generateRandomIndex(boardLen) {
    let ind = Math.floor(Math.random() * boardLen);
    return ind;
}

// helper function to return solution index pairs
function returnGeneratedSolutionIndexPairs(genQueens) {
    let indexPairsArray = [];
    for (let i = 0; i < genQueens.length; i++) {
        let indexPair = {};
        let ind = genQueens[i].indexOf(Values.QUEEN);
        indexPair.r = i;
        indexPair.c = ind;
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

function generateEmptyRegionArray(boardLen) {
    for (let i = 0; i < boardLen; i++) {
        regionArray.push([]);
        for (let j = 0; j < boardLen; j++) {
            regionArray[i].push(0);
        }
    }
}

function addQueensToRegionsArray() {
    for (let obj of generatedBoard.solutionIndexPairs) {
        let row = obj.r;
        let col = obj.c;
        regionArray[row][col] = Values.QUEEN;
    }
    return regionArray;
    }

function createWorkingQueens(boardLen) {

    // create an given size array with zeroes and populate with queens
    generateQueenBoard(boardLen);

    // create an object that contains ordered index pairs of all queen locations
    let arr = returnGeneratedSolutionIndexPairs(queens);
    generatedBoard.solutionIndexPairs = arr;
    
    // create empty regions array of correct board length
    generateEmptyRegionArray(boardLen);
    generatedBoard.regions = regionArray;

    // add queens to regions array
    regionArray = addQueensToRegionsArray();
    generatedBoard.regions = regionArray;
}

createWorkingQueens(6);
console.log(generatedBoard);