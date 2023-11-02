const firstFirstCell = document.querySelector(".js-first-first");
const firstSecondCell = document.querySelector(".js-first-second");
const firstThirdCell = document.querySelector(".js-first-third");
const firstFourthCell = document.querySelector(".js-first-fourth");
const secondFirstCell = document.querySelector(".js-second-first");
const secondSecondCell = document.querySelector(".js-second-second");
const secondThirdCell = document.querySelector(".js-second-third");
const secondFourthCell = document.querySelector(".js-second-fourth");
const thirdFirstCell = document.querySelector(".js-third-first");
const thirdSecondCell = document.querySelector(".js-third-second");
const thirdThirdCell = document.querySelector(".js-third-third");
const thirdFourthCell = document.querySelector(".js-third-fourth");
const fourthFirstCell = document.querySelector(".js-fourth-first");
const fourthSecondCell = document.querySelector(".js-fourth-second");
const fourthThirdCell = document.querySelector(".js-fourth-third");
const fourthFourthCell = document.querySelector(".js-fourth-fourth");

const topBtn = document.querySelector(".js-top-btn");
const leftBtn = document.querySelector(".js-left-btn");
const rigthBtn = document.querySelector(".js-rigth-btn");
const bottomBtn = document.querySelector(".js-bottom-btn");

const tolatScoreElem = document.querySelector(".js-score-points");
const bestScoreElem = document.querySelector(".js-best-score-points");

const newGameBtn = document.querySelector('.js-new-game-btn');

const winLoseModal = document.querySelector(".js-win-lose-modal");
const closeWinLoseModalBtn = document.querySelector(".js-win-lose-modal-close");
const winLoseTextElem = document.querySelector(".js-win-lose-text");
const winLoseScorePointsElem = document.querySelector('.js-win-lose-score-points');
const winLoseBestScorePointsElem = document.querySelector('.js-win-lose-best-score-points');

let totalScore = 0;
let bestScore = getBestScore();
let gameMatrix = [
    [
        {point: 0, elem: firstFirstCell}, 
        {point: 0, elem: firstSecondCell}, 
        {point: 0, elem: firstThirdCell},
        {point: 0, elem: firstFourthCell}
    ],
    [
        {point: 0, elem: secondFirstCell}, 
        {point: 0, elem: secondSecondCell}, 
        {point: 0, elem: secondThirdCell},
        {point: 0, elem: secondFourthCell}
    ],
    [
        {point: 0, elem: thirdFirstCell}, 
        {point: 0, elem: thirdSecondCell}, 
        {point: 0, elem: thirdThirdCell},
        {point: 0, elem: thirdFourthCell}
    ],
    [
        {point: 0, elem: fourthFirstCell}, 
        {point: 0, elem: fourthSecondCell}, 
        {point: 0, elem: fourthThirdCell},
        {point: 0, elem: fourthFourthCell}
    ]
];;

closeWinLoseModalBtn.addEventListener("click", toggleWinLoseModal);

function toggleWinLoseModal() {
    winLoseModal.classList.toggle("is-hidden");
}

newGameBtn.addEventListener('click', newGame);

newGame();

function newGame() {
    totalScore = 0;
    tolatScoreElem.textContent = totalScore;
    bestScore = getBestScore();
    bestScoreElem.textContent = bestScore;

    for (let i = 0; i < gameMatrix.length; i++) {
        for(let j = 0; j < gameMatrix[i].length; j++) {
            gameMatrix[i][j].point = 0;
            gameMatrix[i][j].elem.firstElementChild.textContent = '';
        }
    }
    
    createNewNumber();
    addColours();
    disabledEnableLeftButton();
    disabledEnableRigthButton();
    disabledEnableTopButton();
    disabledEnableBottomButton();
    updateFontSize();
}

function getBestScore() {
    const bestScore = localStorage.getItem('best-score');
    if(bestScore === undefined) {
        return 0;
    } else {
        return bestScore;
    }
}

function updateBestScore() {
    if(bestScore <= totalScore) {
        bestScore = totalScore;
        bestScoreElem.textContent = bestScore;
        localStorage.setItem('best-score', bestScore);
    }
}

function checkForGame() {
    if(!isTopPossible() && !isLeftPossible() && !isRightPossible() && !isBottomPossible()) {
        let isWin = false;
        for (let i = 0; i < gameMatrix.length; i++) {
            for(let j = 0; j < gameMatrix[i].length; j++) {
                if (gameMatrix[i][j].point >= 2048) {
                    isWin = true;
                    break;
                }
            }
        }
        if(isWin) {
            winLoseTextElem.textContent = 'You won';
            winLoseTextElem.style.color = 'green';
        } else {
            winLoseTextElem.textContent = 'You lost';
            winLoseTextElem.style.color = 'red';
        
        }
        winLoseScorePointsElem.textContent = totalScore;
        winLoseBestScorePointsElem.textContent = bestScore;
        toggleWinLoseModal();
    } 
}

