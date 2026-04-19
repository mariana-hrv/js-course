const startBtn = document.getElementById("startBtn");
const difficultySelect = document.getElementById("difficulty");
const colorSelect = document.getElementById("color");
const controls = document.getElementById("controls");
const gameInfo = document.getElementById("gameInfo");

const square = document.getElementById("square");
const gameArea = document.getElementById("gameArea");
const scoreSpan = document.getElementById("score");
const timeSpan = document.getElementById("time");

let score = 0;
let timeLeft = 0;
let clickTime = 0;
let squareSize = 30;
let currentSpread = 1;

let countdownInterval = null;
let gameActive = false;
let gameStarted = false;
let chosenColor = "";

const settings = {
  lazy: {
    size: 60,
    time: 3,
    spread: 0.3,
  },
  normal: {
    size: 35,
    time: 2,
    spread: 0.6,
  },
  hard: {
    size: 20,
    time: 1,
    spread: 1,
  },
};

function placeSquare() {
  const maxX = gameArea.clientWidth - squareSize;
  const maxY = gameArea.clientHeight - squareSize;

  const spreadX = maxX * currentSpread;
  const spreadY = maxY * currentSpread;

  const startX = (maxX - spreadX) / 2;
  const startY = (maxY - spreadY) / 2;

  const randomX = Math.floor(startX + Math.random() * spreadX);
  const randomY = Math.floor(startY + Math.random() * spreadY);

  square.style.width = squareSize + "px";
  square.style.height = squareSize + "px";
  square.style.backgroundColor = chosenColor;
  square.style.left = randomX + "px";
  square.style.top = randomY + "px";
  square.style.display = "block";
}

function stopGame() {
  gameActive = false;
  clearInterval(countdownInterval);
  timeSpan.textContent = 0;

  alert(
    "Game over! Your score is " +
      score +
      ". Please reload the page to start a new game.",
  );
}

function startTimer() {
  clearInterval(countdownInterval);

  timeLeft = clickTime;
  timeSpan.textContent = timeLeft;

  countdownInterval = setInterval(function () {
    timeLeft--;
    timeSpan.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      stopGame();
    }
  }, 1000);
}

function nextRound() {
  placeSquare();
  startTimer();
}

startBtn.addEventListener("click", function () {
  if (gameStarted) {
    return;
  }

  const difficulty = difficultySelect.value;
  const color = colorSelect.value;

  if (difficulty === "" || color === "") {
    alert("Choose difficulty and color first.");
    return;
  }

  gameStarted = true;
  gameActive = true;

  chosenColor = color;
  squareSize = settings[difficulty].size;
  clickTime = settings[difficulty].time;
  currentSpread = settings[difficulty].spread;

  score = 0;
  scoreSpan.textContent = score;

  controls.style.display = "none";
  gameInfo.style.display = "block";
  gameArea.style.display = "block";

  nextRound();
});

square.addEventListener("click", function () {
  if (!gameActive) {
    return;
  }

  score++;
  scoreSpan.textContent = score;

  nextRound();
});
