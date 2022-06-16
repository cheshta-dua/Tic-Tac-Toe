//for game sounds 
let audioTurnX = new Audio("others/tingX.mp3");
let audioTurn0 = new Audio("others/ting0.mp3");
let audioWin = new Audio("others/win.mp3");
let audioReset = new Audio("others/reset.mp3");

let turn = "X";
let gameOver = false;
let boxes = document.getElementsByClassName("box");

// Function to change turn
function changeTurn() {
    return turn === "X" ? "0" : "X";
    // === used for strict equality check where the type is also checked (10!="10")
    // logic = if it is X's turn then next will be 0's otherwise it'll be X's
}

//Function to check who won
let counter = 0;
function checkWin() {
    let boxtexts = document.getElementsByClassName("text");
    let wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]; //indexes which user needs to fill in order to win 
    //if each of these options is filled by the same player (X or 0), then that player wins 
    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[1]].innerText === boxtexts[e[2]].innerText) && (boxtexts[e[0]].innerText !== "")) {
            document.querySelector(".info").innerText = boxtexts[e[0]].innerText + " won";

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            audioWin.play();
            gameOver = true;
        }
    })
}

//Game logic 
Array.from(boxes).forEach(element => { //Array.from() creates an array from an object
    var boxtext = element.querySelector(".text"); //get the first element 
    element.addEventListener('click', () => {
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;

            if (turn === "X") {
                boxtext.classList.add("playerX");  //for changing color of X (blue X & green 0)
                audioTurnX.play();
            }
            else {
                boxtext.classList.add("player0");
                audioTurn0.play();
            }
            turn = changeTurn();
            checkWin();

            if (!gameOver) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
            else { 
                //users cannot play after someone wins/match draws, they should reset to continue playing 
                //get all boxes and set the pointer event to none so they become unclickable
                Array.from(boxes).forEach(element => {
                    element.style.pointerEvents = "none";
                })
            }
        }
    })
})

//reset button
reset.addEventListener('click', () => {
    let boxtext = document.querySelectorAll(".text");
    Array.from(boxtext).forEach(element => {
        element.innerText = "";
        if (element.className === "playerX") {
            element.classList.remove("playerX");
        }
        else {
            element.classList.remove("player0");
        }
    });
    Array.from(boxes).forEach(element => {
        element.style.pointerEvents = "auto"; //resetting the pointer event so that users can play again
    })
    turn = "X";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn; //first turn will be of X
    gameOver = false;
    audioReset.play();
})


//hamburger menu
const ham = document.querySelector(".hamburger");
const panel = document.querySelector(".panel");

ham.addEventListener('click', function () {
    ham.classList.toggle("active");
    panel.classList.toggle("active");
})

//toggle to dark mode
//this won't keep the btn toggled on refresh, gotta use local/session storage for that 
//for auto detecting the device mode, use something called 'prefers color scheme'
const modeBtn = document.querySelector(".switch");
modeBtn.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme');
})

//toggle sounds
const soundBtn = document.getElementById("soundSwitch");
var checkbox = document.querySelector("input[name=soundChkbox]");
soundBtn.addEventListener('change', () => {
    if (checkbox.checked) {
        audioReset.muted = true;
        audioTurn0.muted = true;
        audioTurnX.muted = true;
        audioWin.muted = true;
    }

    else {
        audioReset.muted = false;
        audioTurn0.muted = false;
        audioTurnX.muted = false;
        audioWin.muted = false;
    }
})