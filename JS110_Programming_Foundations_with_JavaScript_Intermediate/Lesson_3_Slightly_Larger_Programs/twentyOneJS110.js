/*
Assignment: Twenty-One

In this assignment, we'll build a game called Twenty-One. It's very similar to Blackjack but stripped down a bit. For instance, Twenty-One doesn't have splits, double-downs, and other complex plays. Those features are beyond the scope of what we want to cover.

If you've never played Blackjack before, don't worry, our Twenty-One game is easy to understand.

Rules of Twenty-One
Deck: Start with a standard 52-card deck consisting of the 4 suits (Hearts, Diamonds, Clubs, and Spades), and 13 values (2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace).

Goal: The goal of Twenty-One is to try to get as close to 21 as possible without going over. If you go over 21, it's a bust, and you lose.

Setup: The game consists of a dealer and a player. Both participants are initially dealt a hand of two cards. The player can see their 2 cards, but can only see one of the dealer's cards.

Card values: All of the card values are pretty straightforward, except for the Ace. The cards with numbers 2 through 10 are worth their face value. The Jack, Queen, and King are each worth 10. The Ace can be worth 1 or 11 depending on circumstances. Its value is determined each time a new card is drawn from the deck. For example, if the hand contains a 2, an Ace, and a 5, then the total value of the hand is 18. In this case, the Ace is worth 11 because the sum of the hand (2 + 11 + 5) doesn't exceed 21. Now, say another card is drawn, and it happens to be an Ace. Your program must determine the value of both Aces. If the sum of the hand (2 + 11 + 5 + 11) exceeds 21, then one of the Aces must be worth 1, resulting in the hand's total value being 19. What happens if another card is drawn and it also happens to be an Ace? It can get tricky if there are multiple Aces in a hand, so your program must account for that.

Card	                Value
2 - 10	            face value
Jack, Queen, King	      10
Ace	                  1 or 11

Player turn: The player always goes first, and can decide to either hit or stay. A hit means the player wants to be dealt another card. Remember, if his total exceeds 21, he will bust and lose the game. The decision to hit or stay depends on the player's cards and what the player thinks the dealer has. For example, if the dealer is showing a "10" (the other card is hidden), and the player has a "2" and a "4", then the obvious choice is for the player to hit. The player can continue to hit as many times as they want. The turn is over when the player either busts or stays. If the player busts, the game is over, and the dealer won.

Dealer turn: When the player stays, it's the dealer's turn. The dealer must follow a strict rule for determining whether to hit or stay: hit until the total is at least 17. If the dealer busts, then the player wins.

Comparing cards: When both the player and the dealer stay, it's time to compare the total value of the cards and see who has the highest value.

Implementation Steps:
Psuedocode:

1. Initialize deck.
2. Deal cards to player and dealer.
3. Player turn: hit or stay
    - repeat until bust or stay
4. Dealer turn: hit or stay
    - repeat until total >= 17
6. If dealer busts, player wins.
7. Compare cards and declare winner.

Data Structure: Use a nested array, where each array element is itself a 2-element array that represents the card's suit and the card's value. Eg, a hand that contains 2 of Hearts, Jack of Spades, and Ace of Diamonds could be represented as a nested array like this:

[['Hearts', '2'], ['Spades', 'Jack'], ['Diamonds', 'Ace'], ['Clubs', '2']]

Calculating Aces:
Aces can be worth either 1 or 11, depending on context. 

function total(cards) {
  // cards = [['Hearts', '3'], ['Spades', 'Queen'], ...]
  let values = cards.map(card => card[1]);

  let sum = 0;
  values.forEach(value => {
    if (value === 'A') {
      sum += 11;
    } else if (['Jack', 'Queen', 'King'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  // correct for Aces
  values.filter(value => value === 'A').forEach(_ => {
    if (sum > 21) sum -= 10;
  });

  return sum;
}

Player Turn:
Think about the loop that keeps asking the player to either hit or stay.
Now think about the breaking condition for that loop. When do we stop 
asking that question of the user? Pseudocode
1. Ask player to hit or stay.
2. If stay, stop asking.
3. Otherwise, go to step 1.

while(true) {
  let userChoice = readLine.question("Do you want to hit or stay? ");
  if (userChoice === 'stay') break;
}

Another condition to cause the loop to break? 
Suppose the user keeps hitting, 
and eventually busts?
That is the condition that we should check for:

while(true) {
  let userChoice = readLine.question("Do you want to hit or stay? ");
  if (userChoice === 'stay' || busted()) break;
}

if (busted()) {
// end the game ? or ask the user to play again?

} else {
// if the player didn't bust, must have stayed to get here.
  console.log("You chose to stay!");
}

Shuffle Cards

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index -= 1) {
    let otherIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]];
  }
}

Dealer Turn:
The dealer turn follows a pattern that is very similar to the player's turn.
However, the dealer's break condition occurs at the top of the "hit or stay"
loop. 

Displaying the Result:
- Perform the calculation and return the result of the game.
- Display the result
Remember to write functions that only do one thing.
*/

const readline = require(`readline-sync`);

const SUITES = ["H", "D", "S", "C"];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const ACE_VALUE = 11;
const FACE_VALUE = 10;
const GOAL_SUM = 21;
const DEALER_MIN_SUM = 17;

function prompt(message) {
  console.log(`=> ${message}`);
}

