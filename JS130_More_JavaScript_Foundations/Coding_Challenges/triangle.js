class Triangle {
  constructor(a, b, c){
    this.a = a;
    this.b = b;
    this.c = c;

    if (!this.isValid()) {
      throw new Error("Invalid triangle lengths");
    }


  }

  isValid() {
    return (this.a > 0 && this.b > 0 && this.c > 0) && 
            ((this.a + this.b > this.c) && (this.a + this.c > this.b) && (this.b + this.c > this.a));
  }

  kind() {

      if (this.a === this.b && this.a === this.c && this.b === this.c) {
        return "equilateral";
      } else if ((this.a === this.b && this.a !== this.c) ||
                  (this.a === this.c && this.a !== this.b) ||
                  (this.b === this.c && this.b !== this.a)) {
        return "isosceles";
      } else {
        return "scalene";
      }

  }
}

module.exports = Triangle;