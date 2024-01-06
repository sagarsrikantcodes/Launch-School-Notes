
let readline = require(`readline-sync`);

let Square = {
  UNUSED_SQUARE: ' ',
  HUMAN_MARKER: 'X',
  COMPUTER_MARKER: 'O',

  init(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
    return this;
  },

  toString() {
    return this.marker;
  },

  setMarker(marker) {
    this.marker = marker;
  },

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  },

  getMarker() {
    return this.marker;
  },
};

let Board = {

  init() {
    for (let i = 1; i <= 9; i += 1) {
      this[String(i)] = Object.create(Square).init();
    }
    return this;
  },

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this["1"]}  |  ${this["2"]}  |  ${this["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this["4"]}  |  ${this["5"]}  |  ${this["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this["7"]}  |  ${this["8"]}  |  ${this["9"]}`);
    console.log("     |     |");
    console.log("");
  },

  markSquareAt(key, marker) {
    this[key].setMarker(marker);
  },

  isFull() {
    return this.unusedSquares().length === 0;
  },

  unusedSquares() {
    let keys = Object.keys(this);
    return keys.filter(key => this[key].isUnused());
  },

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this[key].getMarker() === player.getMarker();
    });

    return markers.length;
  },

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  },
};

let Player = {
  init(marker) {
    this.marker = marker;
    return this;
  },

  getMarker() {
    return this.marker;
  },
};

let Human = Object.create(Player).init(Square.HUMAN_MARKER);
let Computer = Object.create(Player).init(Square.COMPUTER_MARKER);


let TTTGame = {
  POSSIBLE_WINNING_ROWS : [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ],

  init() {
    this.board = Object.create(Board).init();
    this.human = Object.create(Human);
    this.computer = Object.create(Computer);
    return this;
  },

  

  play() {
    this.displayWelcomeMessage();

    this.board.display();
    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
    }

    this.board.displayWithClear();
    this.displayResults();
    this.displayGoodbyeMessage();
  },

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  },

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  },

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  },

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${validChoices.join(", ")}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  },

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  },

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  },

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  },

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  },
}

let game = Object.create(TTTGame).init();
console.log(game);
game.play();










  





