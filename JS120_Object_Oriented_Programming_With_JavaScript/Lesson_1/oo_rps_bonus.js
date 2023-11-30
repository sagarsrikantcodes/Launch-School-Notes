/*
Assignment: OO Rock Paper Scissors Bonus Features

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
Rock Paper Scissors Spock Lizard is a two player game.
- Scissors cuts Paper
- Paper covers Rock
- Rock crushes Lizard
- Lizard poisons Spock
- Spock smashes Scissors
- Scissors decapitates Lizard
- Lizard eats Paper
- Paper disproves Spock
- Spock vaporizes Rock
- Rock crushes Scissors

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


Algorithm for RPSSL:
Rock, Paper, Scissors, Spock, Lizard
Inside the play method
- Display the welcome message. 
- Continue playing the match as long
as the human wants to continue playnig.(while loop)
  - Rule of the game
    - As long as the points reached by humans
    and computer is 5 points continue playing.(while loop)
      - Ask human's choice of the move.
      - Computer picks the choice.
      - Clear the console.
      - Display the winner
      - Display the points of human and computer players.
  - Display the winner of the match.
  - DIsplay the history of human moves and corresponding wins.
  - Ask the user if he would like to play again?
    - If yes/ y, continue with the new match.
    Else, break out of the loop.
- Display the goodbye message.    
    
*/

const readLine = require(`readline-sync`);

function createPlayer() {
  return {
    move: null,
  };
}

function createComputer(historyOfHumanWins) {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      let choices = ['rock', 'paper', 'scissors', 'spock', 'lizard'];
      let copyOfChoices = choices.slice();
      let filteredChoices = copyOfChoices.filter(choice => historyOfHumanWins[choice] < 40);
      let randomIndex;
      if (filteredChoices.length === 0) {
        randomIndex = Math.floor(Math.random() * copyOfChoices.length);
        this.move = copyOfChoices[randomIndex];
      } else {
        randomIndex = Math.floor(Math.random() * filteredChoices.length);
        this.move = filteredChoices[randomIndex];
      }

      if (this.move === 'rock') {
        timesPlayedByComputer.rockTimes += 1;
      } else if (this.move === 'paper') {
        timesPlayedByComputer.paperTimes += 1;
      } else if (this.move === 'scissors') {
        timesPlayedByComputer.scissorsTimes += 1;
      } else if (this.move === 'spock') {
        timesPlayedByComputer.spockTimes += 1;
      } else if (this.move === 'lizard') {
        timesPlayedByComputer.lizardTimes += 1;
      }
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
        console.log("Please choose rock, paper, scissors, spock or lizard: ");
        choice = readLine.question();
        if (['rock', 'paper', 'scissors', 'spock', 'lizard'].includes(choice)) break;
        console.log("Sorry, invalid choice.");
      }

      this.move = choice;
      if (this.move === 'rock') {
        timesPlayedByUser.rockTimes += 1;
      } else if (this.move === 'paper') {
        timesPlayedByUser.paperTimes += 1;
      } else if (this.move === 'scissors') {
        timesPlayedByUser.scissorsTimes += 1;
      } else if (this.move === 'spock') {
        timesPlayedByUser.spockTimes += 1;
      } else if (this.move === 'lizard') {
        timesPlayedByUser.lizardTimes += 1;
      }
    },
  };

  return Object.assign(playerObject, humanObject);
}

const score = {
  userPoints: 0,
  computerPoints: 0,
};

const timesPlayedByUser = {
  rockTimes: 0,
  paperTimes: 0,
  scissorsTimes: 0,
  spockTimes: 0,
  lizardTimes: 0,
};

const timesPlayedByComputer = {
  rockTimes: 0,
  paperTimes: 0,
  scissorsTimes: 0,
  spockTimes: 0,
  lizardTimes: 0,
};

const timesWonByUser = {
  rockTimes: 0,
  paperTimes: 0,
  scissorsTimes: 0,
  spockTimes: 0,
  lizardTimes: 0,
};

const timesWonByComputer = {
  rockTimes: 0,
  paperTimes: 0,
  scissorsTimes: 0,
  spockTimes: 0,
  lizardTimes: 0,
};


const historyOfHumanWins = {
  'rock': Math.floor((timesWonByUser.rockTimes / timesPlayedByUser.rockTimes) * 100),
  'paper': Math.floor((timesWonByUser.paperTimes / timesPlayedByUser.paperTimes) * 100),
  'scissors': Math.floor((timesWonByUser.scissorsTimes / timesPlayedByUser.scissorsTimes) * 100),
  'spock': Math.floor((timesWonByUser.spockTimes / timesPlayedByUser.spockTimes) * 100),
  'lizard': Math.floor((timesWonByUser.lizardTimes / timesPlayedByUser.lizardTimes) * 100)
};

const historyOfComputerWins = {
  'rock': Math.floor((timesWonByComputer.rockTimes / timesPlayedByComputer.rockTimes) * 100),
  'paper': Math.floor((timesWonByComputer.paperTimes / timesPlayedByComputer.paperTimes) * 100),
  'scissors': Math.floor((timesWonByComputer.scissorsTimes / timesPlayedByComputer.scissorsTimes) * 100),
  'spock': Math.floor((timesWonByComputer.spockTimes / timesPlayedByComputer.spockTimes) * 100),
  'lizard': Math.floor((timesWonByComputer.lizardTimes / timesPlayedByComputer.lizardTimes) * 100)
};


