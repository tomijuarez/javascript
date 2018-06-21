# Promise it won't hurt
Promises exercises.

## How to use
 - Run `npm install -g promise-it-wont-hurt`.
 - Once installed, run `promise-it-wont-help` and start coding.

## Exercises

### Warm up - Exercise 1 of 13

#### What is a promise?

One of the new features in ECMAScript 2015 (also called “ES6” and “Harmony”) is a new type of objects: promises. It extends the widely known Promise/A+ specification and standardizes it to be part of the language core.

In its most basic terms, a promise is an object that defines a method called then. The promise object represents a value that may be available some time in the future. It greatly simplifies asynchronous logic in JavaScript.

Compare the following code, written in the more traditional idiom of asynchronous callbacks, with no error handling:

```javascript
    Parse.User.logIn('user', 'pass', {
      success: function (user) {
        query.find({
          success: function (results) {
            results[0].save({ key: value }, {
              success: function (result) {
                // the object was saved
              }
            });
          }
        });
      }
    });
```

And the much more elegant Promise workflow, with first-class error handling:

```javascript
    Parse.User.logIn('user', 'pass').then(function (user) {
      return query.find();
    }).then(function (results) {
      return results[0].save({ key: value });
    }).then(function (result) {
      // the object was saved
    }).catch(function (err) {
      // an error happened somewhere in the process
    });
```
Promises make writing performant, asynchronous code much easier and more fun.

#### Task

For this first lesson, let’s review what we already know about asynchronous operations in JavaScript. Using `setTimeout`, print the string `'TIMED OUT!'` after 300ms.

### Fulfilling a Promise

Promises have an important internal property: its state. A promise is one of:

  * fulfilled,
  * rejected, or
  * pending, which is the state of a promise waiting to be fulfilled or rejected.

Sometimes you will also hear the term “resolved.” For now, you can treat it as meaning either fulfilled or rejected.

Most promises are created with `new Promise(executor)`, in which executor is a callback function with the signature `function (fulfill, reject)`. Inside executor, either `fulfill` or `reject` is called, to indicate the outcome of the operation. For promises, fulfilling means that the operation successfully completes and yields a value. In order to pass this value along, call `fulfill` function with this value as the first parameter.

As mentioned in the last lesson, a promise has a `then` property function. It is the main way of manipulating promises and their values. It takes two optional callback parameters `onFulfilled` and `onRejected`: the first will be called when the promise is fulfilled, and the second when the promise is rejected. When the `fulfill` function is called in executor with a value, the promise internals pass it along, and then call this first callback with the same value.

In practice, you can call the then property function multiple times, to do multiple things with the value of the promise. Or, more commonly, you could do them all in the same `onFulfilled` callback, which allows you to control more easily the logic flows.

If you call `fulfill` function in executor without a parameter, the `onFulfilled` callback(s) will still be called, but the parameter to those callbacks will be `undefined`.

We will talk about rejecting in our next lesson.

#### Setup

To use ES2015 Promises, you need either a JavaScript engine that supports it, or one of the many polyfills available. Node.js 0.12 or higher, and all versions of io.js, have native promise support. However, if you are stuck with an older version of Node.js, don’t fret: for this workshopper, a promise implementation will be automatically supplied if none is available.

When writing your own code, we recommend using es6-promise polyfill, since it aims to be strictly compliant to ES2015 without any extra features. To use es6-promise, execute the following in a shell:

```bash npm install es6-promise```

Then, in the main file in your app, add the following line:

```javascript require('es6-promise');```

Now you can use ES2015 promises everywhere!

#### Task

Create a promise. Have it fulfilled with a value of 'FULFILLED!' in executor after a delay of 300ms, using setTimeout.

Then, print the contents of the promise after it has been fulfilled by passing console.log to then.

#### Boilerplate
```javascript
    'use strict';

    var promise = new Promise(function (fulfill, reject) {
      // Your solution here
    });

    // Your solution here
```

### Rejecting a Promise

After the last session, you should be able to create a promise, fulfill it with a value, and read that value after the fulfillment of the promise. Now, not all promises result in a successful execution; some errors may have happened in the process. That's where promise rejection comes into play.

When a promise is rejected, this is typically (though not always) used to indicate that a value was not successfully obtained by the promise. Promises provide a way to pass the specific error that prevents the successful execution.

Once a promise has been rejected, it can never be fulfilled (nor rejected again). This aspect of promises will be explored deeper in the next lesson.

## Task

Create a promise that after a delay of 300ms, rejects with an `Error` object. The `Error` object should be constructed with parameter `'REJECTED!'`, which is the textual message of the error.

