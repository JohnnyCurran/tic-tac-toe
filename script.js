let player = (name, symbol, winCount) => {
    return {name, symbol, winCount}
}

const player1 = player("player 1", "X", 0);
const player2 = player("player 2", "O", 0);



const displayModule = (() => {

    let gameBoardDivs = document.getElementsByClassName("gameBoardDivs");
    // let gameArray = [ ["", "", ""], ["", "", ""], ["", "", ""] ];
    let gameArray = ["", "", "", "", "", "", "", "", ""];
    
    let populateDisplay = () => {

        let displayStats = document.getElementsByClassName("displayStats");

        displayStats[0].textContent = playerMoveModule.whosTurn.name;
        displayStats[1].textContent = playerMoveModule.whosTurn.symbol;
        displayStats[2].textContent = player1.name;
        displayStats[3].textContent = player1.winCount;
        displayStats[4].textContent = player2.name;
        displayStats[5].textContent = player1.winCount;

        // // Once again, with the move to a matrix, I bet you can simplify this as well.

        // //works with 2d array
        // for(let x = 0, y = 0, z = 0; x < gameBoardDivs.length; x++, z++) {
        //     gameBoardDivs[x].textContent = gameArray[y][z]
        //     if(z == 2) {y++, z = -1}
        // };
        for(let x = 0; x < gameBoardDivs.length; x++) {
            gameBoardDivs[x].textContent = gameArray[x];
        }
    };


    let populateArray = () => {
        gameArray = [];
        
        for(let x = 0; x < gameBoardDivs.length; x++) {
            
            gameArray.push(gameBoardDivs[x].textContent);
        
        }
        console.log(displayModule.gameArray)
        populateDisplay();
        
       
    }

    // A matrix will let you simplify here too
    let clearDisplay = () => {
        // poor mans clear display
        //gameArray = [];
        //populateDisplay()
    };
    
    return {
        gameArray,
        populateDisplay,
        clearDisplay,
        populateArray
    };
    

})();


let playerMoveModule = (() => {
    
    let whosTurn = player1;
    let playCounter = 0;
    
    
    let move = () => {

        let gameBoardDivs = document.querySelectorAll(".gameBoardDivs");

        gameBoardDivs.forEach((div) => {
            div.addEventListener("click", (div) => {
                //check if div has already been played
                if(div.target.textContent == player1.symbol ||
                    div.target.textContent == player2.symbol)
                     {return};

                //player 1 turn
                if(playerMoveModule.whosTurn.name == player1.name) {
                    playerMoveModule.whosTurn = player2;
                    div.target.textContent = player1.symbol;
                    //console.log(displayModule.gameArray);
                    displayModule.populateArray();
                    //winModule.checkWinner();
                    
                    
                    
                    
                }
                // player 2 turn
                else if(playerMoveModule.whosTurn.name == player2.name) {
                    playerMoveModule.whosTurn = player1;
                    div.target.textContent = player2.symbol;
                    //console.log(displayModule.gameArray);
                    displayModule.populateArray();
                    //winModule.checkWinner();

                    
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