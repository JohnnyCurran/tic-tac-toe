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
    gameBoardDivs.forEach((div) => {
        counter++;
        div.classList.add(counter);
        
        
            this["div" + counter] = document.getElementsByClassName([div.classList[1]])
            
            //console.log(div.classList[1])
            
    })
  
}

// function gameFlow() {
//     var whosTurn = player1.name;
//     let displayWhosTurn = document.querySelector(".displayWhosTurn");
//     displayWhosTurn.textContent = player1.name;
    
//     index = gameBoard.gameArray.findIndex(items => items.uniqueId == parseInt(deleteBtn.className))
//         console.log(index)
//         //myLibrary.splice(index, 1)
        
    

// }