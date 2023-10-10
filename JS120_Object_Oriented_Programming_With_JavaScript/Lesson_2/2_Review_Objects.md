# Review - Objects

Objects are one of the eight fundamental types in JavaScript:
* String
* Number
* Boolean
* Null
* Undefined
* Object
* BigInt
* Symbol

Objects are basically a collection of properties where each property has a key and value. While values can be any of the JavaScript types, **property keys are always strings**. If we define a property with a non-string key, it will first be converted to a string. 

```javascript

let myObject = { };

myObject[false] = "one"
myObject[7] = "two"
myObject[[1, 2, 3]] = "three"

Object.keys(myObject);                // ["7", "false", "1,2,3"]

myObject["false"]                     // "one"
myObject["7"]                         // "two"
myObject["1,2,3"]                     // "three"


```

## Property Access 

When dealing with objects, we are basically doing either one of two things: 
* setting a property, or 
* accessing a property. 

We can do both the operations through the property key by using the bracket notation or dot notation. 

```javascript

myObject["foo"] = "bar";
myObject.foo              // "bar"
myObject["foo"]           // "bar"

```

Dot notation is also called **member access notation**, while bracket notation is called **computed member access notation**. 

## Property Existence

What happens if we access a non-existent property on an object? We get `undefined`. However, we also get the same value when we try a property that is explicitly set to `undefined`. 

```javascript

Object.keys(myObject)                       //  [ '7', 'false', '1,2,3', 'a-key' ]
myObject['undefinedKey'] = undefined

myObject.undefinedKey                       // undefined
myObject.missingKey                         // undefined


```

That's a dilemma. In order to distinguish, there are two ways to do that:
* `in` operator
* `hasOwnProperty`

Both methods check if a property exists in an object. If it does, `true` is returned, and `false` otherwise. 

```javascript
"false" in myObject                    // true
"true" in myObject                     // false

myObject.hasOwnProperty("7")           // true
myObject.hasOwnProperty("8")           // false
 

```

Both `in` and `hasOwnProperty` are not exactly identical. There is a difference. 
Important Note: Both `in` operator as well as `hasOwnProperty` allows us to check for property existence in an object. 

Indirect way of checking for property existence is to enumerate the properties of an object via `Object.keys` or `Object.getOwnPropertyNames`. Both return an array of the object's properties. 
* `Object.keys` returns an array of enumerable properties.
* `Object.getOwnPropertyNames` returns all properties regardless if they're enumerable or not. 


```javascript
Object.keys(myObject)                    // [ '7', 'false', '1,2,3', 'a-key', 'undefinedKey' ]
Object.getOwnPropertyNames(myObject)     // [ '7', 'false', '1,2,3', 'a-key', 'undefinedKey' ]
```

## Summary 
* Basic concepts of objects discussed. 
* Objects as a collection of properties
* Setting and Accessing properties
* Checking for property existence. 







