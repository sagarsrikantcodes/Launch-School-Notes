# Implicit and Explicit Execution Context

## Execution Context
* `this` keyword refers to the object that contains the method. 
* The execution context - or **context** -- is a concept that refers to the **environment** in which a function executes. In JavaScript, it most commonly refers to the current value of the `this` keyword. 
* The context depends on how the function or method was invoked, not on where the function was defined. 
* The only factor that determines the context is how you call the function or method. In other words, two invocations of the same function or method can have very different contexts depending on how you make those calls. 

There are two basic ways to set the context when calling a function or a method:

	**1. Explicit:** The execution context that we set explicitly. 
	**2. Implicit:** The execution context that JavaScript sets implicitly when your code doesn't provide an explicit context. 

Setting the execution context is also called **binding `this`** or **setting the binding.** A binding is somthing that ties two things together. In this case, it refers to the fact that a call binds `this` to a specific object when the function or method is called. 



