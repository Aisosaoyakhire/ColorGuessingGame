const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
let targetColor = "";
let score = 0;
let clickedColors = new Set();

function startGame() {
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  document.getElementById("colorBox").style.backgroundColor = targetColor;
  document.getElementById("gameStatus").textContent = "";
  document.getElementById("gameStatus").classList.remove("fade-out", "correct");
  document.getElementById("score").textContent = score;
  clickedColors.clear();
  generateColorOptions();
}

function generateColorOptions() {
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  colors.forEach((color) => {
    const button = document.createElement("div");
    button.className = "color-option";
    button.style.backgroundColor = color;
    button.setAttribute("data-testid", "colorOption");
    button.addEventListener("click", () => checkGuess(button, color));
    optionsContainer.appendChild(button);
  });
}

function checkGuess(button, color) {
  if (clickedColors.has(color)) return; // Prevent multiple clicks on the same button
  clickedColors.add(color);
  button.classList.add("disabled"); // Disable clicked button

  const gameStatus = document.getElementById("gameStatus");
  if (color === targetColor) {
    gameStatus.textContent = "Correct!👍🏻";
    gameStatus.classList.add("correct");
    score++;
    document.getElementById("score").textContent = score;
    setTimeout(startGame, 1000); // Start new round after a short delay
  } else {
    gameStatus.textContent = "Wrong! Try again.";
    gameStatus.classList.add("fade-out");
  }
}

document.getElementById("newGameButton").addEventListener("click", () => {
  score = 0; // Reset score on new game
  document.getElementById("score").textContent = score;
  startGame();
});

startGame();
