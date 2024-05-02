class Anagram {
  constructor(word) {
    this.word = word;
    this.object1 = this.createObject(this.word);
  }

  createObject(string) {
    let obj = {};
    string = string.toLowerCase();
    for (let idx = 0; idx < string.length; idx += 1) {
      let char = string[idx];
      if (obj[char] === undefined) {
        obj[char] = 1;
      } else {
        obj[char] += 1;
      }
    }

    return obj;
  }

  isAnagram(word) {
    if (word.toLowerCase() === this.word.toLowerCase()) {
      return false;
    }

    let obj = this.createObject(word);
    for (let key in this.object1) {
      if (obj[key] === undefined || this.object1[key] !== obj[key]) {
        return false;
      }
    }

    for (let key in obj) {
      if (this.object1[key] === undefined || this.object1[key] !== obj[key]) {
        return false;
      }
    }

    return true;
  }

  match(array) {
    let res = [];
    array.forEach(string => {
      // string = string.toLowerCase();
      if (this.isAnagram(string)) {
        res.push(string);
      }
    });
    console.log(res);
    return res;
  }
}

module.exports = Anagram;