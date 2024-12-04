// Game variables
const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");
let cards = [];
let flippedCards = [];
let matchedCards = 0;
const totalCards = 16; // Number of cards (8 pairs)

// Card data (for simplicity, using numbers as card values)
const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];

function createBoard() {
  // Reset the game state
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = 0;
  const shuffledCards = shuffle([...cardValues, ...cardValues]);

  // Create card elements
  shuffledCards.forEach((value, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    card.innerHTML = `
            <div class="front"></div>
            <div class="back">${value}</div>
        `;
    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
    cards.push(card);
  });
}

function shuffle(array) {
  // Shuffle the cards array using the Fisher-Yates algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function flipCard(card) {
  // Prevent flipping if there are already two cards flipped or the card is already flipped
  if (flippedCards.length === 2 || card.classList.contains("flip")) return;

  // Flip the card
  card.classList.add("flip");
  flippedCards.push(card);

  // Check if we have two flipped cards
  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  const card1Value = card1.querySelector(".back").innerText;
  const card2Value = card2.querySelector(".back").innerText;

  // If the cards match
  if (card1Value === card2Value) {
    matchedCards++;
    flippedCards = []; // Reset flipped cards
    if (matchedCards === totalCards / 2) {
      setTimeout(() => alert("You win!"), 500);
    }
  } else {
    // If the cards don't match, flip them back after a short delay
    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
      flippedCards = [];
    }, 1000);
  }
}

function restartGame() {
  cards = [];
  createBoard();
}

restartBtn.addEventListener("click", restartGame);

// Initialize game
createBoard();