Create a function `onReject` to print `error.message` using `console.log`. Pass this function as a rejection handler to the `then` method of your promise.

## Hint

As a review from last lesson, a promise's then function takes two callbacks: the first to be called when the promise is fulfilled and the second when the promise is rejected.

## Boilerplate
```javascript
    var promise = new Promise(function (fulfill, reject) {
      // Your solution here
    });

    function onReject (error) {
      // Your solution here
    }

    // Your solution here
```

### What happens if we reject AND resolve a promise?

The ES2015 spec states that a promise, once fullfilled or rejected, may not change states for the rest of its lifetime. This is an important feature of promises and it is also one of the things that differentiates it from an `EventEmitter` (and other forms of repeatable callbacks).

Callback-style code usually requires a callback function to be invoked somewhere in the body of the function that it was passed to. Many, if not most times, that function is intended to be called only once. However, through errors in logic, problems with syntax, or other simple mistakes it is possible to call your callback multiple times and create vexing states in your app or insidious bugs.

```javascript
    /*
     * This code is bad, but nonetheless common and has the nasty result of
     * calling the supplied callback more than once (possibly destroying the
     * earth?). It is conventional to return the first invocation of callback
     * but it’s easy to overlook!
     */

    function myFunc(user, callback) {
      if (user) {
        callback(null, user);
      }

      return callback('No user was found', null);
    }
```

#### Task

Let’s build a simple script to prove to ourselves that promises may only resolve one time and all future attempts to resolve them will simply be ignored.

First, create a promise using the Promise constructor as we have been doing. In the promise’s `executor`, immediately attempt to fulfill the promise with a
value of `'I FIRED'`. Then, after the fulfill call, immediately try to reject the promise with an `Error` created with parameter `'I DID NOT FIRE'`.

After the promise creation, create a function `onRejected` with one parameter error that prints the Error’s message with `console.log`.

Lastly, pass `console.log` and the function you just created as the success and rejection handlers respectively.

If successful, your script should only log `“I FIRED”` and should not log `“I DID NOT FIRE”`.

Note that unlike the prior exercises, you do not have to use `setTimeout` with this.

### Are promises always resolved asynchronously?

The ES2015 spec declares that promises must not fire their resolution/rejection function on the same turn of the event loop that they are
created on. This is very important because it eliminates the possibility of execution order varying and resulting in indeterminate outcomes.

You can expect that the functions passed to the `then` method of a promise will be called on the next turn of the event loop.

#### Task

In this lesson, we are going to prove to ourselves that promises are always asynchronous.

First, create a promise using the Promise constructor.

In the promise’s executor, immediately fulfill the promise with a value of `'PROMISE VALUE'`.

After the creation of the promise, pass `console.log` as the success handler to the promise.

Finally, print out `“MAIN PROGRAM”` with console.log.

#### Hints

If the execution of promise is synchronous, the value of the promise is already known after its construction. The `console.log` passed into `then` would then be executed as soon as the `then` is called.

However, if your script is successful, you should see `“MAIN PROGRAM”` before `“PROMISE VALUE”`.

This shows you that despite the promise being resolved synchronously, the provided function is not executed until the next turn of the event loop.

### Promise me... quicker

The ES2015 specification defines some shortcuts that make creating and working with promises faster and easier.

The first is `.catch`. So far we already know how to handle the rejection of a promise -- through the second parameter to `.then` function. However, sometimes you only want to handle the rejection and not success. In these cases, since the `onFulfilled` callback is optional, you can specify `null` in place of it.  However, a much easier way to achieve this is to use `.catch`. Instead of having to write

```javascript
    promise.then(null, function (err) {
      console.error('THERE IS AN ERROR!!!');
      console.error(err.message);
    });
```

You could simply write
```javascript
    promise.catch(function (err) {
      console.error('THERE IS AN ERROR!!!');
      console.error(err.message);
    });
```

This notation also has the benefit of making the syntax easier to understand for people who do not speak `Promises` yet, since it is fairly obvious to everyone who has done JavaScript programming to understand what `catch` means.

The second and third are `Promise.resolve` and `Promise.reject`. The code examples below will tell you exactly what they do:

```javascript
    // The way you have learned: create promise through the constructor.

    var promise = new Promise(function (fulfill, reject) {
      fulfill('SECRET VALUE');
    });

    // Introducing: Promise.resolve
    // It does the exact same thing as above:

    var promise = Promise.resolve('SECRET VALUE');


    // Likewise...

    var promise = new Promise(function (fulfill, reject) {
      reject(new Error('SECRET VALUE'));
    });

    var promise = Promise.reject(new Error('SECRET VALUE'));
```

