
let player = (name, symbol, winCount) => {
    return {name, symbol, winCount}
}

let player1 = player("player 1", "X", 0);
let player2 = player("player 2", "O", 0);

const displayModule = (() => {
    let gameBoardDivs = document.getElementsByClassName("gameBoardDivs");
    let gameMatrix = 
       [["", "", ""],
        ["", "", ""],
        ["", "", ""]];

    
    
    let populateDisplay = () => {

        document.getElementById("currentPlayersTurn").textContent = playerMoveModule.whosTurn.name;
        document.getElementById("currentPlayersSymbol").textContent = playerMoveModule.whosTurn.symbol;
        document.getElementById("player1Name").textContent = player1.name;
        document.getElementById("player1WinCount").textContent = player1.winCount;
        document.getElementById("player2Name").textContent = player2.name;
        document.getElementById("player2WinCount").textContent = player2.winCount;

        
        return;
    };

    
   
    let playMove = (symbol, row, column, event) => {
        playerMoveModule.playCounter++;
        gameMatrix[row][column] = symbol;
        event.textContent = symbol;
        winModule.checkWinner();
        return;

    }
    
    let clearDisplay = () => {
        winModule.isWinner = false;
        playerMoveModule.playCounter = 0;
        for(let x = 0; x < 3; x++) {
            for(let y = 0; y < 3; y++) {
                gameMatrix[x][y] = "";
            };
        };
        for(let x = 0; x < gameBoardDivs.length; x++) {
           gameBoardDivs[x].textContent = "";
        };
       populateDisplay();
       return;
    };

    let clearGame = () => {
        player1.winCount = 0;
        player2.winCount = 0;
        winModule.isWinner = false;
        playerMoveModule.playCounter = 0;
        clearDisplay();
      
    }
    
    return {
        
        populateDisplay,
        clearDisplay,
        playMove,
        gameMatrix,
        clearGame
    };

})();

let playerMoveModule = (() => {
    let whosTurn = player1;
    let playCounter = 0;
    let move = () => {
        let gameBoardDivs = document.querySelectorAll(".gameBoardDivs");

      // Every time you call move(), you add a new event listener to the game board divs
      // They only need one - What would a better place for this event listener initialization be?
        gameBoardDivs.forEach((div) => {
            div.addEventListener("click", (event) => {
                //check if div has already been played
                if(event.target.textContent == player1.symbol ||
                    event.target.textContent == player2.symbol)
                     {return};
              // You can simplify your if logic here
              // What does playerMoveModule.whosTurn hold?
              // (hint: try a console.log() on playerMoveModule.whosTurn)
              // Do you need to determine what player is active before playing a move?

                //player 1 turn
                if(playerMoveModule.whosTurn.name == player1.name) {
                    
                    displayModule.playMove(player1.symbol, event.target.dataset.row, 
                        event.target.dataset.column, event.target);
                    playerMoveModule.whosTurn = player2;
                }
                // player 2 turn
                else if(playerMoveModule.whosTurn.name == player2.name) {
                    
                    displayModule.playMove(player2.symbol, event.target.dataset.row, 
                        event.target.dataset.column, event.target);
                    playerMoveModule.whosTurn = player1;
                };
            });
        });
    };

    return {
        whosTurn,
        playCounter,
        move
    }
})();


let winModule = (() => {

    let isWinner = false;

    // If you update your gameArray to become a 2-dimensional array (matrix),
    // I bet you will find that you can greatly simplify this function
    // After all, there are only so many ways to determine a winner in a 3x3 tic-tac-toe board
  // The checkWinner function is pretty large. I encourage you to try and break it down further.
  // What all is the checkWinner function doing?
  // - Check horizontal winner
  // - Check vertical winner
  // - Check diagonal winner
  // - Announce winner
  // - Clear display (if there is a winner)
  // Break the check winner methods into their own - They should accept a game board as an argument and a player symbol and return true if there is a winner and false if not.
  // I challenge you to do it also without creating a winArray variable to check against
    let checkWinner = () => {
        
        let s = playerMoveModule.whosTurn.symbol;
        let winArray = [[s, s, s], [s, s, s], [s, s, s]];

      // To iterate over a 2-D array, you will find it easier to have a nested for-loop
      // Rather than one for loop with 2 iteration variables (x, y)
      // Let the for loop take care of the iteration for you
        // horizontal match
        for(let x = 0, y = 0; x < displayModule.gameMatrix.length; x++) {
            if(displayModule.gameMatrix[x][y] == winArray[x][y] &&
                displayModule.gameMatrix[x][y + 1] == winArray[x][y + 1] &&
                displayModule.gameMatrix[x][y + 2] == winArray[x][y + 2]) {
                    playerMoveModule.whosTurn.winCount++;
                    isWinner = true;
                    console.log("horizontal match")
                    announceWinner()
              }
            // vertical match
            else if(displayModule.gameMatrix[y][x] == winArray[y][x] &&
                displayModule.gameMatrix[y + 1][x] == winArray[y + 1][x] &&
                displayModule.gameMatrix[y + 2][x] == winArray[y + 2][x]) {
                    playerMoveModule.whosTurn.winCount++;
                    isWinner = true;
                    console.log("vertical match")
                    announceWinner()
              }
          };

          // diagonal match
          for(let x = 0, y = 0; x < 1; x++) {
            if(displayModule.gameMatrix[x][y] == winArray[x][y] &&
                displayModule.gameMatrix[x + 1][y + 1] == winArray[x + 1][y + 1] &&
                displayModule.gameMatrix[x + 2][y + 2] == winArray[x + 2][y + 2]) {
                    playerMoveModule.whosTurn.winCount++;
                    isWinner = true;
                    console.log("diagonal match left to right")
                    announceWinner()
              }
            else if(displayModule.gameMatrix[x][y + 2] == winArray[x][y + 2] &&
                displayModule.gameMatrix[x + 1][y + 1] == winArray[x + 1][y + 1] &&
                displayModule.gameMatrix[x + 2][y] == winArray[x + 2][y]) {
                    playerMoveModule.whosTurn.winCount++;
                    isWinner = true;
                    console.log("diagonal match /")
                    announceWinner()
            }
          }
          // check for a tie
          if(isWinner == false && playerMoveModule.playCounter > 8) {
              console.log('tie');
              displayModule.clearDisplay();
          }
          return;
    };

    let announceWinner = () => {
        if(playerMoveModule.whosTurn.winCount > 2) {
            alert(playerMoveModule.whosTurn.name + " is the champion. game over.");
           
            displayModule.clearGame();
        }

        else if(playerMoveModule.whosTurn.winCount < 3) {
            alert(playerMoveModule.whosTurn.name + " is the winner");
        displayModule.clearDisplay()
        };

        
    };

    return {
        checkWinner,
        isWinner,
        announceWinner
    };
})();
