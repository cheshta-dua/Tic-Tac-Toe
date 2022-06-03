// let music = new Audio ("music.mp3")
// let audioTurn = new Audio ("turn.mp3")
// let gameSound = new Audio ("gameOver.mp3")

let turn = "X";
let gameOver = false;

// Function to change turn
// he did const changeTurn() => {}
function changeTurn() {
    return turn === "X" ? "0" : "X";
    // === used for strict equality check where the type is also checked (10!="10")
    // logic = if it is X's turn then next will be 0's otherwise it'll be X's
}

//Function to check who won
function checkWin() {
    let boxtexts = document.getElementsByClassName("text");
    let wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[1]].innerText === boxtexts[e[2]].innerText) && (boxtexts[e[0]].innerText !== "")) {
            document.querySelector(".info").innerText = boxtexts[e[0]].innerText + " won";
            gameOver = true;
        }
    })
}

//Game logic 
let boxes = document.getElementsByClassName("box");
//Array.from() creates an array from an object
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".text"); //get the first element 
    element.addEventListener('click', () => {
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            turn = changeTurn();
            // audioTurn.play();
            checkWin();
            if (!gameOver) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn; //changes first element of class info 
            }
        }
    })
})

//reset button
reset.addEventListener('click', () => {
    let boxtext = document.querySelectorAll(".text");
    Array.from(boxtext).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    document.getElementsByClassName("info")[0].innerText="Turn for " + turn;
    gameOver = false;
})