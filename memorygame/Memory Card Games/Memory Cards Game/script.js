// Memory Card Game Logic

const cards = [
    { name: 'card1', img: 'images/img-1.png' },
    { name: 'card2', img: 'images/img-2.png' },
    { name: 'card3', img: 'images/img-3.png' },
    { name: 'card4', img: 'images/img-4.png' },
    { name: 'card5', img: 'images/img-5.png' },
    { name: 'card6', img: 'images/img-6.png' },
    { name: 'card1', img: 'images/img-1.png' },
    { name: 'card2', img: 'images/img-2.png' },
    { name: 'card3', img: 'images/img-3.png' },
    { name: 'card4', img: 'images/img-4.png' },
    { name: 'card5', img: 'images/img-5.png' },
    { name: 'card6', img: 'images/img-6.png' }
];

let flippedCards = [];
let matchedCards = [];
let timer;
let timeLeft = 50; // Initial time in seconds
let flipCount = 0;

// Shuffle the cards using Fisher-Yates Algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize the Game
function initGame() {
    const shuffledCards = shuffle(cards);
    const cardDeck = document.getElementById('cardDeck');

    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('li');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-name', card.name);
        cardElement.innerHTML = `
            <div class="view front-view">
<img src="images/que_icon.svg" alt="Question Mark Icon">
            </div>
            <div class="view back-view">
                <img src="${card.img}" alt="${card.name}">
            </div>
        `;
        cardElement.addEventListener('click', flipCard);
        cardDeck.appendChild(cardElement);
    });

    startTimer();
}

// Flip the Card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flip')) {
        this.classList.add('flip');
        flippedCards.push(this);
        flipCount++;
        document.querySelector('.flips span b').textContent = flipCount;

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check for Matching Cards
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.name === card2.dataset.name;

    if (isMatch) {
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            showWinningPopup();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            flippedCards = [];
        }, 1000);
    }
}

// Start the Timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

// End the Game when Time is Up
function endGame() {
    alert('Time is up! Game Over.');
    location.reload();
}

// Show Winning Popup
function showWinningPopup() {
    clearInterval(timer);
    document.querySelector('.popup-overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}

// Start the game when the page is loaded
window.onload = initGame;
