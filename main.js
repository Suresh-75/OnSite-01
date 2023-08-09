const gameBoard = document.querySelector(".gameBoard")
const restartBtn = document.querySelector(".restartBtn")
const gameCells = document.querySelectorAll(".gameCell")
const colorBlock = document.querySelector(".colorBlock")
const currentScore = document.querySelector(".currentScore")
const currentScoreDisplay = document.querySelector(".currentScoreDisplay")
const timeText = document.querySelector(".timeText")
const modal = document.querySelector(".modal")
const playBtn = document.querySelector(".playBtn")
let colorArr = [];
let seconds = 30;
let interval = null;
let gameOver = false;
let score = 0;
let Cscore = 0;
let blockColor;
restartBtn.addEventListener("click", () => {
    location.reload()
})

function gameBoardEngine() {
    for (let i = 0; i < gameCells.length; i++) {
        colorArr[i] = randomColorGen()
        colorArr[i].num = i;
        gameCells[i].style.backgroundColor = colorArr[i].colorRGB;
    }
}

function gameEngine() {
    gameBoardEngine();
    genRandomBlockColor();
    timer()
    currentScore.innerHTML = `${score}`
}
gameEngine();

function randomColorGen() {
    let r = Math.floor(Math.random() * 255) + 1
    let g = Math.floor(Math.random() * 255) + 1
    let b = Math.floor(Math.random() * 255) + 1
    let color = {
        colorRGB: `rgb(${r},${g},${b})`,
        num: null
    }
    return color;
}
function genRandomBlockColor() {
    let n = Math.floor(Math.random() * 16)
    let color = colorArr[n]
    blockColor = color;
    colorBlock.style.backgroundColor = `${blockColor.colorRGB}`
}


gameCells.forEach(function gameCellClicker(gameCell, index) {
    gameCell.addEventListener("click", () => {
        // console.log(colorArr[index].num)
        if (blockColor.num === colorArr[index].num) {
            score += 10;
            Cscore += 10;
            gameEngine();
        }
    })
})




interval = setInterval(timer, 1000);

setInterval(getTimerText, 500);

function timer() {
    seconds--;
    console.log(seconds)
    let mins = Math.floor((seconds) / 60);
    let secs = (seconds - (mins * 60)) % 60;
    if (secs < 10) {
        secs = "0" + secs;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    timeText.innerText = `${mins}:${secs}`;
}
function getTimerText() {
    if (seconds < 10) {
        timeText.style.color = "red"
    }
    if (seconds <= 0) {
        seconds = 0;
        clearInterval(interval);
        interval = null;
        gameOver = true;
        modal.showModal();
        currentScoreDisplay.innerHTML = `${Cscore}`
    }
}
playBtn.addEventListener("click", () => {
    location.reload()
})