const createGameBoard = (function createBoard() {
    const size = 3;
    const array = [];
    for (let j=0; j<size; j++) {
        const row = []
        for (let i=0; i<size; i++) {
            row.push(null)
        };
        array.push(row)
    };

    document.querySelector("#newGame").disabled = true;

    return gameBoardObject = array;
});

const gameOver = (function isGameOver () {
    const isEqual = (function allEqual(array) {
        return array.every(item => item === array[0] && typeof item === "string" ); 
    });

    const filteredRows = gameBoard.filter((item) => isEqual(item));
    // check rows
    if (filteredRows.length >=1) {
        return true;
    };
    
    // check columns
    for (let i=0; i<gameBoard.length;i++) {
        const column = gameBoard.map((value) => value[i]);
        if (isEqual(column)) {
            return true;
        }
    };

    // check diagonals
    if (
        ((gameBoard[0][0] === gameBoard[1][1] && gameBoard[0][0] === gameBoard[2][2]) ||
        (gameBoard[0][2] === gameBoard[1][1] && gameBoard[0][2] === gameBoard[2][0])) &&
        !gameBoard[0].includes(null) && !gameBoard[1].includes(null) && !gameBoard[2].includes(null)
    ) {
        return true;
    };

    // check if a tie
    if (
        !gameBoard[0].includes(null) &&
        !gameBoard[1].includes(null) &&
        !gameBoard[2].includes(null)
    ) {
        return true
    };

    return false;
});

const updateBoard = (function updateScreen(row, col, player) {
    const selectedCell = document.getElementsByClassName(`row${row} col${col}`)[0];
    const pElement = selectedCell.querySelector("p");
    if (player == "user") {
        pElement.textContent = "x";
        pElement.classList.add("x")
    } else {
        pElement.textContent = "O";
        pElement.classList.add("o")
    };
});

const makeMove = (function makeMove(col, row, player) {
    if (gameBoard[row-1][col-1] !== null) {
        throw Error("space already taken!")
    };

    if (player == "user") {
        gameBoard[row-1].splice(col-1,1,"x");
    } else {
        gameBoard[row-1].splice(col-1,1,"o");
    };

    updateBoard(row,col,player);
    changePlayer()
});



const buttons = document.querySelectorAll(".cell");
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const locationArray = e.target.parentNode.className.split(" ");
        const row = locationArray[0].substring(3,4);
        const col = locationArray[1].substring(3,4);

        makeMove(col, row, player);

        btn.classList.add("hidden");
        document.querySelector("#newGame").disabled = false;
        

        if(gameOver() === true){
            document.querySelector("#newGame").textContent="New game";
            alert("Game over!");
            
        };
    });

    btn.addEventListener("mouseover", (e) => {
        if (player == "user") {
            btn.textContent="X"
        } else {
            btn.textContent="O"
        }       
    })

    btn.addEventListener("mouseleave", (e) => {
        btn.textContent = ""
    })
});

const newGameButton = document.querySelector("#newGame");
newGameButton.addEventListener("click", (e) => {
    let gameBoard = [];
    gameBoard = triggerNewGame();
});

let player;
let gameBoard = [];
gameBoard = createGameBoard();

const resetGameBoard = (function resetGameBoard() {
    const newGameBtn = document.querySelector("#newGame");
    newGameBtn.disabled = true;
    newGameBtn.textContent="Reset Game";

    const getDivs = document.querySelectorAll("#gameGrid>div");
    getDivs.forEach((item) => {
        item.classList.remove("x");
        item.classList.remove("o");

        const childP = item.querySelector("p");
        childP.textContent = "";
        childP.classList.remove("x");
        childP.classList.remove("o");

        const childBtn = item.querySelector("button");
        childBtn.classList.remove("hidden")
    });
});

const triggerNewGame = (function startnewGame() {
    resetGameBoard();
    gameBoard = createGameBoard();
});

const changePlayer = (function changePlayer () {
    if (player == "user") {
        player = "pc"
    } else {
        player = "user"
    }
});


