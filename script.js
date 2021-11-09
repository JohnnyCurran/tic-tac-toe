const players = (name, symbol) => {
    return { name, symbol };
};

let gameBoard = {
    gameArray : [["1", "2", "3"], 
                ["4", "5", "6"],
                ["7", "8", "9"]],
}

let player1 = players("player 1", "x");
let player2 = players("player 2", "o");


function initGame () {
    let counter = 0;
    let gameBoardDivs = document.querySelectorAll(".gameBoardDivs");
    let displayWhosTurn = document.querySelector(".displayWhosTurn");
    let whosTurn = player1.name;
    displayWhosTurn.textContent = whosTurn

    gameBoardDivs.forEach((div) => {
        counter++;
        div.classList.add(counter);
        this["div" + counter] = document.getElementsByClassName([div.classList[1]]);
        
        div.addEventListener("click", () => {
            //first check if div has already been played
            if(div.textContent == "x" || div.textContent == "o") {return}
            //if div is unplayed loop through gameBoard.gameArray to find the index...
            //of pointerNum (this div class number (1-9) that was clicked)...
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
    if(gameBoard.gameArray[0][0] == player1.symbol && 
        gameBoard.gameArray[0][1] == player1.symbol && 
        gameBoard.gameArray[0][2] == player1.symbol) {
            announceWinner();
        }
    else if(gameBoard.gameArray[1][0] == player1.symbol && 
            gameBoard.gameArray[1][1] == player1.symbol && 
            gameBoard.gameArray[1][2] == player1.symbol) {
            announceWinner();   
    }
}
// [["1", "2", "3"], 
// ["4", "5", "6"],
// ["7", "8", "9"]],
// if(position1.textContent == "x" && position2.textContent == "x" && position3.textContent == "x") {console.log("x is winner")}
//     else if(position4.textContent == "x" && position5.textContent == "x" && position6.textContent == "x") {console.log("x is winner")}
//     else if(position7.textContent == "x" && position8.textContent == "x" && position9.textContent == "x") {console.log("x is winner")}

//     else if(position1.textContent == "x" && position4.textContent == "x" && position7.textContent == "x") {console.log("x is winner")}
//     else if(position2.textContent == "x" && position5.textContent == "x" && position8.textContent == "x") {console.log("x is winner")}
//     else if(position3.textContent == "x" && position6.textContent == "x" && position9.textContent == "x") {console.log("x is winner")}

//     else if(position1.textContent == "x" && position5.textContent == "x" && position9.textContent == "x") {console.log("x is winner")}
//     else if(position3.textContent == "x" && position5.textContent == "x" && position7.textContent == "x") {console.log("x is winner")}



//     else if(position1.textContent == "o" && position2.textContent == "o" && position3.textContent == "o") {console.log("o is winner")}
//     else if(position4.textContent == "o" && position5.textContent == "o" && position6.textContent == "o") {console.log("o is winner")}
//     else if(position7.textContent == "o" && position8.textContent == "o" && position9.textContent == "o") {console.log("o is winner")}

//     else if(position1.textContent == "o" && position4.textContent == "o" && position7.textContent == "o") {console.log("o is winner")}
//     else if(position2.textContent == "o" && position5.textContent == "o" && position8.textContent == "o") {console.log("o is winner")}
//     else if(position3.textContent == "o" && position6.textContent == "o" && position9.textContent == "o") {console.log("o is winner")}

//     else if(position1.textContent == "o" && position5.textContent == "o" && position9.textContent == "o") {console.log("o is winner")}
//     else if(position3.textContent == "o" && position5.textContent == "o" && position7.textContent == "o") {console.log("o is winner")}

function announceWinner() {
    alert("Winner!")
}