function createNewNumber() {
    let rowNumber = Math.floor(Math.random() * gameMatrix.length);
    let columnNumber = Math.floor(Math.random() * gameMatrix.length);

    if (gameMatrix[rowNumber][columnNumber].point == 0) {
        gameMatrix[rowNumber][columnNumber].elem.firstElementChild.textContent = 2
        gameMatrix[rowNumber][columnNumber].point = 2;
    } else {
        createNewNumber()
    }
}

function moveLeft() {
    for (let i = 0; i < gameMatrix.length; i++) {
        for(let j = 0; j < 3; j++) {
            if (gameMatrix[i][0].point === 0 && gameMatrix[i][1].point !== 0) {
                gameMatrix[i][0].point = gameMatrix[i][1].point;
                gameMatrix[i][0].elem.firstElementChild.textContent = gameMatrix[i][0].point;

                gameMatrix[i][1].point = 0;
                gameMatrix[i][1].elem.firstElementChild.textContent 
                    = gameMatrix[i][1].point === 0 ? '': gameMatrix[i][1].point;
            }
            if (gameMatrix[i][1].point === 0 && gameMatrix[i][2].point !== 0) {
                gameMatrix[i][1].point = gameMatrix[i][2].point;
                gameMatrix[i][1].elem.firstElementChild.textContent = gameMatrix[i][1].point

                gameMatrix[i][2].point = 0;
                gameMatrix[i][2].elem.firstElementChild.textContent 
                    = gameMatrix[i][2].point === 0 ? '': gameMatrix[i][2].point;
            }
            if (gameMatrix[i][2].point === 0 && gameMatrix[i][3].point !== 0) {
                gameMatrix[i][2].point = gameMatrix[i][3].point;
                gameMatrix[i][2].elem.firstElementChild.textContent = gameMatrix[i][3].point;

                gameMatrix[i][3].point = 0;
                gameMatrix[i][3].elem.firstElementChild.textContent = '';
            }
        }

        if(gameMatrix[i][0].point != 0 && gameMatrix[i][0].point === gameMatrix[i][1].point) {
            gameMatrix[i][0].point += gameMatrix[i][1].point;
            gameMatrix[i][0].elem.firstElementChild.textContent = gameMatrix[i][0].point;

            totalScore += gameMatrix[i][0].point;
            tolatScoreElem.textContent = totalScore;

            gameMatrix[i][1].point = 0;
            gameMatrix[i][1].elem.firstElementChild.textContent = '';
        }
        if(gameMatrix[i][1].point != 0 && gameMatrix[i][1].point === gameMatrix[i][2].point) {
            gameMatrix[i][1].point += gameMatrix[i][2].point;
            gameMatrix[i][1].elem.firstElementChild.textContent = gameMatrix[i][1].point;

            totalScore += gameMatrix[i][1].point;
            tolatScoreElem.textContent = totalScore;

            gameMatrix[i][2].point = 0;
            gameMatrix[i][2].elem.firstElementChild.textContent = '';
        }
        if(gameMatrix[i][2].point != 0 && gameMatrix[i][2].point === gameMatrix[i][3].point) {
            gameMatrix[i][2].point += gameMatrix[i][3].point;
            gameMatrix[i][2].elem.firstElementChild.textContent = gameMatrix[i][2].point;

            totalScore += gameMatrix[i][2].point;
            tolatScoreElem.textContent = totalScore;

            gameMatrix[i][3].point = 0;
            gameMatrix[i][3].elem.firstElementChild.textContent = '';
        }

        for(let j = 0; j < 3; j++) {
            if (gameMatrix[i][0].point === 0 && gameMatrix[i][1].point !== 0) {
                gameMatrix[i][0].point = gameMatrix[i][1].point;
                gameMatrix[i][0].elem.firstElementChild.textContent = gameMatrix[i][0].point;

                gameMatrix[i][1].point = 0;
                gameMatrix[i][1].elem.firstElementChild.textContent 
                    = gameMatrix[i][1].point === 0 ? '': gameMatrix[i][1].point;
            }
            if (gameMatrix[i][1].point === 0 && gameMatrix[i][2].point !== 0) {
                gameMatrix[i][1].point = gameMatrix[i][2].point;
                gameMatrix[i][1].elem.firstElementChild.textContent = gameMatrix[i][1].point

                gameMatrix[i][2].point = 0;
                gameMatrix[i][2].elem.firstElementChild.textContent 
                    = gameMatrix[i][2].point === 0 ? '': gameMatrix[i][2].point;
            }
            if (gameMatrix[i][2].point === 0 && gameMatrix[i][3].point !== 0) {
                gameMatrix[i][2].point = gameMatrix[i][3].point;
                gameMatrix[i][2].elem.firstElementChild.textContent = gameMatrix[i][3].point;

                gameMatrix[i][3].point = 0;
                gameMatrix[i][3].elem.firstElementChild.textContent = '';
            }
        }
    }
}

