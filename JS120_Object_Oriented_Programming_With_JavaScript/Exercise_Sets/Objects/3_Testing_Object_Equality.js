function objectsEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
console.log(objectsEqual({a: 'foo', b: 'bar', c: {a: 'cc', b:'kk'}}, {a: 'foo', b: 'bar', c: {a: 'cc', b:'kk'}}));  // true
console.log(objectsEqual({a: 'foo', b: 'bar', c: {a: 'cck', b:'kk'}}, {a: 'foo', b: 'bar', c: {a: 'cc', b:'kk'}}));  // false