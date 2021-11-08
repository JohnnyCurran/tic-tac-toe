let gameBoardArr = []


function gameFlow() {
    let whosTurn = "player1";
    let gameBoard = document.querySelectorAll(".gameBoard");
    let displayWhosTurn = document.querySelector(".displayWhosTurn");
    displayWhosTurn.textContent = whosTurn;
    let boardPosition = 0
    gameBoard.forEach(square => {
        boardPosition++
        square.classList.add("position" + boardPosition)
        

        square.addEventListener("click", () => {
            if(whosTurn == "player1") {
                if(square.textContent == "x" || square.textContent == "o") {return}
                square.textContent = "x";
                gameBoardArr.push(square.textContent);
                whosTurn = "player2";
                displayWhosTurn.textContent = whosTurn;
                checkWinner();
            }
            else if(whosTurn == "player2") {
                if(square.textContent == "x" || square.textContent == "o") {return}
                square.textContent = "o";
                gameBoardArr.push(square.textContent);
                whosTurn = "player1";
                displayWhosTurn.textContent = whosTurn;
                checkWinner();
            }
        })
    })
    position1 = document.querySelector(".position1");
    position2 = document.querySelector(".position2");
    position3 = document.querySelector(".position3");
    position4 = document.querySelector(".position4");
    position5 = document.querySelector(".position5");
    position6 = document.querySelector(".position6");
    position7 = document.querySelector(".position7");
    position8 = document.querySelector(".position8");
    position9 = document.querySelector(".position9");
}
function checkWinner() {
    console.log(position1.textContent)
    console.log(position2.textContent)
    console.log(position3.textContent)
    console.log(position4.textContent)
    console.log(position5.textContent)
    console.log(position6.textContent)
    console.log(position7.textContent)
    console.log(position8.textContent)
    console.log(position9.textContent)
    if(position1.textContent == "x" && position2.textContent == "x" && position3.textContent == "x") {console.log("x is winner")}
    else if(position4.textContent == "x" && position5.textContent == "x" && position6.textContent == "x") {console.log("x is winner")}
    else if(position7.textContent == "x" && position8.textContent == "x" && position9.textContent == "x") {console.log("x is winner")}

    else if(position1.textContent == "x" && position4.textContent == "x" && position7.textContent == "x") {console.log("x is winner")}
    else if(position2.textContent == "x" && position5.textContent == "x" && position8.textContent == "x") {console.log("x is winner")}
    else if(position3.textContent == "x" && position6.textContent == "x" && position9.textContent == "x") {console.log("x is winner")}

    else if(position1.textContent == "x" && position5.textContent == "x" && position9.textContent == "x") {console.log("x is winner")}
    else if(position3.textContent == "x" && position5.textContent == "x" && position7.textContent == "x") {console.log("x is winner")}



    else if(position1.teotContent == "o" && position2.teotContent == "o" && position3.teotContent == "o") {console.log("o is winner")}
    else if(position4.teotContent == "o" && position5.teotContent == "o" && position6.teotContent == "o") {console.log("o is winner")}
    else if(position7.teotContent == "o" && position8.teotContent == "o" && position9.teotContent == "o") {console.log("o is winner")}

    else if(position1.teotContent == "o" && position4.teotContent == "o" && position7.teotContent == "o") {console.log("o is winner")}
    else if(position2.teotContent == "o" && position5.teotContent == "o" && position8.teotContent == "o") {console.log("o is winner")}
    else if(position3.teotContent == "o" && position6.teotContent == "o" && position9.teotContent == "o") {console.log("o is winner")}

    else if(position1.teotContent == "o" && position5.teotContent == "o" && position9.teotContent == "o") {console.log("o is winner")}
    else if(position3.teotContent == "o" && position5.teotContent == "o" && position7.teotContent == "o") {console.log("o is winner")}


}
