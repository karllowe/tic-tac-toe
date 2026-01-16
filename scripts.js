const createGameBoard = (function createBoard() {
    const size = 3;
    const array = [];
    for (let j=0; j<size; j++) {
        const row = []
        for (let i=0; i<size; i++) {
            row.push(null)
        };
        array.push(row)
    }

    return gameBoardObject = array;
});

const makeMove = (function makeMove(col, row, player) {
    if (gameBoard[row-1][col-1] !== null) {
        throw Error("space already taken!")
    };

    if (player == "user") {
        gameBoard[row-1].splice(col-1,1,"x");
    } else {
        gameBoard[row-1].splice(col-1,1,"y");
    };
    console.clear()
    console.log(gameBoard[0]);
    console.log(gameBoard[1]);
    console.log(gameBoard[2]);
});

const gameBoard = createGameBoard();

makeMove(2,3,"pc");


makeMove(1,3,"user");