function moveRight() {
    for (let i = 0; i < gameMatrix.length; i++) {
        for(let j = 0; j < 3; j++) {
            if (gameMatrix[i][3].point === 0 && gameMatrix[i][2].point !== 0) {
                gameMatrix[i][3].point = gameMatrix[i][2].point;
                gameMatrix[i][3].elem.firstElementChild.textContent = gameMatrix[i][3].point;

                gameMatrix[i][2].point = 0;
                gameMatrix[i][2].elem.firstElementChild.textContent 
                    = gameMatrix[i][2].point === 0 ? '': gameMatrix[i][2].point;
            }
            if (gameMatrix[i][2].point === 0 && gameMatrix[i][1].point !== 0) {
                gameMatrix[i][2].point = gameMatrix[i][1].point;
                gameMatrix[i][2].elem.firstElementChild.textContent = gameMatrix[i][2].point

                gameMatrix[i][1].point = 0;
                gameMatrix[i][1].elem.firstElementChild.textContent 
                    = gameMatrix[i][1].point === 0 ? '': gameMatrix[i][1].point;
            }
            if (gameMatrix[i][1].point === 0 && gameMatrix[i][0].point !== 0) {
                gameMatrix[i][1].point = gameMatrix[i][0].point;
                gameMatrix[i][1].elem.firstElementChild.textContent = gameMatrix[i][0].point;

                gameMatrix[i][0].point = 0;
                gameMatrix[i][0].elem.firstElementChild.textContent = '';
            }
        }

        if(gameMatrix[i][3].point != 0 && gameMatrix[i][3].point === gameMatrix[i][2].point) {
            gameMatrix[i][3].point += gameMatrix[i][2].point;
            gameMatrix[i][3].elem.firstElementChild.textContent = gameMatrix[i][3].point;

            totalScore += gameMatrix[i][3].point;
            tolatScoreElem.textContent = totalScore;

            gameMatrix[i][2].point = 0;
            gameMatrix[i][2].elem.firstElementChild.textContent = '';
        }
        if(gameMatrix[i][2].point != 0 && gameMatrix[i][2].point === gameMatrix[i][1].point) {
            gameMatrix[i][2].point += gameMatrix[i][1].point;
            gameMatrix[i][2].elem.firstElementChild.textContent = gameMatrix[i][2].point;

            totalScore += gameMatrix[i][2].point;
            tolatScoreElem.textContent = totalScore;

            gameMatrix[i][1].point = 0;
            gameMatrix[i][1].elem.firstElementChild.textContent = '';
        }
        if(gameMatrix[i][1].point != 0 && gameMatrix[i][1].point === gameMatrix[i][0].point) {
            gameMatrix[i][1].point += gameMatrix[i][0].point;
            gameMatrix[i][1].elem.firstElementChild.textContent = gameMatrix[i][1].point;

            totalScore += gameMatrix[i][1].point;
            tolatScoreElem.textContent = totalScore;

            gameMatrix[i][0].point = 0;
            gameMatrix[i][0].elem.firstElementChild.textContent = '';
        }

        for(let j = 0; j < 3; j++) {
            if (gameMatrix[i][3].point === 0 && gameMatrix[i][2].point !== 0) {
                gameMatrix[i][3].point = gameMatrix[i][2].point;
                gameMatrix[i][3].elem.firstElementChild.textContent = gameMatrix[i][3].point;

                gameMatrix[i][2].point = 0;
                gameMatrix[i][2].elem.firstElementChild.textContent 
                    = gameMatrix[i][2].point === 0 ? '': gameMatrix[i][2].point;
            }
            if (gameMatrix[i][2].point === 0 && gameMatrix[i][1].point !== 0) {
                gameMatrix[i][2].point = gameMatrix[i][1].point;
                gameMatrix[i][2].elem.firstElementChild.textContent = gameMatrix[i][2].point

                gameMatrix[i][1].point = 0;
                gameMatrix[i][1].elem.firstElementChild.textContent 
                    = gameMatrix[i][1].point === 0 ? '': gameMatrix[i][1].point;
            }
            if (gameMatrix[i][1].point === 0 && gameMatrix[i][0].point !== 0) {
                gameMatrix[i][1].point = gameMatrix[i][0].point;
                gameMatrix[i][1].elem.firstElementChild.textContent = gameMatrix[i][0].point;

                gameMatrix[i][0].point = 0;
                gameMatrix[i][0].elem.firstElementChild.textContent = '';
            }
        }
    }
}

