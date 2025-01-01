const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");
let cards = [];
let flippedCards = [];
let matchedCards = 0;
const totalCards = 16;

const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];

function createBoard() {
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = 0;
  const shuffledCards = shuffle([...cardValues, ...cardValues]);

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
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function flipCard(card) {
  if (flippedCards.length === 2 || card.classList.contains("flip")) return;

  card.classList.add("flip");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  const card1Value = card1.querySelector(".back").innerText;
  const card2Value = card2.querySelector(".back").innerText;

  if (card1Value === card2Value) {
    matchedCards++;
    flippedCards = [];
    if (matchedCards === totalCards / 2) {
      setTimeout(() => alert("You win!"), 500);
    }
  } else {
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

createBoard();
