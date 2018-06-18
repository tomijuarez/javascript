# Execution Context
In Javascript there are different execution contexts. There is a _global context_, a _function context_ and _eval context_. JS manage a stack called _execution context stack which is a queue containing all context names of the functions that were called in order to track them and apply `name mangling`.

## Global execution context
This is the default context. When the JS engine start the execution of the code, it is on the global context and it contains all the global code as part of the `window` object in browser context or `global` in nodejs.

## Functional execution context
Each function create a new execution context when it's called somewhere. This execution context is local to that function and the code in that context has access to `its global context` -not only the global context but the global context of that function (the functions that contains the function and the most global context of the program)-. While executing global execution context code, if there's a function call, JS engine will create a new context for that function.

## Eval
Execution context inside `eval` function, that can be setted from the user in order to add new code to the program. **EVAL IS EVIL**. 

# Closures

A closure is the mechanism that allows a nested function to _remember_ the variables of the ambit in which it was created. Those variables are known as "free" variables. In other words, any function defined inside another function is a closure because it remembers its lexical scope even if the parent function is already popped out from the call stack:

```javascript
function outer() {
    // The variable 'prop' is local to outer and should be erased once the execution of outer ends
    let prop = "an awesome property";
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

## _this_ keyword

## Call, Apply, Bind