function moveTop() {
    for (let i = 0; i < gameMatrix.length; i++) {
        for(let j = 0; j < 3; j++) {
            if (gameMatrix[0][i].point === 0 && gameMatrix[1][i].point !== 0) {
                gameMatrix[0][i].point = gameMatrix[1][i].point;
                gameMatrix[0][i].elem.firstElementChild.textContent = gameMatrix[0][i].point;

                gameMatrix[1][i].point = 0;
                gameMatrix[1][i].elem.firstElementChild.textContent 
                    = gameMatrix[1][i].point === 0 ? '': gameMatrix[1][i].point;
            }
            if (gameMatrix[1][i].point === 0 && gameMatrix[2][i].point !== 0) {
                gameMatrix[1][i].point = gameMatrix[2][i].point;
                gameMatrix[1][i].elem.firstElementChild.textContent = gameMatrix[1][i].point

                gameMatrix[2][i].point = 0;
                gameMatrix[2][i].elem.firstElementChild.textContent 
                    = gameMatrix[2][i].point === 0 ? '': gameMatrix[2][i].point;
            }
            if (gameMatrix[2][i].point === 0 && gameMatrix[3][i].point !== 0) {
                gameMatrix[2][i].point = gameMatrix[3][i].point;
                gameMatrix[2][i].elem.firstElementChild.textContent = gameMatrix[3][i].point;

                gameMatrix[3][i].point = 0;
                gameMatrix[3][i].elem.firstElementChild.textContent = '';
            }
        }

        if(gameMatrix[0][i].point != 0 && gameMatrix[0][i].point === gameMatrix[1][i].point) {
            gameMatrix[0][i].point += gameMatrix[1][i].point;
            gameMatrix[0][i].elem.firstElementChild.textContent = gameMatrix[0][i].point;

            totalScore += gameMatrix[0][i].point;
            tolatScoreElem.textContent = totalScore;

            gameMatrix[1][i].point = 0;
            gameMatrix[1][i].elem.firstElementChild.textContent = '';
        }
        if(gameMatrix[1][i].point != 0 && gameMatrix[1][i].point === gameMatrix[2][i].point) {
            gameMatrix[1][i].point += gameMatrix[2][i].point;
            gameMatrix[1][i].elem.firstElementChild.textContent = gameMatrix[1][i].point;

            totalScore += gameMatrix[1][i].point;
            tolatScoreElem.textContent = totalScore;

            gameMatrix[2][i].point = 0;
            gameMatrix[2][i].elem.firstElementChild.textContent = '';
        }
        if(gameMatrix[2][i].point != 0 && gameMatrix[2][i].point === gameMatrix[3][i].point) {
            gameMatrix[2][i].point += gameMatrix[3][i].point;
            gameMatrix[2][i].elem.firstElementChild.textContent = gameMatrix[2][i].point;

            totalScore += gameMatrix[2][i].point;
            tolatScoreElem.textContent = totalScore;

            gameMatrix[3][i].point = 0;
            gameMatrix[3][i].elem.firstElementChild.textContent = '';
        }

        for(let j = 0; j < 3; j++) {
            if (gameMatrix[0][i].point === 0 && gameMatrix[1][i].point !== 0) {
                gameMatrix[0][i].point = gameMatrix[1][i].point;
                gameMatrix[0][i].elem.firstElementChild.textContent = gameMatrix[0][i].point;

                gameMatrix[1][i].point = 0;
                gameMatrix[1][i].elem.firstElementChild.textContent 
                    = gameMatrix[1][i].point === 0 ? '': gameMatrix[1][i].point;
            }
            if (gameMatrix[1][i].point === 0 && gameMatrix[2][i].point !== 0) {
                gameMatrix[1][i].point = gameMatrix[2][i].point;
                gameMatrix[1][i].elem.firstElementChild.textContent = gameMatrix[1][i].point

                gameMatrix[2][i].point = 0;
                gameMatrix[2][i].elem.firstElementChild.textContent 
                    = gameMatrix[2][i].point === 0 ? '': gameMatrix[2][i].point;
            }
            if (gameMatrix[2][i].point === 0 && gameMatrix[3][i].point !== 0) {
                gameMatrix[2][i].point = gameMatrix[3][i].point;
                gameMatrix[2][i].elem.firstElementChild.textContent = gameMatrix[3][i].point;

                gameMatrix[3][i].point = 0;
                gameMatrix[3][i].elem.firstElementChild.textContent = '';
            }
        }
    }
}