#### Task

We don’t have any specific task we’d like to assign to you for this lesson. Feel free to explore all three functions at your own pace. When you are preparing to submit though, make sure you are using at least catch and one of Promise.resolve and Promise.reject ☺

### Promise followed by promises

So far, you have handled promise fulfillment and rejection, but all your handlers have been done synchronously like printing text. What if you want to do something asynchronously?

Let us refer back to the example we used in the first lesson.

```javascript
    Parse.User.logIn('user', 'pass', {
      success: function (query) {
        query.find({
          success: function (results) {
            results[0].save({ key: value }, {
              success: function (result) {
                // the object was saved
              }
            });
          }
        });
      }
    });
```

Now, if all three functions return promises, you should be able to translate this code into:

```javascript
    Parse.User.logIn('user', 'pass').then(function (query) {
      query.find().then(function (results) {
        results[0].save({ key: value }).then(function (result) {
          // the object was saved
        });
      });
    });
```

That’s quite a lot better: the awkward `success` property functions have been replaced. However, the despised pattern of “callback hell” is still there: if you want to do more than three things the code will rack up fairly quickly.

To solve this problem, promises allow you to return another promise in the `then` function callbacks. This new promise you return in the promise will in turn be returned by `then`, so you can use it to do something after both of the actions are done. For example, the above code can be replaced by:

```javascript
    var originalPromise = Parse.User.logIn('user', 'pass');

    var findPromise = originalPromise.then(function (query) {
      // At this point, you have logged in.

      // query.find() returns another promise, which will become `findPromise`
      return query.find();
    });

    var savePromise = findPromise.then(function (results) {
      // At this point, the query finding is done.

      // The promise returned by `save` will become `savePromise`
      return results[0].save({ key: value });
    });

    savePromise.then(function (result) {
      // the object was saved
    });
```
which can then be simplified to:

```javascript
    Parse.User.logIn('user', 'pass').then(function (query) {
      return query.find();
    }).then(function (results) {
      return results[0].save({ key: value });
    }).then(function (result) {
      // the object was saved
    });
```

That’s quite beautiful, no?

#### Task

This task will allow you to demonstrate an understanding how to chain promises together using then.

Two functions will be provided as global functions that you can use: `first` and `second`.

Call the `first` function in your program. `first()` will return a promise that will be fulfilled with a secret value. 

Call the `second` with the fulfilled value of `first`. Return the promise returned by second in your `onFulfilled` callback.

Finally, print the fulfilled value of that new promise with `console.log`.

### Do I HAVE to return promises?

No! Fulfillment handlers may return promises or values. Your Promises library will do the correct thing and wrap your return value in a promise if need be. This is awesome because it allows you to intermix values with promises in a chain.

Imagine that you have a cache of models that may already contain a model you would like to request from the server. You could check your cache synchronously and return the found value or send an AJAX request to your remote server to fetch it.

Wrapping this functionality in a promise means that both behaviors can be consumed under a single abstraction:

```javascript
    doSomeSetup()
      .then(function () {
        return cache.fetchModel(id) || promisedAjax("users/" + id);
      })
      .then(displayUser)
```

The key thing to understand here is that your handlers will wrap your return values in promises even if they are obtained synchronously.

Another very important point to understand is that, as discussed before, the returned value will resolve on the next turn of the event loop.

#### Task

Construct a promise chain that returns values to prove to yourself that promise handlers will wrap your returned values in promises allowing additional chaining.
 - Declare a function `attachTitle` which prepends `'DR. '` to its firstargument and returns the result.
 - Create a fulfilled promise with a value of `'MANHATTAN'`.
 - Build a promise chain off the promise we just constructed that first calls `attachTitle` then calls `console.log`.

If your program runs successfully, it should print out “DR. MANHATTAN” which is extremely exciting.

### What happens when an error is thrown?

One of the tremendous strengths of promises is that they handle errors in a manner similar to synchronous code. Unlike in traditional callback-based code, you do not need to strictly handle all your errors at every step.

If an error is thrown inside a function, it can be captured.

If an error is thrown inside a function, it will be handled by the next available "rejection" handler. This allows you to write code that looks remarkably like a try/catch block would in synchronous code.

```javascript
    try {
      doSomethingRisky();
      doAnotherRiskyThing();
    } catch (e) {
      console.log(e.message);
    }
```

The equivalent "promisified" code might look like:

```javascript
    doSomethingRisky()
    .then(doAnotherRiskyThing)
    .then(null, console.log);
```
#### Task

Let's build exactly the system discussed above.

