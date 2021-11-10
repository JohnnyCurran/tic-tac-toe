//todo make diagonal check work
let player = (name, symbol) => {
    return {name, symbol}
}


let display = (() => {

    let gameArray = ["", "", "", "", "", "", "", "", ""];
                    
    let addDivClassNames = function() {
        let gameBoardDivs = document.querySelectorAll(".gameBoardDivs");
        let divClassName = 0;
        gameBoardDivs.forEach((div) => {
            divClassName++
            div.classList.add(divClassName)
        })
        populateDisplay()
    }

    let populateDisplay = function() {
        let gameBoardDivs = document.querySelectorAll(".gameBoardDivs");
        let arrayIndex = 0;
        gameBoardDivs.forEach((div) => {
            div.textContent = gameArray[arrayIndex];
            arrayIndex++;
        })
    }

    return {
        addDivClassNames : addDivClassNames,
        gameArray : gameArray,
        populateDisplay : populateDisplay
        
    }
})();
const player1 = player("player 1", "X");
const player2 = player("player 2", "O");
let playerMoves = (() => {

    
    let whosTurn = player1.name;
    

    let move = function() {
        let gameBoardDivs = document.querySelectorAll(".gameBoardDivs");
        
        gameBoardDivs.forEach((div) => {
            div.addEventListener("click", () => {
                
                // first check if div has already been played
                if(display.gameArray[div.classList[1] - 1] == player1.symbol ||
                    display.gameArray[div.classList[1] - 1] == player2.symbol) {
                        return;
                }

                else if(whosTurn == player1.name) {
                    whosTurn = player2.name;
                    display.gameArray.splice(div.classList[1] -1, 1, player1.symbol)
                    display.populateDisplay();
                    determineWinner.checkWinner();
                }

                else if(whosTurn == player2.name) {
                    whosTurn = player1.name;
                    display.gameArray.splice(div.classList[1] - 1, 1, player2.symbol);
                    display.populateDisplay();
                    determineWinner.checkWinner();
                };
            });
        });
    };

    return {
        move : move
    }
})();


let determineWinner = (() => {
    
    let checkWinner = function() {
        for(let x = 1; x < 3; x++) {
            
            for(let d = 0, e = 4, f = 8, a = 0, b = 1, c = 2, w = 0, y = 3, z = 6; y < 9; w++, y++, z++) {
                //vertical
                if(display.gameArray[w] == eval("player" + x).symbol && 
                display.gameArray[y] == eval("player" + x).symbol && 
                display.gameArray[z] == eval("player" + x).symbol) {
                    console.log("vertical winner");
                }
                //horizontal
                else if(display.gameArray[a] == eval("player" + x).symbol && 
                display.gameArray[b] == eval("player" + x).symbol && 
                display.gameArray[c] == eval("player" + x).symbol) {
                    a += 3, b += 3, c += 3;
                    console.log("horizontal winner")

                }
                
                //diagonal
                else if(display.gameArray[d] == eval("player" + x).symbol && 
                display.gameArray[e] == eval("player" + x).symbol && 
                display.gameArray[f] == eval("player" + x).symbol) {
                    f = 6, d = 2;
                    console.log("diagonal winner")

                }
            }
        }
    }
    // ["0", "1", "2",
    //  "3", "4", "5",
    //   "6", "7", "8"];
    
    return {
        checkWinner : checkWinner
    }
})();

