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
                checkWinner();
            }
        });
    });
};

function checkWinner() {
    //check for tie
    checkTieArr = [];
    checkTieArr = [gameBoard.gameArray[0], gameBoard.gameArray[1], gameBoard.gameArray[2]]
    checkTieArr = checkTieArr.flat()
    //checkTieArr.every()
    
    //player 1 vertical
    for(let x = 0; x < 3; x++) {
        if(gameBoard.gameArray[0][x] == player1.symbol && 
            gameBoard.gameArray[0 + 1][x] == player1.symbol && 
            gameBoard.gameArray[0 + 2][x] == player1.symbol) {
                
                player1.winCount++
                announceWinner(player1.name, player1.symbol, player1.winCount);

        }
        //player 1 horizontal
        else if(gameBoard.gameArray[x][0] == player1.symbol && 
            gameBoard.gameArray[x][0 + 1] == player1.symbol && 
            gameBoard.gameArray[x][0 + 2] == player1.symbol) {
                player1.winCount++
                announceWinner(player1.name, player1.symbol, player1.winCount);
        }
       //player 2 vertical
        else if(gameBoard.gameArray[0][x] == player2.symbol && 
            gameBoard.gameArray[0 + 1][x] == player2.symbol && 
            gameBoard.gameArray[0 + 2][x] == player2.symbol) {
                player2.winCount++
                announceWinner(player2.name, player2.symbol, player2.winCount);
        }
        //player 2 horizontal
        else if(gameBoard.gameArray[x][0] == player2.symbol && 
            gameBoard.gameArray[x][0 + 1] == player2.symbol && 
            gameBoard.gameArray[x][0 + 2] == player2.symbol) {
                announceWinner(player2.name, player2.symbol, player2.winCoun);
                player2.winCount++;
        }
    }
        //player 1 diagonal
        if(gameBoard.gameArray[0][0] == player1.symbol && 
            gameBoard.gameArray[1][1] == player1.symbol && 
            gameBoard.gameArray[2][2] == player1.symbol) {
                player1.winCount++
                announceWinner(player1.name, player1.symbol, player1.winCount);
        }
        else if(gameBoard.gameArray[0][2] == player1.symbol && 
            gameBoard.gameArray[1][1] == player1.symbol && 
            gameBoard.gameArray[2][0] == player1.symbol) {
                player1.winCount++
                announceWinner(player1.name, player1.symbol, player1.winCount);
        }
        //player 2 diagonal
        else if(gameBoard.gameArray[0][0] == player2.symbol && 
            gameBoard.gameArray[1][1] == player2.symbol && 
            gameBoard.gameArray[2][2] == player2.symbol) {
                player2.winCount++
                announceWinner(player2.name, player2.symbol, player2.winCount);
        }
        else if(gameBoard.gameArray[0][2] == player2.symbol && 
            gameBoard.gameArray[1][1] == player2.symbol && 
            gameBoard.gameArray[2][0] == player2.symbol) {
                player2.winCount++
                announceWinner(player2.name, player2.symbol, player2.winCount);
        }
        
    
}
// [["1", "2", "3"], 
// ["4", "5", "6"],
// ["7", "8", "9"]],

function announceWinner(name, winner, winCount) {
    
    alert(`${name}:"${winner}" is the winner! `)
    for(let x = 0; x < 9; x++) {
        
    }
    
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

function announceTie() {
    alert("its a tie")
}


