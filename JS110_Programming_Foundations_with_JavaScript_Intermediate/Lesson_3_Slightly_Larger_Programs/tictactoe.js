
const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const NUMBER_OF_WINS_NEEDED = 5;
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],  // rows 
  [1, 4, 7], [2, 5, 8], [3, 6, 9],  // columns 
  [1, 5, 9], [3, 5, 7]              // diagonals
];

/*
Problem -
input: An array of integers. 
output: A string of integers separated by delimiters. 

rules:
- Explicit Requirements 
  1. The last two array elements need to be joined by ', or ' string unless specified in the function arguments of the calling function. 
- Implicit Requirements
  1. If the given array is empty, then the output is an empty string. 
  2. If the given array consists of only one element, return a string consisting of a single element. 
  3. If the given array consists of only two elements, return the string by joining ' or ' between two array elements unless any value is defined for the second function argument other than undefined. 

Example/Test Cases - 
  Example 1:
  Input: [1, 2, 3]
  Output: "1, 2, or 3"

  Example 2:
  Input: [1, 2, 3]
  Output: "1; 2; or 3"

  Example 3:
  Input: [1, 2, 3], ', ', 'and' 
  Output: 1, 2, and 3

  Example 4:
  Input: []
  Output: ""

  Example 5:
  Input: [5]
  Output: "5"

  Example 6:
  Input: [1, 2]
  Output: 1 or 2 

  Example 7:
  INput: [1, 2] and 'and'
  Output: 1 and 2

  Example 8:
  Input: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  Output: 1, 2, 3, 4, 5, 6, 7, 8, or 9

Data Structures:
input: An array of integers.
output: String of integers separated by a delimiter. 

Algorithm:
1. Check if the given array is empty, 
  - If it is empty, return an empty string. 
  - Else if the given array only consist of one element, return a string 
  containing only a single element. 
  - Else if the given array consists of two elements. 
      - If the second function argument is equal to undefined, then return a 
      concatenated string (i.e., array[0] + ' or ' + array[1]).
      - Else, return a concatenated string (i.e., array[0] + ` ${secondFunctionArgument} ` + array[1])
2. Declare and create a variable representing a portion of the string from index , 0 until index, array.length - 1 (i.e, stringVar). 
3. If the values of both the function arguments are undefined,
  - Return the concatenated string by joining ', ' string with ', or ' and last element of the array. 
  Else if the second function is not equal to undefined AND the third function argument is equal to undefined 
    - Return the concatenated string by joining the second function argument and ' or ' string with the last element of the array. 
4. If none of the above conditions evaluate to true, return the concatenated string by joining the second and third function arguments along with the last element of the array.

*/

function joinOr(array, arg2 = undefined, arg3 = undefined) {
  if (array.length === 0) {
    return "";
  } else if (array.length === 1) {
    return array.join();
  } else if (array.length === 2) {
    return (arg2 === undefined) ? array[0] + ' or ' + array[1] : array[0] + ` ${arg2} ` + array[1];
  }

  if (arg2 === undefined && arg3 === undefined) {
    return array.slice(0, array.length - 1).join(', ') + ', or ' + array[array.length - 1];
  } else if (arg2 !== undefined && arg3 === undefined) {
    return array.slice(0, array.length - 1).join(`${arg2}`) + `${arg2}or ` + array[array.length - 1];
  }

  return array.slice(0, array.length - 1).join(`${arg2}`) + `${arg2}${arg3} ` + array[array.length - 1];

}

/*
Test Cases
console.log(joinOr([1, 2, 3])); // => '1, 2, or 3'
console.log(joinOr([1, 2, 3], '; ')); // => '1; 2; or 3'
console.log(joinOr([1, 2, 3], ', ', 'and')); // => '1, 2, and 3'
console.log(joinOr([])); // => ''
console.log(joinOr([5])); // => '5'
console.log(joinOr([1, 2])); // => '1 or 2'
console.log(joinOr([1, 2, 3, 4, 5, 6, 7, 8, 9])); //=> '1, 2, 3, 4, 5, 6, 7, 8, or 9'
console.log(joinOr([1, 2], 'and')); // => '1 and 2'
*/

function displayBoard(board) {
  console.clear();

  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);

  console.log('');
  console.log('     |     |');
  console.log(` ${board['1']}   |   ${board['2']} |  ${board['3']}  `);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(` ${board['4']}   |  ${board['5']}  |  ${board['6']}  `);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(` ${board['7']}   |  ${board['8']}  |  ${board['9']}  `);
  console.log('     |     |');
  console.log('');
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square += 1) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function boardFull(board) {

  let arr = emptySquares(board);
  if (arr.length === 0) {
    return true;
  }

  return false;

  return emptySquares(board).length === 0;
}

