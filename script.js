const choices = ["batu", "gunting", "kertas"];
let userScore = 0;
let computerScore = 0;

const userScoreElement = document.getElementById("win-value");
const computerScoreElement = document.getElementById("lose-value");
const winLoseElement = document.querySelector(".winlose p");
const buttons = document.querySelectorAll(".choice");

function updateScores() {
  userScoreElement.textContent = userScore;
  computerScoreElement.textContent = computerScore;
}

function initialState() {
  userScore = 0;
  computerScore = 0;
  updateScores();
  winLoseElement.textContent = "choose your action!";

  const userChoiceImg = document.querySelector(
    ".versus .gambar:first-child img"
  );
  userChoiceImg.classList.add("hidden");

  const computerChoiceImg = document.querySelector(
    ".versus .gambar:last-child img"
  );
  computerChoiceImg.classList.add("hidden");
}

initialState();

function computerPlay() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "It's a tie!";
  } else if (
    (playerSelection === "batu" && computerSelection === "gunting") ||
    (playerSelection === "gunting" && computerSelection === "kertas") ||
    (playerSelection === "kertas" && computerSelection === "batu")
  ) {
    userScore++;
    updateScores();
    return `Kamu Menang!`;
  } else {
    computerScore++;
    updateScores();
    return `Yah... Kamu Kalah`;
  }
}

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const playerSelection = this.classList[1]; // Get the class name for the choice
    console.log(buttons);
    console.log(this.classList);
    console.log(playerSelection);

    const computerSelection = computerPlay();
    const roundResult = playRound(playerSelection, computerSelection);
    winLoseElement.textContent = roundResult;

    // Update the battle images
    const userChoiceImg = document.querySelector(
      ".versus .gambar:first-child img"
    );
    userChoiceImg.classList.remove("hidden");
    userChoiceImg.src = `./Images/${playerSelection}.png`;

    const computerChoiceImg = document.querySelector(
      ".versus .gambar:last-child img"
    );
    computerChoiceImg.classList.remove("hidden");
    computerChoiceImg.src = `./Images/${computerSelection}.png`;
  });
});

// Button Play Logic
const playButton = document.querySelector(".btn-play");
playButton.addEventListener("click", initialState);
