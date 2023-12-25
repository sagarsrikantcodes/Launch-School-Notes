// Rewriting OO RPS with Constructors and Classes
/*
Using factory function

let readline = require('readline-sync');

function createPlayer() {
  return {
    move: null,
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();
  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You win!');
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
               (humanMove === 'paper' && computerMove === 'scissors') ||
               (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer wins!');
    } else {
      console.log("It's a tie");
    }
  },

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  },
};

RPSGame.play();


OO RPS With Constructors and Prototypes
If you've read and understood the assignments thus far in this lesson, converting the RPS game to use constructors and prototypes shouldn't be too challenging. We encourage you to try doing it on your own before you read the rest of the assignment. The conversion is mostly a mechanical process:

Write a constructor function for each factory function.
Move the initialization code from the factory function into the constructor.
Move all the other methods from the factory function into the constructor's prototype.
Replace the factory function invocations with constructor calls.

*/

let readLine = require('readline-sync');

function CreatePlayer() {
  this.move = null;
}

function CreateComputer() {
  this.move = (new CreatePlayer()).move;
}

CreateComputer.prototype.choose = function () {
  const choices = ['rock', 'paper', 'scissors'];
  let randomIndex = Math.floor(Math.random() * choices.length);
  this.move = choices[randomIndex];
}


function CreateHuman() {
  this.move = (new CreatePlayer()).move;
}

CreateHuman.prototype.choose = function () {
  let choice;

  while (true) {
    console.log('Please choose rock, paper, or scissors: ');
    choice = readLine.question();
    if (['rock', 'paper', 'scissors'].includes(choice)) break;
    console.log('Sorry, invalid choice.');
  }

  this.move = choice;
}

function RPSGame() {
  this.human = new CreateHuman();
  this.computer = new CreateComputer();
}

RPSGame.prototype.displayWelcomeMessage = function () {
  console.log("Welcome to Rock, Paper, Scissors!");
}

RPSGame.prototype.displayGoodbyeMessage = function () {
  console.log("Thanks for playing Rock, Paper, Scissors. Goodbye!");
}

RPSGame.prototype.displayWinner = function () {
  console.log(`You chose: ${this.human.move}`);
  console.log(`The computer chose: ${this.computer.move}`);

  let humanMove = this.human.move;
  let computerMove = this.computer.move;

  if ((humanMove === 'rock' && computerMove === 'scissors') ||
    (humanMove === 'paper' && computerMove === 'rock') ||
    (humanMove === 'scissors' && computerMove === 'paper')) {
    console.log('You win!');
  } else if ((humanMove === 'rock' && computerMove === 'paper') ||
    (humanMove === 'paper' && computerMove === 'scissors') ||
    (humanMove === 'scissors' && computerMove === 'rock')) {
    console.log('Computer wins!');
  } else {
    console.log("It's a tie");
  }
}

RPSGame.prototype.playAgain = function () {
  console.log('Would you like to play again? (y/n)');
  let answer = readLine.question();
  return answer.toLowerCase()[0] === 'y';
}

RPSGame.prototype.play = function () {
  this.displayWelcomeMessage();
  while (true) {
    this.human.choose();
    this.computer.choose();
    this.displayWinner();
    if (!this.playAgain()) break;
  }

  this.displayGoodbyeMessage();
}


let RPSGameObject = new RPSGame();
RPSGameObject.play();

