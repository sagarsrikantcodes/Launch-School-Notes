# 3. Encapsulation 

* Encapsulation is one of the fundamental concepts of object-oriented programming. At its core, encapsulation describes the idea of bundling or combining the data and the operations that work on that data into a single entity, e.g., an object. 

* Take an example of a simple banking application. The code for the app must contain the following features:
	* The bank accounts
		* Account number
		* Account balance
		* Account type
	* The users
		* Name
		* Address
		* Phone Number
	* Certain behaviors / operations that utilize and manipulate the data. 
		* Opening an account 
		* Making Withdrawals 
		* Deposit new Funds

* If our program keeps track of data about entities and performs operations on that data, it makes sense to combine the data and the functionality into a single entity. That's what object-oriented programming is all about. We call this principle of combining data and the operations relevant to that data **encapsulation**. Encapsulation is about bundling state(data) and behavior(operations) to form an object. 
* In most OOP languages, encapsulation has a broader purpose. It also refers to restricting access to the state and certain behaviors; an object only exposes the data and behaviors that other parts of the application need to work. In other words, objects expose a **public interface** for interacting with other objects and keep their implementation details hidden (i.e, in Java **private interface** is used to keep the implementation details hidden). Thus, other objects can't change the data of an object without going through the proper interface. 
* Unfortunately, JavaScript doesn't support access restrictions (Such as private, default, and protected access modifiers such as in Java). There are ways to achieve a degree of access restriction, but they're not perfect. 

