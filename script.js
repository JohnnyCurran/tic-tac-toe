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

            if(whosTurn == player1.name) {
                div.textContent = player1.symbol;
                let pointerNum = div.classList[1];
                for(let y = 0; y < 3; y++) {
                
                    for(let x = 0; x < 3; x++) {
                        if(pointerNum == gameBoard.gameArray[y][x]) {
                            gameBoard.gameArray[y].splice(x, 1, "x")
                        };
                    };
                };
                whosTurn == player2.name
            };
            
        });
    });
  
};


//     index = gameBoard.gameArray.findIndex(items => items.uniqueId == parseInt(deleteBtn.className))
//         console.log(index)
//         //myLibrary.splice(index, 1)
        
