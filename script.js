//for game sounds 
let audioTurnX = new Audio("others/tingX.mp3");
let audioTurn0 = new Audio("others/ting0.mp3");
let audioWin = new Audio("others/win.mp3");
let audioReset = new Audio("others/reset.wav");
let audioDraw = new Audio("others/draw.mp3");

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
function checkWin() {
    let boxtexts = document.getElementsByClassName("text");
    let wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]; //indexes which user needs to fill in order to win 
    //if each of these options is filled by the same player (X or 0), then that player wins 
    wins.forEach(e => {
        //if position 0=1=2 or 3=4=5 or... then player wins
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
//boxes = document.getElementsByClassName("box"); this returns a collection of elements so we need an array to store
let counter = 0; //Will help in draw condition 
Array.from(boxes).forEach(element => { //Array.from() creates an array from an object
    var boxtext = element.querySelector(".text");
    element.addEventListener('click', () => {
        if (boxtext.innerText === '') { //if the box is empty
            boxtext.innerText = turn; //fill it with X or 0 according to the turn 
            ++counter; //on each turn, increment the counter. When counter=9, all the boxes will get filled

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

            //draw condition 
            if (counter === 9 && !gameOver) {
                //gameOver condition important cos if the player wins on the very last turn then it shouldn't show "draw"
                document.getElementsByClassName("info")[0].innerText = "Match draw";
                audioDraw.play();
                gameOver = true;
            }

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
        //removing the class cos if not, colors get messed up nxt time (like span.text.playerX.player0)
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
    counter = 0;
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