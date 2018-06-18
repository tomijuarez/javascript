# Execution Context
In Javascript there are different execution contexts. There is a _global context_, a _function context_ and _eval context_. JS manage a stack called _execution context stack which is a queue containing all context names of the functions that were called in order to track them and apply `name mangling`.

## Global execution context
This is the default context. When the JS engine start the execution of the code, it is on the global context and it contains all the global code as part of the `window` object in browser context or `global` in nodejs.

## Functional execution context
Each function create a new execution context when it's called somewhere. This execution context is local to that function and the code in that context has access to `its global context` -not only the global context but the global context of that function (the functions that contains the function and the most global context of the program)-. While executing global execution context code, if there's a function call, JS engine will create a new context for that function.

## Eval
Execution context inside `eval` function, that can be setted from the user in order to add new code to the program. **EVAL IS EVIL**. 

## _this_ keyword
The _this_ keyword behaves different depending on the context in which is being executed. 

### Global context
In the global execution context, `this` refers to the global object; `window` in Javascript and `global` in node.

```javascript
this === window; //true in browser JS
this === global; //true in nodejs
```
If we use the strict mode, it would be `undefined` because it's not in the context of an object explicitly.

```javascript
'use strict';

this === window; //false
console.log(this); //undefined
```

### Function context

#### Simple call
In this particular case, `this` behaves as in the global context.
```javascript
function testThis() {
    return this;
}

testThis === window //true
```

If we use the strict mode, it would be `undefined`.

#### As an object method

In this scenario, it doesn't matters where the function is defined, because

```javascript
var obj = {
    meaningOfLife: 42,
    foo: function() {
        return this.meaningOfLife;
    }
};

obj.foo(); //42

//Or...
var obj2 = {
    meaningOfLife: 42;
};

function foo() {
    return this.meaningOfLife;
}

//Attach method foo in obj
obj.foo = foo;

obj.foo(); //42
```
On the other hand, `this` will always point to the most restrictive object -the immediate structure that contains the functions that is being executed-.

```javascript
var outer  = {
	nested: {
        value: 42,
		foo: function() { console.log(this.value); }
	}
};

outer.nested.foo(); //42

var outer  = {
    value: 42,
	nested: {
		foo: function() { console.log(this.value); }
	}
};

outer.nested.foo(); //undefined

```

Note that event in methods, if we define an anonymous function, it will turn as a call of a normal function and `this` value will hold be the global context

```javascript
const obj = {
    attribute: 42,
    foo: function() {
        console.log(this.attribute); //42
        console.log(this === obj); //true
        (function() {
            console.log(this.attribute); //undefined
            console.log(this === window); //true (false if strict mode because it would be undefined)
        })();
    }
};

obj.foo();
```


#### Arrow functions
Arrow functions are not a shorten syntax for functions but a semantic change. They retains the value of the enclosing lexical context's this, so in other words **they have a lexical binding** to the object in which they are defined.

```javascript
(() => {
    console.log(this); //Window (undefined if strict mode)
})();

const object = {
    prop: 42,
    foo: function () {
        console.log(this.prop); //42
        console.log(this === object); //true
        (()=> {
            console.log(this.prop); //42
            console.log(this === object); //true
        })();
    }
};

object.foo();

object.foo(window);

```


## Call, Apply, Bind

# Closures

A closure is the mechanism that allows a nested function to _remember_ the variables of the ambit in which it was created. Those variables are known as "free" variables. In other words, any function defined inside another function is a closure because it remembers its lexical scope even if the parent function is already popped out from the call stack:

```javascript
function outer() {
    // The variable 'prop' is local to outer and should be erased once the execution of outer ends
    let prop = 'an awesome property';
    //We declare the function inner but it's not called yet.
    function inner() {
        //Log a non-local variable, but it's on the lexical scope (its parent)
        console.log(prop);
    };
    //Return the inner function, without being called.
    return inner;
};

//Assign outer into getInner.
const getInner = outer();
//Now getInner has the returned value of outer(): inner, but it's still not executed.
//To exeute inner, we must call it via getInner()
getInner(); //prints "an awesome property"

//getInner is a closure.
```

In the previous example, `getInner` is a closure because `outer` is called and when it returns a value (`inner` function) it is removed from the stack **and so does its variables**, so after that `getInner()` executes `inner` function, but as we can see, `prop` was erased when `outer` was removed from the stack. So, in this cases, JS engine _remember_ the lexical context of `inner` even if the parent function is not on the call stack; this is a closure.

# Hoisting
Is the way that JavaScript loads into memory functions and variables. Conceptually, JS moves all variables and function definitions to the top of the code so they can be used before their declaration. The fact is that before any assignation the variables will be `undefined`, because it won't have any value at all.

What happen is that when a scope is entered, the first thing which JS engine does is _searches_ for variables declaration and load them into memory but they are not initialised yet so their value will be undefined until we reach the assignation statement. That's the reason why we can use a function/variable even if they were declared before their usage.

```javascript
testHoisting(); //undefined undefined

function testHoisting() {
    foo(`${bar} ${state}`);

    var bar = 'Clousure';
}

function foo(msg) {
    console.log(msg);
}

var state = 'is working.';
```

The code above prints `undefined undefined`, but we are not getting an error because the usage of not defined variables, which is different. So that it's almost the same as the following code:

```javascript
//Declaration
var state;

function testHoisting() {
    //Declaration
    var bar;
    foo(`${bar} ${state}`);
    //Initialisation
    bar = 'Clousure';
}

function foo(msg) {
    console.log(msg);
}

testHoisting(); //undefined undefined

state = 'is working.';
```

### Differences between var, let and const
There's a huge difference between `var`, `let` and `const`. The keywords `let` and `const` allow us to declare variables in a block scope while `var` declares variables in the current functional scope (or global scope). Beyond that, the difference in terms of hoisting is that we can not use variables declared with `let` or `const` as we did with `var` before because they are on a _temporal dead zone_ because JS engine forces us to use those variables after we declare them. Note that `class` behaves the same way than `let` and `const`.

```javascript
console.log(b); //ReferenceError

let b = 'letter B'; //The same with const.
```

Anyway, this does not means that there's no hoisting for `let` and `const`. There is, but it work in a different way, because they're are flagged as _death_ until we reach their declaration.
### When to use hoisting
Short answer: never. It's not a feature that Javascript exposes to be used, it's a consequence that comes from the flow that JS engine take to interpret the code. Moreover, some code lints throw warning or errors if they detect that and that's the reason why `let` and `const` doesn't admit that. If we use the strict mode of JS using `'use strict'` at t he beggining of our code, the first example won't work.