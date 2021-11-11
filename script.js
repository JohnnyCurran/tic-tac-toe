
let player = (name, symbol, winCount) => {
    return {name, symbol, winCount}
}

const player1 = player("player 1", "X", 0);
const player2 = player("player 2", "O", 0);


const displayModule = (() => {

    let gameArray = ["", "", "",
                       "", "", "",
                       "", "", ""];

    let populateDisplay = () => {

        let gameBoardDivs = document.querySelectorAll(".gameBoardDivs");
        let displayWhosTurn = document.querySelector(".displayWhosTurn");

        displayWhosTurn.innerHTML = 
        (`${playerMoves.whosTurn.symbol} - ${playerMoves.whosTurn.name}'s turn`) + "<br />" +
        (`Score: `) + "<br />" + (`${player1.symbol} - ${player1.name}: ${player1.winCount}`) + "<br />" + 
        (`${player2.symbol} - ${player2.name}: ${player2.winCount}`);

        let arrayIndex = 0;
        gameBoardDivs.forEach((div) => {
            div.textContent = displayModule.gameArray[arrayIndex];
            arrayIndex++;
        })
    }

    let clearDisplay = () => {
        for(let x = 0; x < 9; x++) {
            displayModule.gameArray.splice(x, 1, "")
        };
        playerMoves.playCounter = 0;
        displayModule.populateDisplay();
    }

    let addDivClassNames = () => {
        let gameBoardDivs = document.querySelectorAll(".gameBoardDivs");
        let divClassName = 0;
        gameBoardDivs.forEach((div) => {
            divClassName++
            div.classList.add(divClassName)
        })
        displayModule.populateDisplay()
    }

    return {
        populateDisplay,
        clearDisplay,
        addDivClassNames,
        gameArray,
    }
})();



let playerMoves = {

    whosTurn : player1,
                

    playCounter : 0,

    move : function() {
        let gameBoardDivs = document.querySelectorAll(".gameBoardDivs");
        gameBoardDivs.forEach((div) => {
            div.addEventListener("click", () => {
                
                // first check if div has already been played
                if(displayModule.gameArray[div.classList[1] - 1] == player1.symbol ||
                    displayModule.gameArray[div.classList[1] - 1] == player2.symbol) {
                        return;
                }
                //player 1 turn
                else if(playerMoves.whosTurn.name == player1.name) {
                    playerMoves.whosTurn = player2;
                    displayModule.gameArray.splice(div.classList[1] -1, 1, player1.symbol);
                    playerMoves.playCounter++;
                    displayModule.populateDisplay();
                    determineWinner.checkWinner();
                }
                //player 2 turn
                else if(playerMoves.whosTurn.name == player2.name) {
                    playerMoves.whosTurn = player1;
                    displayModule.gameArray.splice(div.classList[1] - 1, 1, player2.symbol);
                    playerMoves.playCounter++;
                    displayModule.populateDisplay();
                    determineWinner.checkWinner();
                };
            });
        });
    }
};


let determineWinner = {
    
    won : function(z) {
        eval("player" + z).winCount++;
        determineWinner.announceWinnner(eval("player" + z).name, eval("player" + z).symbol, eval("player" + z).winCount); 
    },

    checkWinner : function() {
        //check for tie
        if(playerMoves.playCounter >= 9) {
            console.log("its a tie!")
            displayModule.clearDisplay()
        }
        for(let z = 1; z < 3; z++) {
            //diagonal win
            if(displayModule.gameArray[0] == eval("player" + z).symbol && 
            displayModule.gameArray[4] == eval("player" + z).symbol && 
            displayModule.gameArray[8] == eval("player" + z).symbol) {
                determineWinner.won(z);
            }

            else if(displayModule.gameArray[2] == eval("player" + z).symbol && 
            displayModule.gameArray[4] == eval("player" + z).symbol && 
            displayModule.gameArray[6] == eval("player" + z).symbol) {
                determineWinner.won(z);
            }
            let a = 0, b = 3, c = 6, 
            d = 0, e = 1, f = 2;
            //vertical win
            for(let y = 0; y < 3; y++, a++, b++, c++) {

                if(displayModule.gameArray[a] == eval("player" + z).symbol && 
                displayModule.gameArray[b] == eval("player" + z).symbol && 
                displayModule.gameArray[c] == eval("player" + z).symbol) {
                    determineWinner.won(z);
                }
            //horizontal win 
                else if(displayModule.gameArray[d] == eval("player" + z).symbol && 
                displayModule.gameArray[e] == eval("player" + z).symbol && 
                displayModule.gameArray[f] == eval("player" + z).symbol) {
                    determineWinner.won(z);
                }
                d += 3, e += 3, f += 3;
            }
        }
    },

    announceWinnner : function(name, winner, winCount) {
        if(winCount >= 3) {
            alert(`${name} "${winner}" is the Champion! Games won:${winCount}`);
            player1.winCount = 0;
            player2.winCount = 0;
            displayModule.clearDisplay();
        }
        else {
            console.log(`${name} "${winner}" is the winner! Rounds won :${winCount}`)
            displayModule.clearDisplay();
        }
    }
};
displayModule.populateDisplay();