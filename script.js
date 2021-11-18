//todo: fix bug - on a diagonal win, the losing player's symbol appears on the board and in the gameMatrix
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

        playerMoveModule.move()
    };

    

    let playMove = (symbol, row, column, event) => {
        playerMoveModule.playCounter++;
        gameMatrix[row][column] = symbol;
        event.textContent = symbol;
        winModule.checkWinner();

    }
    
    let clearDisplay = () => {

        playerMoveModule.playCounter = 0;
        for(let x = 0; x < gameMatrix.length; x++) {
            for(let y = 0; y < gameMatrix[x].length; y++) {
                gameMatrix[x][y] = "";
            };
        };
        for(let x = 0; x < gameBoardDivs.length; x++) {
           gameBoardDivs[x].textContent = "";
        };
       populateDisplay();
    };

    let clearGame = () => {
        player1 = player("player 1", "X", 0);
        player2 = player("player 2", "O", 0);
        winModule.isWinner = false;
        playerMoveModule.playCounter = 0;
        // possibly let loser go first in a fresh game if full game already played
        //playerMoveModule.whosTurn = ;
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

        gameBoardDivs.forEach((div) => {
            div.addEventListener("click", (event) => {
                //check if div has already been played
                if(event.target.textContent == player1.symbol ||
                    event.target.textContent == player2.symbol)
                     {return};

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

    let checkWinner = () => {
        console.log(playerMoveModule.playCounter)
        let s = playerMoveModule.whosTurn.symbol;
        let winArray = [[s, s, s], [s, s, s], [s, s, s]];

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
                    console.log("diagonal match \\")
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
              console.log('tie')
          }
    };


    let announceWinner = () => {
        if(playerMoveModule.whosTurn.winCount > 2) {
            alert(playerMoveModule.whosTurn.name + " is the champion. game over.");
            displayModule.clearGame();
        };

        alert(playerMoveModule.whosTurn.name + " is the winner");
        displayModule.clearDisplay();
    };

    return {
        checkWinner,
        isWinner,
        announceWinner
    };

})();