function moveBottom() {
    for (let i = 0; i < gameMatrix.length; i++) {
        for(let j = 0; j < 3; j++) {
            if (gameMatrix[3][i].point === 0 && gameMatrix[2][i].point !== 0) {
                gameMatrix[3][i].point = gameMatrix[2][i].point;
                gameMatrix[3][i].elem.firstElementChild.textContent = gameMatrix[3][i].point;

                gameMatrix[2][i].point = 0;
                gameMatrix[2][i].elem.firstElementChild.textContent 
                    = gameMatrix[2][i].point === 0 ? '': gameMatrix[2][i].point;
            }
            if (gameMatrix[2][i].point === 0 && gameMatrix[1][i].point !== 0) {
                gameMatrix[2][i].point = gameMatrix[1][i].point;
                gameMatrix[2][i].elem.firstElementChild.textContent = gameMatrix[2][i].point

                gameMatrix[1][i].point = 0;
                gameMatrix[1][i].elem.firstElementChild.textContent 
                    = gameMatrix[1][i].point === 0 ? '': gameMatrix[1][i].point;
            }
            if (gameMatrix[1][i].point === 0 && gameMatrix[0][i].point !== 0) {
                gameMatrix[1][i].point = gameMatrix[0][i].point;
                gameMatrix[1][i].elem.firstElementChild.textContent = gameMatrix[0][i].point;

                gameMatrix[0][i].point = 0;
                gameMatrix[0][i].elem.firstElementChild.textContent = '';
            }
        }

        if(gameMatrix[3][i].point != 0 && gameMatrix[3][i].point === gameMatrix[2][i].point) {
            gameMatrix[3][i].point += gameMatrix[2][i].point;
            gameMatrix[3][i].elem.firstElementChild.textContent = gameMatrix[3][i].point;

            totalScore += gameMatrix[3][i].point;
            tolatScoreElem.textContent = totalScore;

            gameMatrix[2][i].point = 0;
            gameMatrix[2][i].elem.firstElementChild.textContent = '';
        }
        if(gameMatrix[2][i].point != 0 && gameMatrix[2][i].point === gameMatrix[1][i].point) {
            gameMatrix[2][i].point += gameMatrix[1][i].point;
            gameMatrix[2][i].elem.firstElementChild.textContent = gameMatrix[2][i].point;

            totalScore += gameMatrix[2][i].point;
            tolatScoreElem.textContent = totalScore;

            gameMatrix[1][i].point = 0;
            gameMatrix[1][i].elem.firstElementChild.textContent = '';
        }
        if(gameMatrix[1][i].point != 0 && gameMatrix[1][i].point === gameMatrix[0][i].point) {
            gameMatrix[1][i].point += gameMatrix[0][i].point;
            gameMatrix[1][i].elem.firstElementChild.textContent = gameMatrix[1][i].point;

            totalScore += gameMatrix[1][i].point;
            tolatScoreElem.textContent = totalScore;

            gameMatrix[0][i].point = 0;
            gameMatrix[0][i].elem.firstElementChild.textContent = '';
        }

        for(let j = 0; j < 3; j++) {
            if (gameMatrix[3][i].point === 0 && gameMatrix[2][i].point !== 0) {
                gameMatrix[3][i].point = gameMatrix[2][i].point;
                gameMatrix[3][i].elem.firstElementChild.textContent = gameMatrix[3][i].point;

                gameMatrix[2][i].point = 0;
                gameMatrix[2][i].elem.firstElementChild.textContent 
                    = gameMatrix[2][i].point === 0 ? '': gameMatrix[2][i].point;
            }
            if (gameMatrix[2][i].point === 0 && gameMatrix[1][i].point !== 0) {
                gameMatrix[2][i].point = gameMatrix[1][i].point;
                gameMatrix[2][i].elem.firstElementChild.textContent = gameMatrix[2][i].point

                gameMatrix[1][i].point = 0;
                gameMatrix[1][i].elem.firstElementChild.textContent 
                    = gameMatrix[1][i].point === 0 ? '': gameMatrix[1][i].point;
            }
            if (gameMatrix[1][i].point === 0 && gameMatrix[0][i].point !== 0) {
                gameMatrix[1][i].point = gameMatrix[0][i].point;
                gameMatrix[1][i].elem.firstElementChild.textContent = gameMatrix[0][i].point;

                gameMatrix[0][i].point = 0;
                gameMatrix[0][i].elem.firstElementChild.textContent = '';
            }
        }
    }
}

