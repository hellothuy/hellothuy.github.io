var cards = [
  {
    rank: "queen",
    suit: "hearts",
    cardImage: "images/queen-of-hearts.png"
  },
  {
    rank: "queen",
    suit: "diamonds",
    cardImage: "images/queen-of-diamonds.png"
  },
  {
    rank: "king",
    suit: "hearts",
    cardImage: "images/king-of-hearts.png"
  },
  {
    rank: "king",
    suit: "diamonds",
    cardImage: "images/king-of-diamonds.png"
  }
];

var cardsInPlay = [];

var resetGame = function() {
  cardsInPlay = [];
  var gameBoard = document.getElementById('game-board');
  var cardElements = gameBoard.getElementsByTagName('img');
  for (var i = 0; i < cardElements.length; i++) {
    cardElements[i].setAttribute('src', 'images/back.png');
  }
};

var checkForMatch = function() {
  if (cardsInPlay[0] === cardsInPlay[1]) {
    alert("You found a match!");
  } else {
    alert("Sorry, try again.");
  }
};

var flipCard = function() {
  var cardId = this.getAttribute('data-id');
  console.log("User flipped " + cards[cardId].rank);
  console.log("User flipped " + cards[cardId].cardImage);
  console.log("User flipped " + cards[cardId].suit);
  cardsInPlay.push(cards[cardId].rank);
  this.setAttribute('src', cards[cardId].cardImage);
  if (cardsInPlay.length === 2) {
    checkForMatch();
  }
};

var createBoard = function() {
  var gameBoard = document.getElementById('game-board');
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement('img');
    cardElement.setAttribute('src', 'images/back.png');
    cardElement.setAttribute('data-id', i);
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  }
  var resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', resetGame);
};

createBoard();