Some invalid JSON will be available on process.argv[2].

  * Build a function called `parsePromised` that creates a promise,performs `JSON.parse` in a `try`/`catch` block, and fulfills or rejects the promise depending on whether an error is thrown. **Note:** your function should synchronously return the promise!
  * Build a sequence of steps like the ones shown above that catchesany thrown errors and logs them to the console.

### There's always a catch… (lol pun)

Promises are designed to emulate synchronous control flows. If any of them throw an exception, the exception will bubble up through the stack until it is caught by a catch block or hits the global context where it will be thrown.

In the code below, each expression is evaluated one after the other. If any expression throws an exception, all subsequent expressions will not be executed and the catch block will catch and handle it.
```javascript
    try {
      doStuff()
      doMoreStuff()
    } catch (err) {
      complainAboutJavascript(err);
    }
```
With promises, we can achieve a very similar control flow as shown (assume all functions return promises):
```javascript
    doStuff()
    .then(doMoreStuff)
    .then(null, complainAboutJavascript);
```
Maybe we should combine the last two lines since one is a fulfill handler and the other is a rejection handler?  NO!  While this might initially seem sensible consider what would happen if `doMoreStuff` threw an error. Since the promise returned from it would be rejected, it would look for the next rejection handler to handle it.

Remember: A promise can never resolve more than once.

It is, therefore, a best practice to always put a rejection handler at the bottom of your promise chain (much like a catch block).

It is worth pointing out that both the synchronous and asynchronous code have the same problem.  If the rejection handler itself throws an error you are going to have a bad time.

Many promise libraries try to ameliorate this problem for you by providing a `done` handler that simply handles any uncaught errors.  The rule of thumb is this:

  > If you are **not** returning a value from your promise to a caller, then attach a `done` handler to guard against uncaught exceptions.

An example is shown below:
```javascript
    doStuff()
    .then(doMoreStuff)
    .then(null, complainAboutJavascript)
    .done();
```
#### Task

We are going to demonstrate this to ourselves by creating a chain of functions that all print to the console.

  * Create a function `alwaysThrows` that throws an `Error` withtext `"OH NOES"`;
  * Create a function `iterate` that prints the first argument(an integer) to it and then returns that argument + 1;
  * Create a promise chain using `Promise.resolve` that wraps your iterate method, then a series of iterations that attempts to perform `iterate` a total of 10 times.
  * Attach a rejection handler at the bottom of your chain to print the`error.message` using `console.log`.
  * Insert a call to `alwaysThrows` after your 5th call of `iterate`

If you have done this correctly, your code should print 1,2,3,4,5, "[Error: OH NOES]".  It's important to notice that the thrown exception was turned into a rejected promise which caused the rejected promise to travel down the promise chain to the first available rejection handler.

#### Bonus

Try swapping your rejection handler from `console.log` to alwaysThrows. Your program will now throw an exception in the global context!  Ahh! Try to fix this using the approach described above.

### Can you do what Async.js does?

When doing asynchronous programming you will often want to perform multiple operations in parallel. In some cases you may wish to delay further processing until a list of async operations have completed.

In synchronous code this is trivial because our operations are executed in the order they are specified:

```javascript
    var thingOne = getThing(1);
    var thingTwo = getThing(2);

    combine(thingOne, thingTwo);
```

We would like to build a function such that we can specify a list of asynchronous values we would like to fetch and then use once all are available.

```javascript
    getAll(fetch(1), fetch(2))
      .then(function (values) {
        console.log(values[0], values[1]);
      });
```

#### Task

Let’s build this function!

Create a function all that accepts two promises as arguments. This all function should do all of the following:

Create an internal promise in whatever way you see fit.

Create a counter variable with initial value of 0.

Attach then fulfillment handlers to both promises and increment the internal counter when the handlers are called.

When the counter reaches 2, fulfill the internal promise with an array containing both values.

Finally return that internal promise to the user.

After you finish writing your all function, pass getPromise1() and getPromise2() into your new function and then attach console.log as a fulfillment handler to the promise returned by your function. These two promise-returning functions will be provided to you in the global scope.

#### Hint

You probably want to use the good old Promise constructor. If you do find some other way, please [file an issue](https://github.com/stevekane/promise-it-wont-hurt/issues); I’m interested in such a solution!

While this lesson is a good practice for your skills, in real world programming, such a task is usually achieved by using Promise.all utility function, which we are basically reimplementing. It works by taking an iterable (like an array) of promises, rather than separate arguments. It also handles error catching, and any errors will be forwarded.

```javascript
    Promise.all([getPromise1(), getPromise2()])
      .then(onFulfilled, onRejected);
```
In this lesson though, rest assured that that Promise.all is disabled 😈