function isLeftPossible() {
    let isNotLeftPossible = 0;
    for (let i = 0; i < gameMatrix.length; i++) {
        if ((gameMatrix[i][0].point > gameMatrix[i][1].point
            && gameMatrix[i][0].point > gameMatrix[i][2].point
            && gameMatrix[i][0].point > gameMatrix[i][3].point
            && gameMatrix[i][1].point > gameMatrix[i][2].point
            && gameMatrix[i][1].point > gameMatrix[i][3].point
            && gameMatrix[i][2].point > gameMatrix[i][3].point)
            ||
            (gameMatrix[i][0].point !== gameMatrix[i][1].point
                && gameMatrix[i][1].point === 0
                && gameMatrix[i][2].point === 0
                && gameMatrix[i][3].point === 0)
            ||
            (gameMatrix[i][0].point !== gameMatrix[i][1].point
                && gameMatrix[i][1].point !== gameMatrix[i][2].point
                && gameMatrix[i][2].point === 0
                && gameMatrix[i][3].point === 0
                && gameMatrix[i][0].point !== 0
            )
            ||
            (gameMatrix[i][0].point !== gameMatrix[i][1].point && gameMatrix[i][0].point !== 0
            && gameMatrix[i][1].point !== gameMatrix[i][2].point && gameMatrix[i][1].point !== 0
            && gameMatrix[i][2].point !== gameMatrix[i][3].point && gameMatrix[i][2].point !== 0)
            ||
            (gameMatrix[i][0].point === 0
            && gameMatrix[i][1].point === 0
            && gameMatrix[i][2].point === 0
            && gameMatrix[i][3].point === 0)
            ) {
            isNotLeftPossible++;
        }
    }
    return !(isNotLeftPossible === 4);
}

function isRightPossible() {
    let isNotLeftPossible = 0;
    for (let i = 0; i < gameMatrix.length; i++) {
        if ((gameMatrix[i][0].point < gameMatrix[i][1].point
            && gameMatrix[i][0].point < gameMatrix[i][2].point
            && gameMatrix[i][0].point < gameMatrix[i][3].point
            && gameMatrix[i][1].point < gameMatrix[i][2].point
            && gameMatrix[i][1].point < gameMatrix[i][3].point
            && gameMatrix[i][2].point < gameMatrix[i][3].point)
            ||
            (gameMatrix[i][3].point !== gameMatrix[i][2].point
                && gameMatrix[i][2].point === 0
                && gameMatrix[i][1].point === 0
                && gameMatrix[i][0].point === 0)
            ||
            (gameMatrix[i][3].point !== gameMatrix[i][2].point
                && gameMatrix[i][2].point !== gameMatrix[i][1].point
                && gameMatrix[i][1].point === 0
                && gameMatrix[i][0].point === 0
                && gameMatrix[i][3].point !== 0
            )
            ||
            (gameMatrix[i][3].point !== gameMatrix[i][2].point && gameMatrix[i][3].point !== 0
            && gameMatrix[i][2].point !== gameMatrix[i][1].point && gameMatrix[i][2].point !== 0
            && gameMatrix[i][1].point !== gameMatrix[i][0].point && gameMatrix[i][1].point !== 0)
            ||
            (gameMatrix[i][0].point === 0
            && gameMatrix[i][1].point === 0
            && gameMatrix[i][2].point === 0
            && gameMatrix[i][3].point === 0)
            ) {
            isNotLeftPossible++;
        }
    }
    return !(isNotLeftPossible === 4);
}

