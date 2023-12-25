// Practice Problems: Subtyping with Classes

// Suppose we have the following classes:

// Copy Code
/*
class Game {
  play() {
    return 'Start the game!';
  }
}

class Bingo extends Game {
  rulesOfPlay() {
    // rules of play
  }
}
*/
/*
What would happen if we added a play method to the Bingo class, keeping in mind that there is already a method of this name in the Game class from which the Bingo class inherits? Explain your answer. What do we call it when we define a method like this?

If we add a new play method to the Bingo class, objects created by Bingo will use that method instead of looking up the prototype chain and finding it in the Game class. As soon as JavaScript finds a method, it calls it. When a class redefines a method that a superclass defines, we call this "method overriding."

class Game {
  play() {
    return 'Start the game!';
  }
}

class Bingo extends Game {
  rulesOfPlay() {
    // rules of play
  }
  
  play() {
    return "let's play bingo!";
  }
}

let bingo = new Bingo();
console.log(bingo.play()); // 'let's play bingo!'

*/

/*
Let's practice creating a class hierarchy.

Create a class named Greeting that has a single method named greet. The method should take a string argument, and it should print that argument to the console.

Now, create two more classes that inherit from Greeting: one named Hello, and the other Goodbye. The Hello class should have a hi method that takes no arguments and logs "Hello". The Goodbye class should have a bye method that logs "Goodbye". Use the greet method from the Greeting class when implementing Hello and Goodbye; don't call console.log from either Hello or Goodbye.

*/

class Greeting {

  greet(greeting) {
    console.log(greeting);
  }

}

class Hello extends Greeting {

  hi() {
    super.greet("Hello");
  }
}

class Goodbye extends Greeting {

  bye() {
    super.greet("Goodbye");
  }

}


/*
// Alternate Method

class Greeting {
  greet(message) {
    console.log(message);
  }
}

class Hello extends Greeting {
  hi() {
    this.greet("Hello");
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet("Goodbye");
  }
}
*/


let hello = new Hello();
hello.hi(); // "Hello"
let goodbye = new Goodbye();
goodbye.bye(); // "Goodbye"



