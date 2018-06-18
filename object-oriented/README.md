# Object Oriented Javascript

## Define objects
There are several ways to create an object in javascript. We'll explore three common ways to do this to begin with.

### Object constructor
Function constructor are merely regular functions and the only difference is that in this particular case we call this functions using `new` keyword or calling `Object.create` create method. Note that the language doesn't make any distinction; you can call any function as a constructor and either as a normal function.

```javascript
function Person(name, gender) {
    //private attributes.
    this.name = name;
    this.gender = gender;
    //Define a method.
    this.talk = function() {
        return `Hello, my name is ${this.name}`;
    };
}

//Using new keyword
const usPresident = new Person("Donald Trump", "male");
usPresident.talk(); //Hello, my name is Donald Trump

//Using Object.create method
const argPresident = new Person("Miauricio Macri", "male");
argPresident.talk(); 
```

We can't add new attributes by `Person.newAttribute = "foo"`. We need to setup all attributes inside the constructor. If we forget to include `new` keyword before the function call, the function would overwrite the `window` context.

```javascript
const usPresident = Person("Donald Trump", "male");
usPresident.talk(); //Uncaught TypeError: cannot read property 'talk'
//We didn't create our object context using new, so "this" was pointing to window.
window.name; //male
window.gender; //Donald Trump
window.talk(); //Hello, my name is Donald Trump.
```

### Object literal and `new Object()`
In this case we create a new instance of `Object` by assigning `new Object()` to a variable and then we create attributes and methods for that object. But is not recommended, and it's always better to use literal objects `{}`.

```javascript
const person = new Object();

person.setName = function(name) {
    this.name = name;
};

person.getName = function() {
    return this.name;
};

person.setName("Minnie Mouse");
person.getName(); //Minnie Mouse

//Using object literals

const person2 = {
    setName: function(name) {
        this.name = name;
    },
    getName: function() {
        return this.name;
    }
};

person2.setName("Mickey Mouse");
person2.getName(); //Mickey Mouse
```
When using object literals we are instanciating and object as if we use `new Object()`.

Generally it's a good practice to use literal objects only when we want to store data and when we want to add logic in our objects (methods) we need to use function constructors.

## Prototyping

### Introduction

Prototyping is a mechanism that allow objects to share properties and methods by being cloned and extended. This is known as prototypical inheritance and differs from class inheritance.

Every object in JavaScript has an internal property calles `[[Prototype]]`:

```javascript
let obj = {};
Object.getPrototypeOf(obj); 
//{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, …}
```
So when we attempt to call a method or access a property of an object, JS engine will start searching on the object itself and then, if it's not found, it will search on the prototype of that object. If there's no such property or method, it will search into the linked object on the prototype until the the end of the _prototype chain_ is reached. The end of the prototype chain is `Object.prototype` and beyond that there's `null`:

```javascript
const obj = {};
obj.__proto__; 
//{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …} (Object.prototype)
obj.__proto__.__proto__;
//null, because the end of the prototype chain is Object.prototype
```

So, Javascript automatically uses prototypical inheritance to extend objects, and this is actually what happen when we create a new array and assign it into a variable; we can use the basic methods without implementing anything because of that feature that JS provides:

```javascript
const arr = [];
arr.__proto__; 
//[constructor: ƒ, concat: ƒ, find: ƒ, findIndex: ƒ, pop: ƒ, …] (Array.prototype)
arr.__proto__.__proto__;
//{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …} (Object.prototype)
arr.__proto__.__proto__.__proto__; 
//null
```

Also, when we create a new instance of an object, JavaScript engine will create a **new copy** of constructor function for each new object meaning that it will copy and store the same functions for each object, so it would be better to use prototype to add methods instead of waste the memory.

### Prototype chaining
Prototype chaining means that an object's prototype can point to another object's prototype instead of it's own constructor:

```javascript
//SuperType constructor function
function SuperType() {
    this.name = "Super-type";
};

//SuperType prototype
SuperType.prototype.getName = function() {
    return this.name;
};

//SubType constructor function
function SubType() {
    this.age = 26;
};

//Inherit the properties from SuperType
SubType.prototype = new SuperType();

//Add new methods to SubType
SubType.prototype.subAge = function() {
    return this.age;
};

//Let's create a new SubType object.
const subTypeObject = new SubType();

console.log(subTypeObject.name, subTypeObject.getName()); 
//Super-Type, Super-Type
console.log(subTypeObject.age, subTypeObject.getAge());
//26, 26
```
Initially, `SubType.prototype` has a default value as it points to SubType's constructor function. When we execute `SubType.prototype = new SuperType()` JS engine rewrite the prototype of SubType to SuperType's constructor function. Note that this statement implies that if we add a new method on an object's prototype before `SubType.prototype = new SuperType()`, it will overwrite our new methods as well. **Always add your new methods/properties after extending another object**.

### Problems using prototype chaining
As all properties of the parent object are shared among its children, if one child modifies a property of the super type prototype, other children also will be affected.

```javascript
function SuperType() { };
SuperType.prototype.customName = "An awesome name";
SuperType.prototype.getCustomName = function() {
    return this.customName;
};

function SubType1() { };
SubType1.prototype = SuperType.prototype;
const subTypeObject1 = new SubType1();

function SubType2() { }
SubType2.prototype = SuperType.prototype;
const subTypeObject2 = new SubType2();

subTypeObject1.getCustomName(); //An awesome name
subTypeObject2.getCustomName(); //An awesome name

//Let's change parent's prototype by changing SubType1's prototype.
SubType1.prototype.customName = "Awful name";
subTypeObject1.getCustomName(); //Awful name
subTypeObject2.getCustomName(); //Awful name
```
The issue here is that we used `SubType1.prototype = SuperType.prototype;` and `SubType2.prototype = SuperType.prototype;` instead of using `new SuperType()`. If we create a new instance of SuperType we'll inherit our parent's prototype but a child modification won't affect other children and neither SuperType's prototype itself.

## Object utils