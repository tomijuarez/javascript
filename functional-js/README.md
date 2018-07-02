# Functional Javascript

## Exercises

### Hello World

#### Task

Write a function that takes an input string and returns it uppercased.

#### Arguments

  * input: a String of random words (lorem ipsum).

#### Boilerplate
```javascript
    function upperCaser(input) {
      // SOLUTION GOES HERE
    }

    module.exports = upperCaser
```
### Higher order functions
A higher-order function is a function that does at least one of the following:

  * Take one or more functions as an input
  * Output a function

All other functions are first order functions. [1]

Unlike many other languages with imperative features, JavaScript allows you to utilize higher-order functions because it has "first-class functions". This means functions can be treated just like any other value in JavaScript: just like Strings or Numbers, Function values can be stored as variables, properties on objects or passed to other functions as arguments. Function values are actually Objects (inheriting from `Function.prototype`) so you can even add properties and store values on them, just like any regular Object.

The key difference between Functions and other value types in JavaScript is the call syntax: if a reference to a function is followed by parenthesis and some optional comma-separated values: `someFunctionValue(arg1, arg2, etc)`, then the function body will be executed with the supplied arguments (if any).

In this exercise we're going to demonstrate that functions can be passed as values by passing you a function as an argument.

#### Task

Implement a function that takes a function as its first argument, a number num as its second argument, then executes the passed in function num times.

Use the boilerplate code given to you below to get started. Most/all future exercises will provide boilerplate.

##### Arguments

  * operation: A Function, takes no arguments, returns no useful value.
  * num: the number of times to call `operation`

##### Resources

  * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions_and_function_scope
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype

##### Hints

  * Don't overthink it, the code should be rather simple.
  * It's ok to use a loop in your implementation, bonus points if you use recursion instead.
  * You may notice some output. That is coming from the function we passed you.
  * You do not need to `console.log` anything.

##### Boilerplate

```javascript
    function repeat(operation, num) {
      // SOLUTION GOES HERE
    }

    // Do not remove the line below
    module.exports = repeat
```

### Map

#### Task

Convert the following code from a for-loop to Array#map:
```javascript
    function doubleAll(numbers) {
      var result = []
      for (var i = 0; i < numbers.length; i++) {
        result.push(numbers[i] * 2)
      }
      return result
    }

    module.exports = doubleAll
```
##### Arguments

  * numbers: An Array of 0 to 20 Integers between 0 and 9

##### Conditions

  * Your solution should use Array.prototype.map()
  * Do not use any for/while loops or Array.prototype.forEach.
  * Do not create any unnecessary functions e.g. helpers.

##### Resources

  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

##### Boilerplate
```javascript
    function doubleAll(numbers) {
      // SOLUTION GOES HERE
    }

    module.exports = doubleAll
```
### Filter

#### Task

Use `Array#filter` to write a function called `getShortMessages`.

`getShortMessages` takes an array of objects with `.message` properties and returns an array of messages that are less than < 50 characters long.

The function should return an array containing the messages themselves, without their containing object.

##### Arguments

  * messages: an Array of 10 to 100 random objects that look something like this:

    ```
    {
      message: 'Esse id amet quis eu esse aute officia ipsum.' // random
    }
    ```

##### Conditions

  * Do not use any for/while loops or Array#forEach.
  * Do not create any unnecessary functions e.g. helpers.

##### Hint

  * Try chaining some Array methods!

##### Example

    [ 'Tempor quis esse consequat sunt ea eiusmod.',
      'Id culpa ad proident ad nulla laborum incididunt.',
      'Ullamco in ea et ad anim anim ullamco est.',
      'Est ut irure irure nisi.' ]

##### Resources

  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

##### Boilerplate

    function getShortMessages(messages) {
      // SOLUTION GOES HERE
    }

    module.exports = getShortMessages

### Every Some

#### Task

Return a function that takes a list of valid users, and returns a function that returns true if all of the supplied users exist in the original list of users.

You only need to check that the ids match.

##### Example
```javascript
    var goodUsers = [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ]

    // `checkUsersValid` is the function you'll define
    var testAllValid = checkUsersValid(goodUsers)

    testAllValid([
      { id: 2 },
      { id: 1 }
    ])
    // => true

    testAllValid([
      { id: 2 },
      { id: 4 },
      { id: 1 }
    ])
    // => false
```
## Arguments

  * goodUsers: a list of valid users

Use `array#some` and `Array#every` to check every user passed to your returned function exists in the array passed to the exported function.

##### Conditions

  * Do not use any for/while loops or `Array#forEach`.
  * Do not create any unnecessary functions e.g. helpers.

##### Resources

  * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some

##### Boilerplate
```javascript
    function checkUsersValid(goodUsers) {
      return function allUsersValid(submittedUsers) {
        // SOLUTION GOES HERE
      };
    }

    module.exports = checkUsersValid
```

### Reduce 

#### Task

Given an Array of strings, use Array#reduce to create an object that contains the number of times each string occured in the array. Returnthe object directly (no need to console.log).

##### Example

```javascript
    var inputWords = ['Apple', 'Banana', 'Apple', 'Durian', 'Durian', 'Durian']

    console.log(countWords(inputWords))

    // =>
    // {
    //   Apple: 2,
    //   Banana: 1,
    //   Durian: 3
    // }
```
##### Arguments

  * inputWords: An array of random Strings.

##### Conditions

  * Do not use any for/while loops or Array#forEach.
  * Do not create any unnecessary functions e.g. helpers.

##### Resources

  * https://en.wikipedia.org/wiki/Reduce_(higher-order_function)
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

##### Boilerplate
```javascript
    function countWords(inputWords) {
      // SOLUTION GOES HERE
    }

    module.exports = countWords
```

### Recursion

#### Task

Implement `Array#reduce` using recursion.

To test your reduction works correctly we will use your reduce implementation to execute our solution to the previous basic_reduce problem. i.e. your reduce function will be passed an array of words, and a function, and an initial value which will return an object containing the counts for each word found in the array. You don't need to implement this functionality, it will be supplied to your reduce implementation.

For simplicity, your implementation of reduce need not replicate the behaviour of a reduce missing an initial value. You may assume the initial value will always be supplied.

## Arguments

  * arr: An Array to reduce over
  * fn: Function to use as the reduction step. Like regular Array#reduce, this function must be passed previousValue, currentValue, index and the array we're iterating over.
  * init: Initial value of the reduction. Unlike Array#reduce, this value is required (and you may assume it will always be supplied).

## Example

    // Your reduce function should behave the same as a
    // regular Array#reduce, but it will take the array
    // to operate on as the first argument:

    reduce([1,2,3], function(prev, curr, index, arr) {
      return prev + curr
    }, 0)
    // => 6

## Conditions

  * Do not use any for/while loops.
  * Do not use any Array methods like Array#map or Array#reduce.

## Resources

  * https://en.wikipedia.org/wiki/Recursion
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

## Boilerplate

    function reduce(arr, fn, initial) {
      // SOLUTION GOES HERE
    }

    module.exports = reduce