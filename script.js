
let player = (name, symbol, winCount) => {
    return {name, symbol, winCount}
}

const player1 = player("player 1", "X", 0);
const player2 = player("player 2", "O", 0);


let display = {

    gameArray : ["", "", "",
                "", "", "",
                "", "", ""],
    clearDisplay : function() {
        for(let x = 0; x < 9; x++) {
            display.gameArray.splice(x, 1, "")
        };
        display.populateDisplay();

    },
                    
    addDivClassNames : function() {
        let gameBoardDivs = document.querySelectorAll(".gameBoardDivs");
        let divClassName = 0;
        gameBoardDivs.forEach((div) => {
            divClassName++
            div.classList.add(divClassName)
        })
        display.populateDisplay()
    },

    populateDisplay : function() {
        let gameBoardDivs = document.querySelectorAll(".gameBoardDivs");
        let arrayIndex = 0;
        gameBoardDivs.forEach((div) => {
            div.textContent = display.gameArray[arrayIndex];
            arrayIndex++;
        })
    }
};


let playerMoves = {
    
    whosTurn : player1.name,

    move : function() {
        let playCounter = 0;
        let gameBoardDivs = document.querySelectorAll(".gameBoardDivs");
        
        gameBoardDivs.forEach((div) => {
            div.addEventListener("click", () => {
                
                // first check if div has already been played
                if(display.gameArray[div.classList[1] - 1] == player1.symbol ||
                    display.gameArray[div.classList[1] - 1] == player2.symbol) {
                        return;
                }

                else if(playerMoves.whosTurn == player1.name) {
                    playerMoves.whosTurn = player2.name;
                    display.gameArray.splice(div.classList[1] -1, 1, player1.symbol);
                    playCounter++;
                    console.log(playCounter)
                    display.populateDisplay();
                    determineWinner.checkWinner();
                }

                else if(playerMoves.whosTurn == player2.name) {
                    playerMoves.whosTurn = player1.name;
                    display.gameArray.splice(div.classList[1] - 1, 1, player2.symbol);
                    playCounter++;
                    console.log(playCounter)
                    display.populateDisplay();
                    determineWinner.checkWinner();
                };
            });
        });
    },

    
};

let determineWinner = {
    
    checkWinner : function() {

        let b = 0, c = 1, d = 2, e = 0, f = 3, g = 6, h = 0, i = 4, j = 8;

        for(let a = 1; a < 3; a++) {
            //vertical
            if(display.gameArray[e] == eval("player" + a).symbol && 
            display.gameArray[f] == eval("player" + a).symbol && 
            display.gameArray[g] == eval("player" + a).symbol) {
                eval("player" + a).winCount++;
                determineWinner.announceWinnner(eval("player" + a).name, eval("player" + a).symbol, eval("player" + a).winCount);
                console.log("vertical winner");
            }
            //horizontal
            else if(display.gameArray[b] == eval("player" + a).symbol && 
            display.gameArray[c] == eval("player" + a).symbol && 
            display.gameArray[d] == eval("player" + a).symbol) {
                b += 3, c += 3, d += 3;
                eval("player" + a).winCount++;
                determineWinner.announceWinnner(eval("player" + a).name, eval("player" + a).symbol, eval("player" + a).winCount);
                console.log("horizontal winner");
            }
            //diagonal
            else if(display.gameArray[h] == eval("player" + a).symbol && 
            display.gameArray[i] == eval("player" + a).symbol && 
            display.gameArray[j] == eval("player" + a).symbol) {
                eval("player" + a).winCount++;
                determineWinner.announceWinnner(eval("player" + a).name, eval("player" + a).symbol, eval("player" + a).winCount);
                console.log("diagonal winner");
            }
            //diagonal
            else if(display.gameArray[h + 2] == eval("player" + a).symbol && 
            display.gameArray[i] == eval("player" + a).symbol && 
            display.gameArray[j - 2] == eval("player" + a).symbol) {
                eval("player" + a).winCount++;
                determineWinner.announceWinnner(eval("player" + a).name, eval("player" + a).symbol, eval("player" + a).winCount);
                console.log("diagonal winner");
            }
        }
    },

    announceWinnner : function(name, winner, winCount) {
        console.log({name, winner, winCount})
        display.clearDisplay();
    }

};

