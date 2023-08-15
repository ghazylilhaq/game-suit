const choices = ['batu', 'gunting', 'kertas'];
let userScore = 0;
let computerScore = 0;

const userScoreElement = document.querySelector('.win-score p');
const computerScoreElement = document.querySelector('.lose-score p');
const winLoseElement = document.querySelector('.winlose p');
const playButton = document.querySelector('.btn-play');
const battleChoices = document.querySelectorAll('.versus .choice');

playButton.addEventListener('click', resetGame);

function computerPlay() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}



function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "It's a tie!";
    } else if (
        (playerSelection === 'batu' && computerSelection === 'gunting') ||
        (playerSelection === 'gunting' && computerSelection === 'kertas') ||
        (playerSelection === 'kertas' && computerSelection === 'batu')
    ) {
        userScore++;
        userScoreElement.textContent = userScore;
        return `You win! ${playerSelection} beats ${computerSelection}.`;
    } else {
        computerScore++;
        computerScoreElement.textContent = computerScore;
        return `You lose! ${computerSelection} beats ${playerSelection}.`;
    }
}

battleChoices.forEach(choice => {
    choice.addEventListener('click', function () {
        const playerSelection = this.classList[1];
        const computerSelection = computerPlay();
        const roundResult = playRound(playerSelection, computerSelection);
        winLoseElement.textContent = roundResult;

        // Add click effect
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 100);

        // Update battle images
        const playerImage = document.querySelector('.versus .choice.' + playerSelection + ' img');
        const computerImage = document.querySelector('.versus .choice.' + computerSelection + ' img');
        playerImage.setAttribute('src', './Images/' + playerSelection + '.png');
        computerImage.setAttribute('src', './Images/' + computerSelection + '.png');
    });
});

function resetGame() {
    userScore = 0;
    computerScore = 0;
    userScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    winLoseElement.textContent = 'Choose your action!';
    battleChoices.forEach(choice => {
        const choiceImage = choice.querySelector('img');
        choiceImage.setAttribute('src', './Images/' + choice.classList[1] + '.png');
    });
}
