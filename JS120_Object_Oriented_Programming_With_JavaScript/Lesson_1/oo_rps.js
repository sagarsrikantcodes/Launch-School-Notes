/*
Assignment: OO Rock Paper Scissors

Game flow:
- The user makes a choice.
- The computer makes a choice.
- The winner is displayed.

Using objects and factory functions to code it in an object-oriented style.

Approach to planning an object-oriented application:

1. Write a textual description of the problem or exercise.
2. Extract the significant nouns and verbs from the description.
3. Organize and associate the verbs with the nouns.

Nouns are the objects or types of objects.
Verbs are the behaviors or the methods.


Use factory functions to create objects.

Step 1: Problem Description
RPS is 2 player game where each player chooses one of the three possible moves:
rock, paper or scissors.
The winner is chosen by comparing their moves with the following rules:
- Rock crushes scissors
- scissor cuts paper
- paper wraps rock
- if the players choose the same move, the game is a tie.

Step 2: Extract the significant nouns and verbs from the description.

Nouns: moves, player, rule
Verbs: choose, compare

Ignore the nouns "rock", "paper",and "scissors": each is a variation of a move.
Treat move as a noun of interest.

Step 3 - Organize and associate the verbs with the nouns

Player
  - choose
Move
Rule

???
- compare

*/

const readLine = require(`readline-sync`);


function createPlayer() {
  return {
    move: null,
  };
}
/*
function createMove() {
  return {
    // Possible state: type of move (rock, paper, scissors)


  };
}

function createRule() {
  return {
    // possible state? not clear whether Rules need state

  };
}

// Since we don't yet know where to put `compare`, let's define
// it as an ordinary function.
let compare = function (move1, move2) {
  // not yet implemented
};
*/

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
        console.log("Please choose rock, paper, or scissors: ");
        choice = readLine.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log("Sorry, invalid choice.");
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
    console.log("Welcome to the game of Rock, Paper, and Scissors!");
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${humanMove}`);
    console.log(`The computer chose: ${computerMove}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
      (humanMove === 'scissors' && computerMove === 'paper') ||
      (humanMove === 'paper' && computerMove === 'rock')) {
      console.log("You win!");
    } else if ((computerMove === 'rock' && humanMove === 'scissors') ||
      (computerMove === 'scissors' && humanMove === 'paper') ||
      (computerMove === 'paper' && humanMove === 'rock')) {
      console.log("Computer wins!");
    } else {
      console.log("It's a tie!");
    }
  },

  playAgain() {
    console.log("Would you like to play again? (y / n)?");
    let answer = readLine.question();
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

  displayGoodbyeMessage() {
    console.log("Thank you for playing Rock, Paper, and Scissors. Goodbye!");
  },
};

RPSGame.play();