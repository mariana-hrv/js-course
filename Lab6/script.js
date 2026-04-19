let levels = [];
let currentLevel = -1;
let board = [];
let initialBoard = [];
let moves = 0;
let seconds = 0;
let timerId = null;
let gameFinished = false;

let lastClickRow = -1;
let lastClickCol = -1;
let lastClickTime = 0;

function loadLevels() {
  fetch("./data/levels.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP error: " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      levels = data.levels;

      if (!Array.isArray(levels) || levels.length === 0) {
        throw new Error("У JSON немає рівнів.");
      }

      const firstIndex = Math.floor(Math.random() * levels.length);
      startLevel(firstIndex);

      document
        .getElementById("newGameBtn")
        .addEventListener("click", handleNewGame);

      document
        .getElementById("restartBtn")
        .addEventListener("click", handleRestart);
    })
    .catch(function (error) {
      console.error("Помилка завантаження рівнів:", error);
      alert("Не вдалося завантажити дані гри.");
    });
}

function startLevel(index) {
  currentLevel = index;

  initialBoard = levels[index].grid.map((row) => [...row]);
  board = levels[index].grid.map((row) => [...row]);

  moves = 0;
  seconds = 0;
  gameFinished = false;
  lastClickRow = -1;
  lastClickCol = -1;

  startTimer();
  renderBoard();
  updateInfo();
}

function handleNewGame() {
  if (levels.length === 0) return;

  let nextIndex = currentLevel;

  if (levels.length > 1) {
    while (nextIndex === currentLevel) {
      nextIndex = Math.floor(Math.random() * levels.length);
    }
  }

  startLevel(nextIndex);
}
function handleRestart() {
  if (initialBoard.length === 0) return;

  board = initialBoard.map((row) => [...row]);
  moves = 0;
  seconds = 0;
  gameFinished = false;
  lastClickRow = -1;
  lastClickCol = -1;

  startTimer();
  renderBoard();
  updateInfo();
}

function startTimer() {
  stopTimer();

  timerId = setInterval(() => {
    seconds++;
    updateInfo();
  }, 1000);
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function toggleCell(r, c) {
  const directions = [
    [0, 0],
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const rowCount = board.length;
  const colCount = board[0].length;

  for (const [dr, dc] of directions) {
    const nr = r + dr;
    const nc = c + dc;

    if (nr >= 0 && nr < rowCount && nc >= 0 && nc < colCount) {
      board[nr][nc] = board[nr][nc] === 1 ? 0 : 1;
    }
  }
}

function handleCellClick(r, c) {
  if (gameFinished) return;

  const sameCell = r === lastClickRow && c === lastClickCol;

  toggleCell(r, c);

  if (sameCell) {
    moves = Math.max(0, moves - 1);
    lastClickRow = -1;
    lastClickCol = -1;
  } else {
    moves++;
    lastClickRow = r;
    lastClickCol = c;
  }

  const win = isWin();

  renderBoard();
  updateInfo();

  if (win) {
    gameFinished = true;
    stopTimer();

    setTimeout(() => {
      alert(
        `Перемога!\nMoves: ${moves}\nTarget: ${levels[currentLevel].minMoves}\nTime: ${formatTime(seconds)}`,
      );
    }, 50);
  }
}
function isWin() {
  return board.every((row) => row.every((cell) => cell === 0));
}

function renderBoard() {
  const game = document.getElementById("game");
  game.innerHTML = "";

  game.style.gridTemplateColumns = `repeat(${board[0].length}, 42px)`;
  game.style.gridTemplateRows = `repeat(${board.length}, 42px)`;

  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      const button = document.createElement("button");
      button.className = "cell";
      button.type = "button";

      if (cell === 1) {
        button.classList.add("on");
      }

      button.addEventListener("click", () => handleCellClick(r, c));
      game.appendChild(button);
    });
  });
}

function updateInfo() {
  document.getElementById("moves").textContent = moves;
  document.getElementById("minMoves").textContent =
    levels[currentLevel].minMoves;
  document.getElementById("time").textContent = formatTime(seconds);
}

document.addEventListener("DOMContentLoaded", loadLevels);
