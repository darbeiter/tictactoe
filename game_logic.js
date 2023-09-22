let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)
let gameOver = false;
let player1Name = "Player 1"
let player2Name = "Player 2"
let playedGames = 0
let player1WinCounter = 0
let player2WinCounter = 0

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
    gamesCounter()
}

function gamesCounter() {
    const gamesPlayed = document.getElementById('gamesPlayed')
    gamesPlayed.textContent = ' ' + playedGames
}

function player1Wins() {
    const player1Wins = document.getElementById('playerOneHasWon')
    player1Wins.textContent = ++player1WinCounter
}
function player2Wins() {
    const player2Wins = document.getElementById('playerTwoHasWon')
    player2Wins.textContent = ++player2WinCounter
}

function editPlayerName(playerId) {
    const playerNameElement = document.getElementById(playerId);
    const newName = prompt(`Enter a new name for ${playerNameElement.textContent}:`);
    
    if (newName !== null) {
        playerNameElement.textContent = newName;
        if (playerId === 'playerOne') {
            player1Name = newName;
        } else if (playerId === 'playerTwo') {
            player2Name = newName;
        }
    }
}


function boxClicked(e) {
    const id = e.target.id
    if (gameOver) {
        return
    }
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            playerText.innerHTML = currentPlayer === X_TEXT ? `${player1Name} has won!`  : `${player2Name} has won!`
            const WinnerIs = currentPlayer === X_TEXT ? player1Wins() : player2Wins()
            let winning_blocks = playerHasWon();

            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
            gameOver = true;
            playedGames++
            gamesCounter()
            return;
        } else if (noSpacesLeft()) {
            gameOver = true;
            playedGames++
            gamesCounter()
            return;
        }
        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
    }
}


const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function noSpacesLeft() {
    if(spaces.every(spaces => spaces !== null)) {
        return  playerText.innerHTML = 'No Spaces left !'
    }  
}

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            return [a,b,c]
        }
    }
    return false;
}

restartBtn.addEventListener('click', restart)

function restart() {
    gameOver = false
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT
}

startGame()