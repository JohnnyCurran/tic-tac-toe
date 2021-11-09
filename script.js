const players = (name, symbol) => {
    return { name, symbol };
};

let gameBoard = {
    gameArray : [["1", "2", "3"], 
                ["4", "5", "6"],
                ["7", "8", "9"]],
}

const player1 = players("player 1", "x");
const player2 = players("player 2", "o");


function initGame () {
    let counter = 0;
    let gameBoardDivs = document.querySelectorAll(".gameBoardDivs");
    let displayWhosTurn = document.querySelector(".displayWhosTurn");
    let whosTurn = player1.name;
    displayWhosTurn.textContent = whosTurn

    gameBoardDivs.forEach((div) => {
        counter++;
        div.classList.add(counter);
        //this["div" + counter] = document.getElementsByClassName([div.classList[1]]);
        
        div.addEventListener("click", () => {
            //first check if div has already been played
            if(div.textContent == "x" || div.textContent == "o") {return}
            
            //if div is unplayed loop through gameBoard.gameArray to find the index...
            //of pointerNum (witch is this div class number (1-9) that was clicked)...
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
                checkWinner();
            }
        });
    });
};

function checkWinner() {
    for(let x = 0; x < 3; x++) {
        //player 1 vertical
        if(gameBoard.gameArray[0][x] == player1.symbol && 
            gameBoard.gameArray[0 + 1][x] == player1.symbol && 
            gameBoard.gameArray[0 + 2][x] == player1.symbol) {
                announceWinner(player1.name, player1.symbol);
        }
        //player 1 horizontal
        else if(gameBoard.gameArray[x][0] == player1.symbol && 
            gameBoard.gameArray[x][0 + 1] == player1.symbol && 
            gameBoard.gameArray[x][0 + 2] == player1.symbol) {
                announceWinner(player1.name, player1.symbol);
        }
       //player 2 vertical
        if(gameBoard.gameArray[0][x] == player2.symbol && 
            gameBoard.gameArray[0 + 1][x] == player2.symbol && 
            gameBoard.gameArray[0 + 2][x] == player2.symbol) {
                announceWinner(player2.name, player2.symbol);
        }
        //player 2 horizontal
        else if(gameBoard.gameArray[x][0] == player2.symbol && 
            gameBoard.gameArray[x][0 + 1] == player2.symbol && 
            gameBoard.gameArray[x][0 + 2] == player2.symbol) {
                announceWinner(player2.name, player2.symbol);
        }
    }
        //player 1 diagonal
        if(gameBoard.gameArray[0][0] == player1.symbol && 
            gameBoard.gameArray[1][1] == player1.symbol && 
            gameBoard.gameArray[2][2] == player1.symbol) {
                announceWinner(player1.name, player1.symbol);
        }
        else if(gameBoard.gameArray[0][2] == player1.symbol && 
            gameBoard.gameArray[1][1] == player1.symbol && 
            gameBoard.gameArray[2][0] == player1.symbol) {
                announceWinner(player1.name, player1.symbol);
        }
        //player 2 diagonal
        else if(gameBoard.gameArray[0][0] == player2.symbol && 
            gameBoard.gameArray[1][1] == player2.symbol && 
            gameBoard.gameArray[2][2] == player2.symbol) {
                announceWinner(player2.name, player2.symbol);
        }
        else if(gameBoard.gameArray[0][2] == player2.symbol && 
            gameBoard.gameArray[1][1] == player2.symbol && 
            gameBoard.gameArray[2][0] == player2.symbol) {
                announceWinner(player2.name, player2.symbol);
        }
    
}
// [["1", "2", "3"], 
// ["4", "5", "6"],
// ["7", "8", "9"]],

function announceWinner(name, winner) {
    alert(`${name}:"${winner}" is the winner! `)
}