// shuffle an array
function shuffle(array) {
  for (let index = array.length - 1; index > 0; index -= 1) {
    let otherIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]];
  }
  return array;
}

// Initialize deck of cards
function initializeDeck() {
  let deck = [];

  for (let suitIndex = 0; suitIndex < SUITES.length; suitIndex += 1) {
    let suit = SUITES[suitIndex];
    for (let valueIndex = 0; valueIndex < VALUES.length; valueIndex += 1) {
      let value = VALUES[valueIndex];
      deck.push([suit, value]);
    }
  }

  return shuffle(deck);
}

function total(cards) {
  // cards = [['Hearts', '3'], ['Spades', 'Queen'], ....]
  let values = cards.map(card => card[1]);
  let sum = 0;
  values.forEach(value => {
    if (value === 'A') {
      sum += ACE_VALUE;
    } else if (['J', 'Q', 'K'].includes(value)) {
      sum += FACE_VALUE;
    } else {
      sum += Number(value);
    }
  });

    // correct for Aces
    values.filter(value => value === 'A').forEach(_ => {
      if (sum > GOAL_SUM) sum -= 10;
    });

    return sum;
}

function busted(cards) {
  return total(cards) > GOAL_SUM;
}

function hand(cards) {
  return cards.map(card => `${card[1]}${card[0]}`).join(", ");
}

function playerTurn(playerCards, deck) {
  while (true) {
    let playerTurn;
    while (true) {
      prompt("Would you like to (h)it or (s)tay?");
      playerTurn = readline.question().toLowerCase();
      if (['h', 's'].includes(playerTurn)) break;
      prompt("Sorry, must enter 'h' or 's'.");
    }

    if (playerTurn === 'h') {
      playerCards.push(deck.pop());
      console.clear();
      prompt("You chose to hit!");
      prompt(`Your cards: ${hand(playerCards)}.`);
      prompt(`Your total: ${total(playerCards)}.`);
    }

    if (playerTurn === 's' || busted(playerCards)) break;
  }
}

function dealerTurn(dealerCards, deck) {
  while(total(dealerCards) < DEALER_MIN_SUM) {
    prompt(`Dealer hits!`);
    dealerCards.push(deck.pop());
    prompt(`Dealer's cards: ${hand(dealerCards)}.`);
  }
}

function detectResult(dealerCards, playerCards) {
  let playerTotal = total(playerCards);
  let dealerTotal = total(dealerCards);

  if (playerTotal > GOAL_SUM) {
    return "PLAYER_BUSTED";
  } else if (dealerTotal > GOAL_SUM) {
    return "DEALER_BUSTED";
  } else if (dealerTotal < playerTotal) {
    return "PLAYER";
  } else if (dealerTotal > playerTotal) {
    return "DEALER";
  } else {
    return "TIE";
  }
}

function logFinalScore(dealerCards, playerCards) {
  console.log("=================");
  prompt(`Dealer has ${hand(dealerCards)}, for a total of: ${total(dealerCards)}`);
  prompt(`Player has ${hand(playerCards)}, for a total of: ${total(playerCards)}`);
  console.log("=================");
}

function displayResults(dealerCards, playerCards) {
  let result = detectResult(dealerCards, playerCards);

  switch(result) {
    case "PLAYER_BUSTED":
      prompt("You busted! Dealer wins!");
      break;
    case "DEALER_BUSTED":
      prompt("Dealer busted! You win!");
      break;
    case "PLAYER":
      prompt("You win!");
      break;
    case "DEALER":
      prompt("Dealer wins!");
      break;
    case "TIE":
      prompt("It's a tie!");
  }
}

function playAgain() {
  console.log("-------------");
  prompt("Do you want to play again? (y or n)");
  let answer = readline.question();
  return answer.toLowerCase()[0] === "y";
}

function popTwoFromDeck(deck) {
  return [deck.pop(), deck.pop()];
}

console.clear();
prompt("Welcome to Twenty-One!");

while(true) {
  // declare and initialize vars
  let deck = initializeDeck();
  let playerCards = [];
  let dealerCards = [];

  // initial deal
  playerCards.push(...popTwoFromDeck(deck));
  dealerCards.push(...popTwoFromDeck(deck));

  prompt(`Dealer has ${hand([dealerCards[0]])} and ?`);
  prompt(`You have: ${hand(playerCards)}, for a total of ${total(playerCards)}.`);

  // player turn
  playerTurn(playerCards, deck);

  if (busted(playerCards)) {
    displayResults(dealerCards, playerCards);
    if (playAgain()) {
      console.clear();
      continue;
    } else {
      break;
    }
  } else {
    console.clear();
    prompt(`You stayed at ${total(playerCards)}`);
  }

  // dealer turn 
  prompt("Dealer turn...");
  dealerTurn(dealerCards, deck);

  if (busted(playerCards)) {
    prompt(`Dealer total: ${total(dealerCards)}.`);
    displayResults(dealerCards, playerCards);
    if (playAgain()) {
      console.clear();
      continue;
    } else {
      break;
    }
  } else {
    prompt(`Dealer stays at ${total(dealerCards)}.`);
  }

  // both player and dealer stays - compare cards!
  logFinalScore(dealerCards, playerCards);
  displayResults(dealerCards, playerCards);

  if (!playAgain()) break;

  console.clear();
}

console.log("--------------");
console.log("We hope to see you again soon!");