function isTopPossible() {
    let isNotTopPossible = 0;
    for (let i = 0; i < gameMatrix.length; i++) {
        if ((gameMatrix[0][i].point > gameMatrix[1][i].point
            && gameMatrix[0][i].point > gameMatrix[2][i].point
            && gameMatrix[0][i].point > gameMatrix[3][i].point
            && gameMatrix[1][i].point > gameMatrix[2][i].point
            && gameMatrix[1][i].point > gameMatrix[3][i].point
            && gameMatrix[2][i].point > gameMatrix[3][i].point)
            ||
            (gameMatrix[0][i].point !== gameMatrix[1][i].point
                && gameMatrix[1][i].point === 0
                && gameMatrix[2][i].point === 0
                && gameMatrix[3][i].point === 0)
            ||
            (gameMatrix[0][i].point !== gameMatrix[1][i].point
                && gameMatrix[1][i].point !== gameMatrix[2][i].point
                && gameMatrix[2][i].point === 0
                && gameMatrix[3][i].point === 0
                && gameMatrix[0][i].point !== 0)
            ||
            (gameMatrix[0][i].point !== gameMatrix[1][i].point && gameMatrix[0][i].point !== 0
            && gameMatrix[1][i].point !== gameMatrix[2][i].point && gameMatrix[1][i].point !== 0
            && gameMatrix[2][i].point !== gameMatrix[3][i].point && gameMatrix[2][i].point !== 0)
            ||
            (gameMatrix[0][i].point === 0
            && gameMatrix[1][i].point === 0
            && gameMatrix[2][i].point === 0
            && gameMatrix[3][i].point === 0)
            ) {
                isNotTopPossible++;
        }
    }
    return !(isNotTopPossible === 4);
}

function isBottomPossible() {
    let isNotBottomPossible = 0;
    for (let i = 0; i < gameMatrix.length; i++) {
        if ((gameMatrix[0][i].point < gameMatrix[1][i].point
            && gameMatrix[0][i].point < gameMatrix[2][i].point
            && gameMatrix[0][i].point < gameMatrix[3][i].point
            && gameMatrix[1][i].point < gameMatrix[2][i].point
            && gameMatrix[1][i].point < gameMatrix[3][i].point
            && gameMatrix[2][i].point < gameMatrix[3][i].point)
            ||
            (gameMatrix[3][i].point !== gameMatrix[2][i].point
                && gameMatrix[2][i].point === 0
                && gameMatrix[1][i].point === 0
                && gameMatrix[0][i].point === 0)
            ||
            (gameMatrix[3][i].point !== gameMatrix[2][i].point
                && gameMatrix[2][i].point !== gameMatrix[1][i].point
                && gameMatrix[1][i].point === 0
                && gameMatrix[0][i].point === 0
                && gameMatrix[3][i].point !== 0
            )
            ||
            (gameMatrix[3][i].point !== gameMatrix[2][i].point && gameMatrix[3][i].point !== 0
            && gameMatrix[2][i].point !== gameMatrix[1][i].point && gameMatrix[2][i].point !== 0
            && gameMatrix[1][i].point !== gameMatrix[0][i].point && gameMatrix[1][i].point !== 0)
            ||
            (gameMatrix[0][i].point === 0
            && gameMatrix[1][i].point === 0
            && gameMatrix[2][i].point === 0
            && gameMatrix[3][i].point === 0)
            ) {
            isNotBottomPossible++;
        }
    }
    return !(isNotBottomPossible === 4);
}

function disabledEnableLeftButton() {
    if(!isLeftPossible() && leftBtn.disabled === false) {
        leftBtn.disabled = true;
    } else if (isLeftPossible() && leftBtn.disabled === true) {
        leftBtn.disabled = false;
    }
}

function disabledEnableRigthButton() {
    if(!isRightPossible() && rigthBtn.disabled === false) {
        rigthBtn.disabled = true;
    } else if (isRightPossible() && rigthBtn.disabled === true) {
        rigthBtn.disabled = false;
    }
}

function disabledEnableTopButton() {
    if(!isTopPossible() && topBtn.disabled === false) {
        topBtn.disabled = true;
    } else if (isTopPossible() && topBtn.disabled === true) {
        topBtn.disabled = false;
    }
}

function disabledEnableBottomButton() {
    if(!isBottomPossible() && bottomBtn.disabled === false) {
        bottomBtn.disabled = true;
    } else if (isBottomPossible() && bottomBtn.disabled === true) {
        bottomBtn.disabled = false;
    }
}

