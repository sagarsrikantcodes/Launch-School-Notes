function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    notes: {},

    info() {
      console.log(`${name} is a ${year} year student`);
    },

    addCourse(course) {
      this.courses.push(course);
    },

    listCourses() {
      return this.courses;
    },

    addNote(code, note) {
      this.courses.forEach(course => {
        if (code === course.code) {
          if (this.notes[course.name] === undefined) {
            this.notes[course.name] = [];
          }
          this.notes[course.name].push(note);
        }
      });
    },

    viewNotes() {
      for (let key in this.notes) {
        console.log(`${key}: ${this.notes[key].join("; ")}`)
      }
    },

    updateNote(code, note) {
      this.courses.forEach(course => {
        if (code === course.code) {
          this.notes[course.name] = [];
          this.notes[course.name].push(note);
        }
      });
    },
  };
}

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"

console.log(foo.listCourses());
// [];

foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
console.log(foo.listCourses());
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]

foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
console.log(foo.notes); // { Math: [ 'Fun course', 'Remember to study for algebra' ] }
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"

foo.addNote(102, 'Difficult subject');
console.log(foo.notes); 
/* {
  Math: [ 'Fun course', 'Remember to study for algebra' ],
  'Advanced Math': [ 'Difficult subject' ]
}
*/
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"

foo.updateNote(101, 'Fun course');
console.log(foo.notes); 
// { Math: [ 'Fun course' ], 'Advanced Math': [ 'Difficult subject' ] }
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"

