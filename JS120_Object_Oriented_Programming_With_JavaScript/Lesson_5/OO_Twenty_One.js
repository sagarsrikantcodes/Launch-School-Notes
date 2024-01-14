// Assignment: Twenty-One
let readline = require(`readline-sync`);

class Card {
  constructor() {
    this.SUITES = ["H", "D", "S", "C"];
    this.VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    this.ACE_VALUE = 11;
    this.DEALER_MIN_SUM = 17;
    this.FACE_VALUE = 10;
    this.GOAL_SUM = 21;
  }
}

class Deck {
  constructor() {
    this.card = new Card();
    this.cards = [];
  }

  deal() {
    for (let suitIndex = 0; suitIndex < this.card.SUITES.length; suitIndex += 1) {
      let suit = this.card.SUITES[suitIndex];
      for (let valueIndex = 0; valueIndex < this.card.VALUES.length; valueIndex += 1) {
        let value = this.card.VALUES[valueIndex];
        this.cards.push([suit, value]);
      }
    }

    return this.shuttle(this.cards);
  }

  shuttle(array) {
    for (let index = array.length - 1; index > 0; index -= 1) {
      let otherIndex = Math.floor(Math.random() * (index + 1));
      [array[index], array[otherIndex]] = [array[otherIndex], array[index]];
    }

    return array;
  }
}


class Participant {
  constructor() {
    
  }

  hand(cards) {
    return cards.map(card => `${card[1]}${card[0]}`).join(", ");
  }

  total(cards) {
    // cards = [['Hearts', '3'], ['Spades', 'Queen'], ....]
    let values = cards.map(card => card[1]);
    let sum = 0;
    values.forEach(value => {
      if (value === 'A') {
        sum += (new Card()).ACE_VALUE;
      } else if (['J', 'Q', 'K'].includes(value)) {
        sum += (new Card()).FACE_VALUE;
      } else {
        sum += Number(value);
      }
    });

    // correct for Aces
    values.filter(value => value === 'A').forEach(_ => {
      if (sum > (new Card()).GOAL_SUM) sum -= 10;
    });

    return sum;
  }

  isBusted(cards) {
    return this.total(cards) > (new Card()).GOAL_SUM;
  }
}

class Player extends Participant {
  static accountBalance = 5;
  constructor() {
    super();
    this.cards = [];
  }

  score() {
    //STUB
    return this.total(this.cards);
  }

  getBalance() {
    return Player.accountBalance;
  }
}

class Dealer extends Participant {
  constructor() {
    super();
    this.cards = [];
  }

  score() {
    return this.total(this.cards);
  }