function addColours() {
    for (let i = 0; i < gameMatrix.length; i++) {
        for (let j = 0; j < gameMatrix[i].length; j++) {
            if (gameMatrix[i][j].point == 0)
                gameMatrix[i][j].elem.firstElementChild.style.backgroundColor = '#afa192'
            else if (gameMatrix[i][j].point == 2) 
                gameMatrix[i][j].elem.firstElementChild.style.backgroundColor = '#eee4da'
            else if (gameMatrix[i][j].point == 4) 
                gameMatrix[i][j].elem.firstElementChild.style.backgroundColor = '#ede0c8' 
            else if (gameMatrix[i][j].point == 8) 
                gameMatrix[i][j].elem.firstElementChild.style.backgroundColor = '#f2b179' 
            else if (gameMatrix[i][j].point == 16) 
                gameMatrix[i][j].elem.firstElementChild.style.backgroundColor = '#ffcea4' 
            else if (gameMatrix[i][j].point == 32) 
                gameMatrix[i][j].elem.firstElementChild.style.backgroundColor = '#e8c064' 
            else if (gameMatrix[i][j].point == 64) 
                gameMatrix[i][j].elem.firstElementChild.style.backgroundColor = '#ffab6e' 
            else if (gameMatrix[i][j].point == 128) 
                gameMatrix[i][j].elem.firstElementChild.style.backgroundColor = '#fd9982' 
            else if (gameMatrix[i][j].point == 256) 
                gameMatrix[i][j].elem.firstElementChild.style.backgroundColor = '#ead79c' 
            else if (gameMatrix[i][j].point == 512) 
                gameMatrix[i][j].elem.firstElementChild.style.backgroundColor = '#76daff' 
            else if (gameMatrix[i][j].point == 1024) 
                gameMatrix[i][j].elem.firstElementChild.style.backgroundColor = '#beeaa5' 
            else if (gameMatrix[i][j].point == 2048) 
                gameMatrix[i][j].elem.firstElementChild.style.backgroundColor = '#d7d4f0' 
        }
    }
}

function updateFontSize() {
    for (let i = 0; i < gameMatrix.length; i++) {
        for (let j = 0; j < gameMatrix[i].length; j++) {
            if(gameMatrix[i][j].point < 100) {
                gameMatrix[i][j].elem.firstElementChild.style.fontSize = '48px';
            } else if (gameMatrix[i][j].point < 1000) {
                gameMatrix[i][j].elem.firstElementChild.style.fontSize = '32px';
            } else {
                gameMatrix[i][j].elem.firstElementChild.style.fontSize = '24px';
            }
        }
    }
}

leftBtn.addEventListener('click', () => {
    moveLeft();
    createNewNumber();
    addColours();
    updateFontSize();
    disabledEnableLeftButton();
    disabledEnableRigthButton();
    disabledEnableTopButton();
    disabledEnableBottomButton();
    checkForGame();
    updateBestScore();
});
rigthBtn.addEventListener('click', () => {
    moveRight();
    createNewNumber();
    addColours();
    updateFontSize();
    disabledEnableLeftButton();
    disabledEnableRigthButton();
    disabledEnableTopButton();
    disabledEnableBottomButton();
    checkForGame();
    updateBestScore();
});
topBtn.addEventListener('click', () => {
    moveTop();
    createNewNumber();
    addColours();
    updateFontSize();
    disabledEnableLeftButton();
    disabledEnableRigthButton();
    disabledEnableTopButton();
    disabledEnableBottomButton();
    checkForGame();
    updateBestScore();
});
bottomBtn.addEventListener('click', () => {
    moveBottom();
    createNewNumber();
    addColours();
    updateFontSize();
    disabledEnableLeftButton();
    disabledEnableRigthButton();
    disabledEnableTopButton();
    disabledEnableBottomButton();
    checkForGame();
    updateBestScore();
});


function control(e) {
    if(e.keyCode === 37) {
        if(isLeftPossible()) {
            moveLeft();
            createNewNumber();
            addColours();
            updateFontSize();
            disabledEnableLeftButton();
            disabledEnableRigthButton();
            disabledEnableTopButton();
            disabledEnableBottomButton();
            checkForGame();
            updateBestScore();
        }
    } else if (e.keyCode === 38) {
        if(isTopPossible()) {
            moveTop();
            createNewNumber();
            addColours();
            updateFontSize();
            disabledEnableLeftButton();
            disabledEnableRigthButton();
            disabledEnableTopButton();
            disabledEnableBottomButton();
            checkForGame();
            updateBestScore();
        }
    } else if (e.keyCode === 39) {
        if(isRightPossible()) {
            moveRight();
            createNewNumber();
            addColours();
            updateFontSize();
            disabledEnableLeftButton();
            disabledEnableRigthButton();
            disabledEnableTopButton();
            disabledEnableBottomButton();
            checkForGame();
            updateBestScore();
        }
    } else if (e.keyCode === 40) {
        if(isBottomPossible()) {
            moveBottom();
            createNewNumber();
            addColours();
            updateFontSize();
            disabledEnableLeftButton();
            disabledEnableRigthButton();
            disabledEnableTopButton();
            disabledEnableBottomButton();
            checkForGame();
            updateBestScore();
        }
    }
}

document.addEventListener('keyup', control)
