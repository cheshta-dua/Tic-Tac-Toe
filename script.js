//setting up sounds 
let audioTurnX = new Audio("others/tingX.mp3");
let audioTurn0 = new Audio("others/ting0.mp3");
let audioWin = new Audio("others/win.mp3");
let audioReset = new Audio("others/reset.mp3");

let turn = "X";
let gameOver = false;

// Function to change turn
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
let boxes = document.getElementsByClassName("box");
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
        if (element.className === "playerX") {
            element.classList.remove("playerX");
        }
        else {
            element.classList.remove("player0");
        }

    });
    turn = "X";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
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