function someOneWon(board) {
  return !!detectWinner(board);
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Choose a square ${joinOr(emptySquares(board), ', ')}:`);
    square = readline.question().trim();
    if (emptySquares(board).includes(square)) break;

    prompt("That's not a valid choice.");
  }

  board[square] = HUMAN_MARKER;
}

function computerChoosesSquare(board) {
  let square;

  // offense first 
  for (let index = 0; index < WINNING_LINES.length; index++) {
    let line = WINNING_LINES[index];
    square = findAtRiskSquare(line, board, COMPUTER_MARKER);
    if (square) break;
  }

  // defense
  if (!square) {
    for (let index = 0; index < WINNING_LINES.length; index += 1) {
      let line = WINNING_LINES[index];
      square = findAtRiskSquare(line, board, HUMAN_MARKER);
      if (square) break;
    }
  }

  if (!square) {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    square = emptySquares(board)[randomIndex];
  }

  board[square] = COMPUTER_MARKER;
}

let playersMatch = 0;
let computersMatch = 0;

while (true) {

  let playersScore = 0;
  let computersScore = 0;

  while (true) {
    let board = initializeBoard();


    while (true) {
      displayBoard(board);

      playerChoosesSquare(board);
      if (someOneWon(board) || boardFull(board)) {
        break;
      }




      computerChoosesSquare(board);
      displayBoard(board);

      if (someOneWon(board) || boardFull(board)) {
        break;
      }


    }

    displayBoard(board);

    if (someOneWon(board)) {
      prompt(`${detectWinner(board)} won!`);
      detectWinner(board) === 'Player' ? playersScore += 1 : computersScore += 1;
      console.log(`Player's score is ${playersScore} and Computer's score is ${computersScore}!`);
    } else {
      prompt("It's a tie!");
    }

    if (playersScore === NUMBER_OF_WINS_NEEDED ||
      computersScore === NUMBER_OF_WINS_NEEDED) {
      if (playersScore === NUMBER_OF_WINS_NEEDED) {
        console.log("Player won the match!");
        playersMatch += 1;
      } else {
        console.log("Computer won the match!");
        computersMatch += 1;
      }
      playersScore = 0;
      computersScore = 0;
    }

    prompt('Would you like to play again? y/n');
    let answer = readline.question().toLowerCase()[0];
    if (answer !== 'y') {
      console.log("Player's score is " + playersScore + " and Computer's score is " + computersScore);
      console.log("Number of matches won by Player is " + playersMatch + " and Computer is " + computersMatch);

      prompt('Thanks for playing Tic Tac Toe!');
      process.exit();
    }
  }
}

// prompt('Thanks for playing Tic Tac Toe!');

function someOneWon(board) {
  return !!detectWinner(board);
}

function detectWinner(board) {

  for (let line = 0; line < winningLines.length; line += 1) {
    let [sq1, sq2, sq3] = winningLines[line];

    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return 'Player';
    } else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer';
    }
  }
  return null;
}

function findAtRiskSquare(line, board, marker) {
  let markersInLine = line.map(square => board[square]);

  if (markersInLine.filter(val => val === HUMAN_MARKER).length === 2) {
    let unusedSquare = line.find(square => board[square] === INITIAL_MARKER);
    if (unusedSquare !== undefined) {
      return unusedSquare;
    }
  }

  return null;
}














/*

Keep Score PEDAC Process

Problem -
  input: playersScore, computersScore
  output: playersMatch, computersMatch

  rules:
    Explicit Requirements:
    - Keep track of the scores of player and computer respectively.
    - The first player to win 5 games wins the overall match.
    - The score should reset to 0 for each player when beginning a new match.
    - Don't use any global variables.
    - Use global constant, to represent the number of games needed to win the match.

  Implicit Requirements:
  - 5 wins for either player/computer constitutes 1 match for either player/computer.

Example/Test Cases -
  Example 1:
  input: playersScores = 5, computerScores = 4
  output: "Player won the match"

  Example 2:
  input: playersScore = 4, computerScores = 5
  output: "Computer won the match"

Data Structures:
Number data type.

Algorithm:
- Declare and create a global constant, NUMBER_OF_WINS_NEEDED and assign it to number 5.
- Run the outermost while loop as long as the player is willing to play the match.
  - Declare and create an integer data type called playersScore and initialize it to value 0.
  - Similarly declare and create an integer data type called computerScore and initialize it to value 0.
  - If the player won, increment the value of variable, playersScore by 1.
  - Else if computer won, increment the value of variable, computersScore by 1.
  - Ask the player if he wants to play the game again. If he wants to play the game, retain the value of playersScore and computersScore.
  - Check if the value of playersScore OR the value of computersScore is equal to the global constant, NUMBER_OF_WINS_NEEDED.
    - If it is, increment the playersMatch by 1 or computersMatch by 1.
    - If player wins a match, print the string "Player won the match!".
    Else if computer wins the match, print the string "computer won the match!"
    - Ask the user if he wants to play another match.
    - If yes, reset the playersScore and computersScore to 0 respectively.
    Else, exit from the loop respectively.
- After the completion of the match (exiting from the loop), display the number of matches won the player as well as the computer respectively.

Code with Implementation
*/























/*
board = {
  1: ' ', // top left
  2: ' ', // top center
  3: 'X', // top right
  4: ' ', // middle left
  5: '0', // center
  6: ' ', // middle right
  7: ' ', // bottom left
  8: ' ', // bottom center
  9: ' ', // bottom right
};
*/

// displayBoard(board);
















