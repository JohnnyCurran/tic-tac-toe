let player = (name, symbol, winCount) => {
    return {name, symbol, winCount}
}

const player1 = player("player 1", "X", 0);
const player2 = player("player 2", "O", 0);



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
        document.getElementById("player2WinCount").textContent = player1.winCount;

        
        // for(let x = 0; x < gameBoardDivs.length; x++) {
        //     gameBoardDivs[x].textContent = gameArray[x];
        // }
        playerMoveModule.move()
    };

    
    let populateMatrix = () => {
        for(let x = 0; x < gameMatrix.length; x++) {
            for(let y = 0; y < gameMatrix[x].length; y++) {
                gameMatrix[x][y] = x.toString() + "," + y.toString()
            }
        }
        console.log(gameMatrix)
    }

    

    // playMove: Accept the following arguments:
    // Symbol to be played
    // Row of clicked div
    // Column of clicked div
    // playMove will update the gameMatrix and the textContent of the clicked div
    let playMove = (symbol, row, column, event) => {
        gameMatrix[row][column] = symbol;
        event.textContent = symbol;
        console.log(gameMatrix)

    }
    // A matrix will let you simplify here too
    let clearDisplay = () => {
        // poor mans clear display
        //gameArray = [];
        //populateDisplay()
    };
    
    return {
        
        populateDisplay,
        clearDisplay,
        populateMatrix,
        playMove
    };
    

})();


let playerMoveModule = (() => {
    
    let whosTurn = player1;
    let playCounter = 0;
    
    
    let move = () => {

        let gameBoardDivs = document.querySelectorAll(".gameBoardDivs");

        gameBoardDivs.forEach((div) => {
            div.addEventListener("click", (event) => {
                console.log(event.target.dataset.row);
                console.log(event.target.dataset.column);
                //check if div has already been played
                if(event.target.textContent == player1.symbol ||
                    event.target.textContent == player2.symbol)
                     {return};

                //player 1 turn
                if(playerMoveModule.whosTurn.name == player1.name) {
                    playerMoveModule.whosTurn = player2;
                    event.target.textContent = player1.symbol;
                    
                    displayModule.playMove(player1.symbol, event.target.dataset.row, event.target.dataset.column, event.target);
                
                }

                // player 2 turn
                else if(playerMoveModule.whosTurn.name == player2.name) {
                    playerMoveModule.whosTurn = player1;
                    event.target.textContent = player2.symbol;
                    
                    displayModule.playMove(player2.symbol, event.target.dataset.row, event.target.dataset.column, event.target);
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

    let checkWinner = () => {
        //diagonal win
        

        if(displayModule.gameArray[0] == player1.symbol && 
        displayModule.gameArray[4] == player1.symbol && 
        displayModule.gameArray[8] == player1.symbol) {
            console.log("diagonal win")
            displayModule.clearDisplay();
        }
    };

    return {
        checkWinner
    };

})();
displayModule.populateMatrix();