  reveal() {
    console.log(`Dealer has ${this.hand([this.cards[0]])} and ?`);
  }
}

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }

  start() {
    this.displayWelcomeMessage(); 
    while(true) {
      this.dealCards(); 
      this.showCards(); 
      this.playerTurn(this.player.cards, this.deck.cards); 
      if (this.quitGame()) break;
      if (this.player.isBusted(this.player.cards)) {
        this.logFinalScore(this.dealer.cards, this.player.cards); 
        this.displayResult(this.dealer.cards, this.player.cards); 
        this.displayAccountBalance();
        break;
      }

      this.dealerTurn(this.dealer.cards, this.deck.cards); 
      if (this.quitGame()) break;
      if (this.dealer.isBusted(this.dealer.cards)) {
        this.logFinalScore(this.dealer.cards, this.player.cards); 
        this.displayResult(this.dealer.cards, this.player.cards); 
        this.displayAccountBalance();
        break;
      }
      this.logFinalScore(this.dealer.cards, this.player.cards); 
      this.displayResult(this.dealer.cards, this.player.cards); 
      this.displayAccountBalance();
      if (!this.playAgain()) break;
      console.clear();
    }
    this.displayGoodbyeMessage(); 
  }

  playAgain() {
    let answer;
    while(true) {
      console.log("------------");
      console.log("Do you want to play again? (y or n)");
      answer = readline.question();
      if (['y', 'n'].includes(answer)) {
        break;
      }
      console.log("Sorry, that's not a valid choice. Please enter 'y' or 'n' only.");
      console.log("");
    }
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
    return answer === 'y';
  }

  dealCards() {
    let deck = this.deck.deal();
    this.player.cards.push(...this.popTwoFromDeck(deck));
    this.dealer.cards.push(...this.popTwoFromDeck(deck));
  }

  showCards() {
    this.dealer.reveal();
    console.log(`You have: ${this.player.hand(this.player.cards)}, for a total of ${this.player.score()}`);
  }

  playerTurn(playerCards, deck) {
    while(true) {
      let playerTurn;
      while(true) {
        console.log("Would you like to (h)it or (s)tay?");
        playerTurn = readline.question().toLowerCase();
        if (['h', 's'].includes(playerTurn)) break;
        console.log("Sorry, must enter 'h' or 's'.");
      }

      if (playerTurn === 'h') {
        playerCards.push(deck.pop());
        console.clear();
        console.log("You chose to hit!");
        console.log(`Your cards: ${this.player.hand(playerCards)}.`);
        console.log(`Your total: ${this.player.score()}.`);
      }

      if (playerTurn === 's' || this.player.isBusted(this.player.cards)) break;
    }
  }

  dealerTurn(dealerCards, deck) {
    while(this.dealer.score() < (new Card()).DEALER_MIN_SUM) {
      console.log(`Dealer hits!`);
      dealerCards.push(deck.pop());
      console.log(`Dealer's cards: ${this.dealer.hand(dealerCards)}`);
    }
  }

  popTwoFromDeck(deck) {
    return[deck.pop(), deck.pop()];
  }

  detectResult(dealerCards, playerCards) {
    let playerTotal = this.player.score();
    let dealerTotal = this.dealer.score();

    if (playerTotal > (new Card()).GOAL_SUM) {
      return "PLAYER_BUSTED";
    } else if (dealerTotal > (new Card()).GOAL_SUM) {
      return "DEALER_BUSTED";
    } else if (dealerTotal < playerTotal) {
      return "PLAYER";
    } else if (dealerTotal > playerTotal) {
      return "DEALER";
    } else {
      return "TIE";
    }
  }

  displayResult(dealerCards, playerCards) {
    let result = this.detectResult(dealerCards, playerCards);

    switch(result) {
      case "PLAYER_BUSTED":
        console.log("You busted! Dealer wins!");
        Player.accountBalance -= 1;
        break;
      case "DEALER_BUSTED":
        console.log("Dealer busted! You win!");
        Player.accountBalance += 1;
        break;
      case "PLAYER":
        console.log("You win!");
        Player.accountBalance += 1;
        break;
      case "DEALER":
        console.log("Dealer wins!");
        Player.accountBalance -= 1;
        break;
      case "TIE":
        console.log("It's a tie!");
    }
  }

  quitGame() {
    if (this.player.getBalance() === 0) {
      console.log("Sorry, you don't have money to continue the game!");
    }

    if (this.player.getBalance() === 10) {
      console.log("Congratulations, you are rich.")
    }

    return this.player.getBalance() === 0 || this.player.getBalance() === 10;
  }

  displayAccountBalance() {
    console.log(`Your account balance is ${this.player.getBalance()}`);
  }

  logFinalScore(dealerCards, playerCards) {
    console.log("=================");
    console.log(`Dealer has ${this.dealer.hand(dealerCards)}, for a total of: ${this.dealer.score()}`);
    console.log(`Player has ${this.player.hand(playerCards)}, for a total of: ${this.player.score()}`);
    console.log("=================");
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Twenty-One!");
  }

  displayGoodbyeMessage() {
    console.log("--------------");
    console.log("We hope to see you again soon!");
  }

}

let game = new TwentyOneGame();
game.start();










