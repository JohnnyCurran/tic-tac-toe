
let player = (name, symbol, winCount) => {
    return {name, symbol, winCount}
}

const player1 = player("player 1", "X", 0);
const player2 = player("player 2", "O", 0);


const displayModule = (() => {

  // It's important to have a container for the state of the game
  // Instead of an array, I would encourage you to look into using a Matrix
  // In this instance, it will be a 2-Dimensional array
  // https://www.geeksforgeeks.org/how-to-create-two-dimensional-array-in-javascript/
    let gameArray = ["", "", "",
                     "", "", "",
                     "", "", ""];

    let populateDisplay = () => {

        let gameBoardDivs = document.querySelectorAll(".gameBoardDivs");
        let displayWhosTurn = document.querySelector(".displayWhosTurn");

      // Lots of this HTML is static (i.e. non-changing)
      // For instance:
      // Score:
      // X - player 1:
      // O - player 2:
      // These don't need to be re-written every time.
      // Try and see how much of this HTML you can move into the <p class="displayWhosTurn"></p>
      // tag in your index.html
      // Remember: You can target inline elements by wrapping them in <span> tags
      // Here's an example:
      // HTML:
      // <p>
      // This is some text. Here is some <span class="special-class-name">Special text</span>
      // </p>
      // JavaScript:
      // let special-element = document.getElementsByClassName(".special-class-name")
      //
      // See if you can update this method to modify as little HTML as possible
        displayWhosTurn.innerHTML = 
        (`${playerMoveModule.whosTurn.symbol} - ${playerMoveModule.whosTurn.name}'s turn`) + "<br />" +
        (`Score: `) + "<br />" + (`${player1.symbol} - ${player1.name}: ${player1.winCount}`) + "<br />" + 
        (`${player2.symbol} - ${player2.name}: ${player2.winCount}`);

      // Once again, with the move to a matrix, I bet you can simplify this as well.
        let arrayIndex = 0;
        gameBoardDivs.forEach((div) => {
            div.textContent = displayModule.gameArray[arrayIndex];
            arrayIndex++;
        })
    }

  // A matrix will let you simplify here too
    let clearDisplay = () => {
        for(let x = 0; x < 9; x++) {
            displayModule.gameArray.splice(x, 1, "")
        };
        playerMoveModule.playCounter = 0;
        displayModule.populateDisplay();
    }

  // I challenge you to re-implement detection of which square was clicked without
  // using numbered class names. Remember what we did with the form submission:
  // You are able to access elements from event callback arguments.
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


const playerMoveModule = (() => {
    let whosTurn = player1;
    let playCounter = 0;
    let gameBoardDivs = document.querySelectorAll(".gameBoardDivs");
    
    let move = () => {
 
        gameBoardDivs.forEach((div) => {
            div.addEventListener("click", () => {
                //check if div has already been played
                if(displayModule.gameArray[div.classList[1] - 1] == player1.symbol ||
                    displayModule.gameArray[div.classList[1] - 1] == player2.symbol) {
                        return;
                }
                //player 1 turn
                if(playerMoveModule.whosTurn.name == player1.name) {
                    playerMoveModule.whosTurn = player2;
                    displayModule.gameArray.splice(div.classList[1] -1, 1, player1.symbol);
                    playerMoveModule.playCounter++;
                    displayModule.populateDisplay();
                    determineWinnerModule.checkWinner();
                }
                //player 2 turn
                else if(playerMoveModule.whosTurn.name == player2.name) {
                    playerMoveModule.whosTurn = player1;
                    displayModule.gameArray.splice(div.classList[1] - 1, 1, player2.symbol);
                    playerMoveModule.playCounter++;
                    displayModule.populateDisplay();
                    determineWinnerModule.checkWinner();
                };
            });
        });
    };

    return {
        whosTurn,
        move,
        playCounter,
    }

})();


let determineWinnerModule = (() => {

  // Avoid using eval() at all costs. I can guarantee you there are ways to
  // determine which player's turn it is without it.
    let won = (z) => {
        eval("player" + z).winCount++;
        determineWinnerModule.announceWinnner(eval("player" + z).name, eval("player" + z).symbol, eval("player" + z).winCount);
    }

    let isWinner = false;//helps determine tie

  // If you update your gameArray to become a 2-dimensional array (matrix),
  // I bet you will find that you can greatly simplify this function
  // After all, there are only so many ways to determine a winner in a 3x3 tic-tac-toe board
    let checkWinner = () => {
        
      // Again, avoid using eval() here - Maybe you could add a variable that indicates the current player? (Hint: It seems you may already have a module for it)
        for(let z = 1; z < 3; z++) {
            //diagonal win
            if(displayModule.gameArray[0] == eval("player" + z).symbol && 
            displayModule.gameArray[4] == eval("player" + z).symbol && 
            displayModule.gameArray[8] == eval("player" + z).symbol) {
                isWinner = true;
                determineWinnerModule.won(z);
            }

            else if(displayModule.gameArray[2] == eval("player" + z).symbol && 
            displayModule.gameArray[4] == eval("player" + z).symbol && 
            displayModule.gameArray[6] == eval("player" + z).symbol) {
                isWinner = true;
                determineWinnerModule.won(z);
            }
            let a = 0, b = 3, c = 6, 
            d = 0, e = 1, f = 2;
            //vertical win
            for(let y = 0; y < 3; y++, a++, b++, c++) {

                if(displayModule.gameArray[a] == eval("player" + z).symbol && 
                displayModule.gameArray[b] == eval("player" + z).symbol && 
                displayModule.gameArray[c] == eval("player" + z).symbol) {
                    isWinner = true;
                    determineWinnerModule.won(z);
                }
            //horizontal win 
                else if(displayModule.gameArray[d] == eval("player" + z).symbol && 
                displayModule.gameArray[e] == eval("player" + z).symbol && 
                displayModule.gameArray[f] == eval("player" + z).symbol) {
                    isWinner = true;
                    determineWinnerModule.won(z);
                }
                d += 3, e += 3, f += 3;
            }
        }
        //check for tie
        if(playerMoveModule.playCounter >= 9 && isWinner == false) {
            console.log("its a tie!")
            displayModule.clearDisplay()
        }
    }

    let announceWinnner = (name, winner, winCount) => {
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
    
    return {
        checkWinner,
        won,
        announceWinnner,
        
    }
})();
