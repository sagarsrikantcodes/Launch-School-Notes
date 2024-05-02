class Scrabble {

  constructor(word) {
    this.word = word;
    this.tileScoreTable = {
      1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'  ],
      2: ['D', 'G'],
      3: ['B', 'C', 'M', 'P'],
      4: ['F', 'H', 'V', 'W', 'Y'],
      5: ['K'],
      8: ['J','X'],
      10: ['Q','Z'],
    };
    this.charCount;
    if (word !== null) {
      this.charCount = this.createObj(word);
    }
  }

  createObj(word) {
    let obj = {};
    word.split('').forEach(char => {
      if (obj[char] === undefined) {
        obj[char] = 1;
      } else {
        obj[char] += 1;
      }
    });

    return obj;
  }

  score() {
    let count = 0;

    if (this.word === null || this.word === "" || this.word.includes(" ") || this.word.includes("\t") || this.word.includes("\n") || this.word.includes("\t") || this.word.includes("\v") || this.word.includes("\r")) {
      return count;
    }

    for (let key in this.charCount) {
      let val = this.charCount[key];
      for (let property in this.tileScoreTable) {
        if (this.tileScoreTable[property].includes(key.toUpperCase())) {
          count += (val * Number(property));
        }
      }
    }

    return count;
  }

  static score(word) {
    return (new Scrabble(word)).score();
  }
}

module.exports = Scrabble;
