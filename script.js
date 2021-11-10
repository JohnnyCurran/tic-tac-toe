const players = (name, symbol, winCount) => {
    return { name, symbol, winCount };
};

const player1 = players("player 1", "x", 0);
const player2 = players("player 2", "o", 0);

var gameBoard = {
    gameArray : [["1", "2", "3"], 
                ["4", "5", "6"],
                ["7", "8", "9"]],
}

function initGame () {
    let counter = 0;
    playCounter = 0;
    gameBoardDivs = document.querySelectorAll(".gameBoardDivs");
    let displayWhosTurn = document.querySelector(".displayWhosTurn");
    let whosTurn = player1.name;
    displayWhosTurn.textContent = whosTurn + ` "${player1.symbol.toUpperCase()}" turn`;

    gameBoardDivs.forEach((div) => {
        counter++;
        
        div.classList.add(counter);
        //this["div" + counter] = document.getElementsByClassName([div.classList[1]]);
        
        div.addEventListener("click", () => {
            //first check if div has already been played
            if(div.textContent == player1.symbol || 
                div.textContent == player2.symbol) {return}
                
            //if div is unplayed loop through gameBoard.gameArray to find the index...
            //of pointerNum (witch is this div's class number (1-9))...
            //and also splice the play ("x" or "o") into the array.
            if(whosTurn == player1.name) {
                whosTurn = player2.name;
                div.textContent = player1.symbol;
                let pointerNum = div.classList[1];
                for(let y = 0; y < 3; y++) {
                    for(let x = 0; x < 3; x++) {
                        if(pointerNum == gameBoard.gameArray[y][x]) {
                            gameBoard.gameArray[y].splice(x, 1, player1.symbol)
                        }
                    }
                }
                displayWhosTurn.textContent = whosTurn + ` "${player2.symbol.toUpperCase()}" turn`;
                player1.currentDiv = counter;
                playCounter++
                checkWinner();
            }

            else if(whosTurn == player2.name) {
                whosTurn = player1.name;
                div.textContent = player2.symbol;
                let pointerNum = div.classList[1];
                for(let y = 0; y < 3; y++) {
                    for(let x = 0; x < 3; x++) {
                        if(pointerNum == gameBoard.gameArray[y][x]) {
                            gameBoard.gameArray[y].splice(x, 1, player2.symbol)
                        }
                    }
                }
                displayWhosTurn.textContent = whosTurn + ` "${player1.symbol.toUpperCase()}" turn`;
                player2.currentDiv = counter;
                playCounter++
                checkWinner();
            }
        });
    });
};

function checkWinner() {
    isWinner = false;

    //vertical
    for(let yy = 1; yy < 3; yy++) {
        for(let x = 0; x < 3; x++) {
            if(gameBoard.gameArray[0][x] == eval("player" + yy).symbol && 
                gameBoard.gameArray[0 + 1][x] == eval("player" + yy).symbol && 
                gameBoard.gameArray[0 + 2][x] == eval("player" + yy).symbol) {
                    playCounter = 0;
                    player1.winCount++
                    isWinner = true;
                    announceWinner(eval("player" + yy).name, eval("player" + yy).symbol, eval("player" + yy).winCount);

            }
            //horizontal
            else if(gameBoard.gameArray[x][0] == eval("player" + yy).symbol && 
                gameBoard.gameArray[x][0 + 1] == eval("player" + yy).symbol && 
                gameBoard.gameArray[x][0 + 2] == eval("player" + yy).symbol) {
                    playCounter = 0;
                    player1.winCount++
                    isWinner = true;
                    announceWinner(eval("player" + yy).name, eval("player" + yy).symbol, eval("player" + yy).winCount);
            }
        
        }
    }

    //diagonal
    for(let yy = 1; yy < 3; yy++) {
        if(gameBoard.gameArray[0][0] == eval("player" + yy).symbol && 
            gameBoard.gameArray[1][1] == eval("player" + yy).symbol && 
            gameBoard.gameArray[2][2] == eval("player" + yy).symbol) {
                isWinner = true;
                player1.winCount++;
                playCounter = 0;
                announceWinner(eval("player" + yy).name, eval("player" + yy).symbol, eval("player" + yy).winCount);
        }
        else if(gameBoard.gameArray[0][2] == eval("player" + yy).symbol && 
            gameBoard.gameArray[1][1] == eval("player" + yy).symbol && 
            gameBoard.gameArray[2][0] == eval("player" + yy).symbol) {
                isWinner = true;
                player1.winCount++
                playCounter = 0;
                announceWinner(eval("player" + yy).name, eval("player" + yy).symbol, eval("player" + yy).winCount);
        }
    }
        
    //Check for a tie
    if(playCounter >= 9 && isWinner == false) {
        alert("It's a tie!");
        gameBoard = {
            gameArray : [["1", "2", "3"], 
                        ["4", "5", "6"],
                        ["7", "8", "9"]],
        }
        for(let x = 0; x < 9; x++) {
            gameBoardDivs[x].textContent = ""
        };
        playCounter = 0
    }
}

function announceWinner(name, winner, winCount) {
    
    alert(`${name}:"${winner}" is the winner! `)
    
    gameBoard = {
        gameArray : [["1", "2", "3"], 
                    ["4", "5", "6"],
                    ["7", "8", "9"]],
    }

    for(let x = 0; x < 9; x++) {
        gameBoardDivs[x].textContent = ""
    };

   if(winCount >= 5) {
       player1.winCount = 0;
       player2.winCount = 0;
       alert("You Are the grand champion!"); 
   }
}

