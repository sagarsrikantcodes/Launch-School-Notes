/*
Assignment: OO Rock Paper Scissors (RPS)

Game flow for RPS:
- The user makes a choice.
- The computer makes a choice. 
- The winner is displayed. 

Use objects and factory functions to code it in an object-oriented style. 

Classical approach to planning an object-oriented application involves 
following steps:
1. Write a textual description of the problem or exercise. 
2. Extract the significant nouns and verbs from the description. 
3. Organize and associate the verbs with the nouns. 

Important Note:
Nouns => objects or types of objects
Verbs => Behaviors or Methods
- Do not think of the game flow logic during the early design phase. 
- OOP is about organizing and modularizing the code into a cohesive 
structure - objects. 
- Need to know what objects to look. 

Initially, we can use the factory functions to create objects. 

Step 1: Textual Description of the Problem or Exercise

RPS is a 2 PLayer game where each player can choose one of the three moves: 
rock, paper, or scissors. The winner is chosen by comparing their moves 
with the following rules: 
- Rock crushes scissors i.e, rock wins against scissors. 
- Scissors cuts paper i.e, scissors beats papers
- Paper wraps rock i.e, paper beats rock. 
- If the players chose the same move, the game is a tie. 

Step 2: Extract the significant nouns and verbs from the description

Nouns: player, move, rule
Verbs: choose, compare 

Step 3: Organize and associate the verbs with the nouns. 

Player
  - choose 
Move
Rule 

???
- compare

*/

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
        console.log('Please choose rock, paper, or scissors: ');
        const readLine = require(`readline-sync`);
        choice = readLine.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log(`Sorry, invalid choice.`);
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}






/*
function createPlayer(playerType) {

  let player = {

    playerType: playerType,
    move: null,

    isHuman() {
      return this.playerType === 'human';
    },

    choose() {
      if (this.isHuman()) {
        let choice;

        while (true) {
          console.log('Please choose rock, paper, or scissors:');
          const readline = require(`readline-sync`);
          choice = readline.question();
          if (['rock', 'paper', 'scissors'].includes(choice)) break;
          console.log('Sorry, invalid choice.');
        }

        this.move = choice;
      } else {
        const choices = ['rock', 'paper', 'scissors'];
        let randomIndex = Math.floor(Math.random() * choices.length);
        this.move = choices[randomIndex];
      }
    },

  };

  return player;
}
*/
/*
function createMove() {
  let move = {
    // possible state: type of move (paper, rock, scissors)



  };

  return move;
}

function createRule() {

  let rule = {
    // possible state? not clear whether Rules need state



  };

  return rule;
}
*/

// Since we don't yet know where to put `compare`, let's define 
// it as an ordinary function. 
/*
let compare = function (move1, move2) {
  // not yet immplemented 

};
*/

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  humanScore: 0,
  computerScore: 0,

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors!");
  },

  displayGoodbyeMessage() {
    console.log("Thanks for playing Rock, Paper, Scissors. Goodbye!");

  },

  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if ((this.human.move === 'rock' && this.computer.move === 'scissors') ||
      (this.human.move === 'paper' && this.computer.move === 'rock') ||
      (this.human.move === 'scissors' && this.computer.move === 'paper')) {
      console.log('You win!');
      this.humanScore += 1;
    } else if ((this.human.move === 'rock' && this.computer.move === 'paper') ||
      (this.human.move === 'paper' && this.computer.move === 'scissors') ||
      (this.human.move === 'scissors' && this.computer.move === 'rock')) {
      console.log('Computer wins!');
      this.computerScore += 1;
    } else {
      console.log("It's a tie");
    }
  },

  playAgain() {
    const readLine = require(`readline-sync`);
    console.log("Would you like to play again? (y/n)");
    let answer = readLine.question();
    return answer.toLowerCase()[0] === 'y';
  },

  /*
  Keeping score 
   
    Explicit Requirements:
    rules:
    - Must play upto 5 points. 
    - Whoever reaches 5 points first wins. 
    - New Noun - score. 
    - Exploring both the options - on whether `score` is a new object type or a state of an existing class. 

    `score` being a state of an existing class is better since we can update the scores of human and computer within the displayWinner() method of the RPSGame object instead of creating a separate `score` object and introducing more complexity in the code. 
  
  */

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (this.humanScore === 5 || this.computerScore === 5) {
        if (this.humanScore === 5) {
          console.log("You win!");
        } else {
          console.log("Computer wins!");
        }
        console.log(`${this.humanScore}:${this.computerScore}`);
        if (!this.playAgain()) {
          break;
        } else {
          // Reset the human and computer scores to 0 respectively. 
          this.humanScore = 0;
          this.computerScore = 0;
        }
      }
      console.log(`${this.humanScore}:${this.computerScore}`);
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();

