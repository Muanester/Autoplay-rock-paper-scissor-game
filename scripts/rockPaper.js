let score = JSON.parse(localStorage.getItem ('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
      intervalId = setInterval(function() {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 2000);
      isAutoPlaying = true;


  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }

  
  
}


// Adding Event Listeners
document.querySelector('.js-rock').addEventListener('click', ()=> {
    playGame('rock');
    displayParagraph();
});

document.querySelector('.js-paper').addEventListener('click', ()=> {
    playGame('paper');
    displayParagraph();
});

document.querySelector('.js-scissors').addEventListener('click', ()=> {
    playGame('scissors');
    displayParagraph();
});

document.querySelector('.js-reset').addEventListener('click', ()=> {
    resetScoreConfirm();
});

document.querySelector('.js-autoplay').addEventListener('click', ()=> {
    autoPlay();
    stopAuto();
});



document.body.addEventListener('keydown', (event)=> {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    }
});


function stopAuto() {
    const auto = document.querySelector('.js-autoplay');
    const isAuto = auto.innerText;

    if (isAuto === 'Auto Play' && isAutoPlaying) {
        auto.innerText = 'Stop Autoplay';
    } else {
        auto.innerText = 'Auto Play';
    }
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
        result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    }
    else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
        result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }
    }
    else if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
        result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }
    }

    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));


    updateScoreElement();    
    
    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You: ${playerMove}. - ${computerMove} :Computer`;

    if (targetParagraph.style.display = 'none') {
        targetParagraph.style.display = 'block';
        targetParagraph2.style.display = 'block';
    }

    resetConfirm.style.display = 'none';
    
}

const targetParagraph = document.querySelector('.js-result');
const targetParagraph2 = document.querySelector('.js-moves');
const resetConfirm = document.querySelector('.js-reset-confirm');
// let isResetDisplayed = false;
// if (!isResetDisplayed) {
//     resetConfirm.style.display = 'block';
// }

function hideParagraph() {
    targetParagraph.style.display = 'none';
    targetParagraph2.style.display = 'none';
    resetConfirm.style.display = 'none';
}

function displayParagraph() {
    targetParagraph.style.display = 'block';
    targetParagraph2.style.display = 'block';
}

function resetScoreConfirm() {
    document.querySelector('.js-reset-confirm').innerHTML = `
    <span>Confirm Reset?</span>
    <button class="js-yes-btn">Yes</button>
    <button class="js-no-btn">No</button>
    `;

    document.querySelector('.js-yes-btn').addEventListener('click', ()=> {
        yesReset();
    });
    
    document.querySelector('.js-no-btn').addEventListener('click', ()=> {
        noReset();
    });

    if (resetConfirm.style.display = 'none') {
        resetConfirm.style.display = 'block';
    } else {
        resetConfirm.style.display = 'none'
    }

    clearInterval(intervalId);
    isAutoPlaying = false;

    stopAuto();
    
}

function yesReset() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    hideParagraph();
}

function noReset() {
    resetConfirm.style.display = 'none';
}


function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';
    
    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}