const RPSGame = {
  human: createHuman(),
  computer: createComputer(historyOfHumanWins),
  humanScore: score.userPoints,
  computerScore: score.computerPoints,

  displayWelcomeMessage() {
    console.log("Welcome to the game of Rock,Paper,Scissors,Spock,Lizard!");
  },

  displayRule() {
    console.log("The first player to reach 5 points wins the match. " +
      "Good luck!");
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;


    console.log(`You chose: ${humanMove}`);
    console.log(`The computer chose: ${computerMove}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
      (humanMove === 'scissors' && computerMove === 'paper') ||
      (humanMove === 'paper' && computerMove === 'rock') ||
      (humanMove === 'rock' && computerMove === 'lizard') ||
      (humanMove === 'lizard' && computerMove === 'spock') ||
      (humanMove === 'spock' && computerMove === 'scissors') ||
      (humanMove === 'scissors' && computerMove === 'lizard') ||
      (humanMove === 'lizard' && computerMove === 'paper') ||
      (humanMove === 'paper' && computerMove === 'spock') ||
      (humanMove === 'spock' && computerMove === 'rock')) {
      console.log("You win!");
      this.humanScore += 1;

      if (humanMove === 'rock') {
        timesWonByUser.rockTimes += 1;
      } else if (humanMove === 'paper') {
        timesWonByUser.paperTimes += 1;
      } else if (humanMove === 'scissors') {
        timesWonByUser.scissorsTimes += 1;
      } else if (humanMove === 'spock') {
        timesWonByUser.spockTimes += 1;
      } else if (humanMove === 'lizard') {
        timesWonByUser.lizardTimes += 1;
      }

    } else if ((computerMove === 'rock' && humanMove === 'scissors') ||
      (computerMove === 'scissors' && humanMove === 'paper') ||
      (computerMove === 'paper' && humanMove === 'rock') ||
      (computerMove === 'rock' && humanMove === 'lizard') ||
      (computerMove === 'lizard' && humanMove === 'spock') ||
      (computerMove === 'spock' && humanMove === 'scissors') ||
      (computerMove === 'scissors' && humanMove === 'lizard') ||
      (computerMove === 'lizard' && humanMove === 'paper') ||
      (computerMove === 'paper' && humanMove === 'spock') ||
      (computerMove === 'spock' && humanMove === 'rock')) {
      console.log("Computer wins!");
      this.computerScore += 1;

      if (computerMove === 'rock') {
        timesWonByComputer.rockTimes += 1;
      } else if (computerMove === 'paper') {
        timesWonByComputer.paperTimes += 1;
      } else if (computerMove === 'scissors') {
        timesWonByComputer.scissorsTimes += 1;
      } else if (computerMove === 'spock') {
        timesWonByComputer.spockTimes += 1;
      } else if (computerMove === 'lizard') {
        timesWonByComputer.lizardTimes += 1;
      }
    } else {
      console.log("It's a tie!");
    }
    console.log(`You now have ${this.humanScore} points, and the computer has ${this.computerScore} points.`);
  },

  playAgain() {
    console.log("Would you like to play again? (y / n)?");
    let answer = readLine.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.displayRule();
      while (true) {
        this.human.choose();
        this.computer.choose();
        console.clear();
        this.displayWinner();
        if (this.humanScore === 5) {
          console.log("You win the match!");
          break;
        } else if (this.computerScore === 5) {
          console.log("The computer won the match!");
          break;
        }
      }
      // History of human moves and corresponding wins in tabular format.
      function getTabularResult(Times_Played, Wins, Win_Percentage) {
        this.Times_Played = Times_Played;
        this.Wins = Wins;
        this.Win_Percentage = Win_Percentage;
      }

      const statistics = {};
      statistics.Rock = new getTabularResult(timesPlayedByUser.rockTimes, timesWonByUser.rockTimes, Math.floor((timesWonByUser.rockTimes / timesPlayedByUser.rockTimes) * 100));
      statistics.Paper = new getTabularResult(timesPlayedByUser.paperTimes, timesWonByUser.paperTimes, Math.floor((timesWonByUser.paperTimes / timesPlayedByUser.paperTimes) * 100));
      statistics.Scissors = new getTabularResult(timesPlayedByUser.scissorsTimes, timesWonByUser.scissorsTimes, Math.floor((timesWonByUser.scissorsTimes / timesPlayedByUser.scissorsTimes) * 100));
      statistics.Spock = new getTabularResult(timesPlayedByUser.spockTimes, timesWonByUser.spockTimes, Math.floor((timesWonByUser.spockTimes / timesPlayedByUser.spockTimes) * 100));
      statistics.Lizard = new getTabularResult(timesPlayedByUser.lizardTimes, timesWonByUser.lizardTimes, Math.floor((timesWonByUser.lizardTimes / timesPlayedByUser.lizardTimes) * 100));
      console.log("Below is the history of moves by you including the percentage of wins: ");
      console.table(statistics);

      // Ask if the user wishes to play the match again.
      if (!this.playAgain()) {
        break;
      } else {
        // Reset the scores of human and computer to 0 if the user wants to play
        // again
        score.userPoints = 0;
        score.computerPoints = 0;
        this.humanScore = 0;
        this.computerScore = 0;

        for (let key in timesPlayedByUser) {
          timesPlayedByUser[key] = 0;
        }

        for (let key in timesPlayedByComputer) {
          timesPlayedByComputer[key] = 0;
        }

        for (let key in timesWonByUser) {
          timesWonByUser[key] = 0;
        }

        for (let key in timesWonByComputer) {
          timesWonByComputer[key] = 0;
        }

      }
    }
    this.displayGoodbyeMessage();
  },

  displayGoodbyeMessage() {
    console.log("Thank you for playing Rock, Paper, Scissors, " +
      "Spock and Lizard. Goodbye!");
  },
};

RPSGame.play();

