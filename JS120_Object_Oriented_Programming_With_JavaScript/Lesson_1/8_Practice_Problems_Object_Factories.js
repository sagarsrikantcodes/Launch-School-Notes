/*
Practice Problems: Objects and Factories

In these problems, we will develop a factory function for objects that represent books.

The following three books should give you an idea of what our first book object should look like:

Attributes
  Title: Mythos
  Author: Stephen Fry

Behavior:
  Get Description

-----------------------------
Attributes
  Title: Me Talk Pretty One Day
  Author: David Sedaris

Behavior:
  Get Description

-----------------------------
Attributes
 Title: Aunts aren't Gentlemen
 Author: PG Wodehouse

 Behavior:
   Get Description


*/

/*
1. Create three objects that represent the three books shown above. The method for the "Get Description" behavior should return a string like the following:

"Me Talk Pretty One Day was written by David Sedaris."

*/
/*
let book1 = {
  title: "Mythos",
  author: "Stephen Fry",

  getDescription() {
    return `${this.title} was written by ${this.author}.`;
  },
};

let book2 = {
  title: "Me Talk Pretty One Day",
  author: "David Sedaris",

  getDescription() {
    return `${this.title} was written by ${this.author}.`;
  },
};

let book3 = {
  title: "Aunts aren't Gentlemen",
  author: "PG Wodehouse",

  getDescription() {
    return `${this.title} was written by ${this.author}.`;
  },
};


console.log(book1.getDescription());
// Mythos was written by Stephen Fry.
console.log(book2.getDescription());
// Me Talk Pretty One Day was written by David Sedaris.
console.log(book3.getDescription());
// Aunts aren't Gentlemen was written by PG Wodehouse.


2. Think about the code you wrote for problem #1. Is there any unnecessary code? Does it have duplication?

The method `getDescription` is duplicated in each object. However, each object must hold unique values for its `title` and `author` properties.

*/

/*
3. Given our observations about the code so far, implement a factory function for our book objects that we can use with the following code:

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');

book1.getDescription();  // "Mythos was written by Stephen Fry."
book2.getDescription();  // "Me Talk Pretty One Day was written by David Sedaris."
book3.getDescription();  // "Aunts aren't Gentlemen was written by PG Wodehouse"

*/
/*
function createBook(title, author) {
  let book = {
    title: title,
    author: author,

    getDescription() {
      return `${this.title} was written by ${this.author}.`;
    }
  };

  return book;
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');

console.log(book1.getDescription());  // "Mythos was written by Stephen Fry."
console.log(book2.getDescription());  // "Me Talk Pretty One Day was written by David Sedaris."
console.log(book3.getDescription());  // "Aunts aren't Gentlemen was written by PG Wodehouse."

*/

/*
4. We now want to track which books we have and haven't read. Update the factory function so that it returns a book object that includes a property read that has an initial value of false.

*/


function createBook(title, author, read = false) {
  let book = {
    title: title,
    author: author,
    read: read,


    getDescription() {
      if (this.read === true) {
        return `${this.title} was written by ${this.author}. I have read it.`;
      } else {
        return `${this.title} was written by ${this.author}. I haven't read it.`;
      }

    },

    readBook() {
      this.read = true;
    },
  };

  return book;
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', false);
let book3 = createBook("Aunts aren't Gentlemen", "PG Wodehouse", true);

/*
console.log(book1.getDescription()); // Mythos was written by Stephen Fry.
console.log(book2.getDescription()); // Me Talk Pretty One Day was written by David Sedaris.
console.log(book3.getDescription()); // Aunts aren't Gentlemen was written by PG Wodehouse.
*/

console.log(book1.getDescription()); // Mythos was written by David Fry. I haven't read it.
book1.readBook();
console.log(book1.getDescription()); // Mythos was written by David Fry. I have read it.


