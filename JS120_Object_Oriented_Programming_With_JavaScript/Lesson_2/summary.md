# Summary

* Every object has an internal `[[Prototype]]` property that points to a special object, the object's prototype. It is used to look up properties that don't exist on the object itself.
	* `Object.create` returns a new object with the passed-in argument as its prototype.
	* You can use `Object.getPrototypeOf` and `Obj.isPrototypeOf` to check for prototype relationships between objects.

* Looking up a property in the prototype chain is the basis for prototypal inheritance, or property sharing through the proptotype chain. Objects lower down in the chain inherit properties and behaviors from objects in the chain above. That is, downstream objects can delegate properties or behaviors to upstream objects.
	* A downstream object overrides an inherited property if it has a property with the same name. (Overriding is similar to shadowing, but it doesn't completely hide the overridden properties.)

	* `Object.getOwnPropertyNames` and `obj.hasOwnProperty` can be used to test whether an object owns a given property. 

* Function invocations (e.g., `parseInt(numberString)`) rely upon implicit execution context that resolves to the global object. Method invocations (e.g., `array.forEach(processElement)`) rely upon implicit context that resolves to the object that holds the method.

* All JavaScript code executes within a context. The top-level context is the `window` object in browsers and the `global` object in Node. All global methods and objects, such as `parseInt` and `Math`, are properties of `window` or `global`.

* The value of `this` is the current execution context of a function or method. 

* The value of `this` changes based on how you invoke a function, not how you define it.

* JavaScript has first-class functions that have the following characteristics:
	* You can add them to objects and execute them in the respective object's context.
	* You can remove them from their objects, pass them around, and execute them in entirely different contexts.
	* They're initially unbound but dynamically bound to a context object at execution time.

* The `call` and `apply` methods invoke a function with an explicit execution context. 

* The `bind` method returns a new function that permanently binds a function to a context.

* Arrow functions are always bound to the execution context of the enclosing function invocation. When defined at the top level, the context of an arrow function is the global object. 


