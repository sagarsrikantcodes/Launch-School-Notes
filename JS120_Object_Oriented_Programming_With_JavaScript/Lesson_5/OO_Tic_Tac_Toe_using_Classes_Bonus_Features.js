let readline = require("readline-sync");

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  getMarker() {
    return this.marker;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
    }
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

  displayWithClear() {
    // console.clear();
    console.log("");
    console.log("");
    this.display();
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
    this.score = 0;
  }

  getScore() {
    return this.score;
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
    this.score = 0;
  }

  getScore() {
    return this.score;
  }
}

class Anonymous extends Player {
  constructor() {
    super(Square.UNUSED_SQUARE);
    this.score = 0;
  }

  getScore() {
    return this.score;
  }
}

class Games {
  constructor() {
    this.numberOfGames = 0;
  }

  getNumberOfGames() {
    return this.numberOfGames;
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.anonymous = new Anonymous();
    this.games = new Games();
  }

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.board.display();
      while (true) {
        if (this.games.getNumberOfGames() % 2 === 0) { this.humanMoves();} else 
        {
          this.computerMoves();
        }
        this.board.display();
        if (this.gameOver()) break;
        if (this.games.getNumberOfGames() % 2 === 0) { 
            this.computerMoves();
        } else {
          this.humanMoves();
        }
        if (this.gameOver()) break;
        this.board.display();
      }
      this.board.displayWithClear();
      this.displayResults();
      if (this.human.getScore() === 3 || this.computer.getScore() === 3) {
        if (this.human.getScore() === 3) { console.log("You won the match!");
        } else {
          console.log("Sorry, Computer wins the match!");
        }
        break;
      } else if (!this.playAgain()) { 
        break; 
      }
      this.board = new Board();
      this.games.numberOfGames += 1;
    }
    this.displayGoodbyeMessage();
  }

  playAgain() {
    let answer = readline.question('\nWould you like to play again? (y/n)\n');
    return answer.toLowerCase()[0] === 'y';
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      this.human.score += 1;
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      this.computer.score += 1;
      console.log("I won! I won! Take that, human!");
    } else {
      this.anonymous.score += 1;
      console.log("A tie game. How boring.");
    }

    console.log("");
    console.log("Human    Tie   Computer");
    console.log("-----------------------");
    console.log(` ${this.human.getScore()}        ${this.anonymous.getScore()}      ${this.computer.getScore()}`);
    console.log("");
  }

  static joinOr(array, separator = undefined, word = undefined) {
    let str = ``;

    if (array.length === 1) {
      str += array[0];
    } else if (array.length === 2) {
      if (separator === undefined && word === undefined) {
        str += array.join(" or ");
      } else if (separator === undefined && word !== undefined) {
        str += array.join(` ${word} `);
      }
    } else if (separator === undefined && word === undefined) {
      str += array.slice(0, array.length - 1).join(', ') + ', or ' + array[array.length - 1];
    } else if (separator !== undefined && word === undefined) {
      str += array.slice(0, array.length - 1).join(`${separator}`)  + `${separator}or `   + array[array.length - 1];
    } else if (separator !== undefined && word !== undefined) {
      str += array.slice(0, array.length - 1).join(`${separator}`) + `${separator}${word} ` + array[array.length - 1];
    }

    return str;
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${TTTGame.joinOr(validChoices)}): `;
      choice = readline.question(prompt);
      if (validChoices.includes(choice)) break;
      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }


  computerMoves() {
    if (this.board.squares["5"].getMarker() === Square.UNUSED_SQUARE) {
      this.board.markSquareAt("5", Square.COMPUTER_MARKER);
    } else if (this.offensiveComputerMove(TTTGame.POSSIBLE_WINNING_ROWS)) {
      this.selectComputerOffensiveMove(TTTGame.POSSIBLE_WINNING_ROWS);
    } else if (this.defensiveComputerMove(TTTGame.POSSIBLE_WINNING_ROWS)) {
      this.selectComputerDefensiveMove(TTTGame.POSSIBLE_WINNING_ROWS);
    } else {
      this.randomComputerMoves();
    }
  }

  randomComputerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  defensiveComputerMove(array) {
    return this.hasTwoSquaresInARow(array);
  }

  hasTwoSquaresInARow(array) {
    return array.some(row => {
return (this.board.countMarkersFor(this.human, row) === 2) 
&& (this.board.countMarkersFor(this.anonymous, row) === 1)});
  }

  offensiveComputerMove(array) {
    return this.compHasTwoSquaresInARow(array);
  }

  compHasTwoSquaresInARow(array) {
    return array.some(row => {
      return (this.board.countMarkersFor(this.computer, row) === 2) && (this.board.countMarkersFor(this.anonymous, row) === 1)});
  }

  selectComputerDefensiveMove(array) {
    // console.log("Comp Defensive Move")
    for (let idx = 0; idx < array.length; idx += 1) {
      let row = array[idx];
      // console.log(row);
      if ((this.board.countMarkersFor(this.human, row) === 2) && (this.board.countMarkersFor(this.anonymous, row) === 1)) {
        // console.log("Status check 1");
        for (let index = 0; index < row.length; index += 1) {
          if (this.board.squares[row[index]].getMarker() === Square.UNUSED_SQUARE) {
            this.board.markSquareAt(row[index], Square.COMPUTER_MARKER);
            return;
          }
        }
      }
    }
  }

  selectComputerOffensiveMove(array) {
    // console.log("Comp Offensive Move");
    for (let idx = 0; idx < array.length; idx += 1) {
      let row = array[idx];
      // console.log(row);
      if ((this.board.countMarkersFor(this.computer, row) === 2)  && (this.board.countMarkersFor(this.anonymous, row) === 1)) {
        // console.log("Status check 2");
        for (let index = 0; index < row.length; index += 1) {
          if (this.board.squares[row[index]].getMarker() === Square.UNUSED_SQUARE) 
          {
            this.board.markSquareAt(row[index], Square.COMPUTER_MARKER);
            return;
          }
        }
      }
    }
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }
}

let game = new TTTGame();
game.play();

