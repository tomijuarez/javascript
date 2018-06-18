
# Async Javascript for NodeJS

## Event-loop and code execution
- Is the component that allows node.js to perform non-blocking I/O operations.
- JS engine is single-threaded.
- JS engine has no idea of asynchrony or any sense of time.
- Each cycle of event-loop is called a "tick".
- For each event, if there's an event is waiting on the queue, it's taken off and executed. These events are actually the callbacks that we define.
- If there's many callbacks on the queue, it takes qonly one and the rest should wait.
- Event loop has 6 phases. Each phase has its own callbacks queue. 
- When event loop enter a given phase, it will perform any operation specific of that phase, then execute callback in that phases's queue until the queue has been exhausted or the maximum number of callbacks per phase has been reached. Once that happen, event loop will move into the next phase.
- setTimeout doesn't execute exactly at the time that you specify, but it ensures that the callback will be executed after that time.
- JS is single-threaded then the code execution of a function is atomic.
- Functions can not interrupt each other.
- If two or more processes don't interact, it's ok that they execute with nondeterminism (noninteracting).

## Callbacks
- Callbacks are one way to handle ascynchronous tasks in JS.
- Some functions that accepts callbacks could be synchronous and others could by asynchronous. An example of a synchronous function that accepts a callback could be the following:
  ```javascript
  [1,2,3].forEach(function(element) {
  	console.log('first');
  });

  console.log('last');
  ```
  this snippet will print: `first first first last`. On the other   hand we can find a functions that accepts a callback and has an   async execution, like the following:
  
  ```javascript
  setTimeout(function() {
    console.log('first');
  }, 1000);

  console.log('last');
  ```
  This snippet will print `last first`.

- Callback hell is a problem that arise when we use a lot of callbacks in our business logic. It has nothing to do with identation but with our interpretation of the execution flow. Also, when we read a source code, we have to know the execution schema of each function because sometimes we can face functions that accept callbacks that executes in async mode but often we can see some functions that accepts callbacks and are synchronous (or both depending on an input), so it's almost impossible to understand a source code that was no written by us, or even worse, our own code.

- Describe the execution of the following JS pseudocode:
  ```
  doA(function(){
    doB();

    doC(function(){
      doD();
    });

    doE();
  });

  doF();
  ```
  Execution: `A -> E -> B -> C -> E -> D`

- There's a common pattern called split callback design which consists of separate the successfull part from the error case. This is usually used on APIs and look likes `foo(data, success, error)` where success and error are functions defined by us.

- Another common pattern is called error-first style and it's a convention on node.js APIs. This implies that the first argument of the callback function is an error (if any) and the second one is tha data if the operation is successful. This looks like:

  ```javascript

  foo(data, (err, data) => {
    if (err) //do error handling.

    //do logic if success.
  });
  ```

- Callback could be synchronous or asynchronous. It's a bad practice to combine both schemas depending on a condition in the same function. Each function should be exclusively synchronous or asynchronous. When a function accepts a callback and is non-predictable regarding its schema of execution, we have to introduce `process.nexTick()` in order to make it always async. For instance, let's suppose we have the next function:

  ```javascript
  const register = (options, callback) => {
      const nick = (options.nick || '').trim();

      if (!nick) {
          errors.push(['nick', 'Please enter a nickname']);
      }

      if (errors.length > 0) {
          return callback(errors, null);
      }

      request('get', '/api/users', nick, callback);
  };
  ```

  As we can see, if there's an error because the lack of the nickname in options the execution will be synchronous (`return callback(errors, null)`) and if there's a nickname it will be asynchronous because it will make a http request to some API (`request('get', 'api/users, nick, callback')`). This is not a good practice and should be avoided using `process.nextTick()`:

  ```javascript
  const register => (options, callback) {
      const nick = (options.nick || '').trim();

      if (!nick) {
          errors.push(['nick', 'Please enter a nickname']);
      }

      if (errors.length > 0) {
        process.nextTick(function() {
            callback(errors, null);
          });

          return;
      }

      request('get', '/api/users', nick, callback);
  };
  ```

  Using this built-in function we can ensure this code is always asynchronous. `process.nextTick` is the way we say to node that we want something to execute "later", and the meaning of "later" will depend on the load of the different stages of the event loop.


## Promises

- A promise is a mechanism to manage asynchronous code in js. It's the natural replacement for callbacks as it solves the problems that we get using callbacks.

- Promises are also a flow-control mechanism for two or more steps in an asynchronous task.

- The creation of a new promise using the contructor expects a callback with two possible parameters: resolve and reject. Both parameters are functions that we eventually use in the creation of that promise to resolve it. 

- The callback passed in the constructor of the promise is not async deferred and its execution happen immediatly.

- The method `then` in promises registers the `fulfillment` and `rejection` event. Thus, no matter if we get a resolution or a rejection, the promise it's resolved.

- Once a promise get resolved, it will retain the same resolution (fulfillment or rejection) forever, and can be accessed as many times as we want. For instance:

  ```javascript
  const foo = () => {
    return new Promise((resolve, reject) => {
      //resolve or reject.
    });
  };


  const p = foo();

  p.then(bar1, errBar1);
  p.then(bar2, errBar2);

  ```

- It's a bad practice to name a method or a property of an object as `then`, because it may create bugs on promise-based coding. Sometimes developers check if some vriables are promises or `thenables` by duck-typing and it could be confused with a simple plain-object that has a `then` method.

- Another important characterist of promises is that they solve the **trust** issues with callbacks. 

 - It's impossible to **call to early** or **call too late** a callback like happens when we have a zalgo function using callbacks. The reason why is because the function `then` will be always called asynchronously even if we pass a constant through `resolve` or `reject` function. 
 - Also, we can be sure that we always will resolve out promises by being rejected or resolved, so it solves the **never calling the callback** issue. On the other hand, if we never call the `resolve` or `reject` method, we can use `Promise.race` to solve this problem setting a timeout for our promise:

    ```javascript
    const timeoutPromise = delay => {
      return new Promise((resolve, reject) => {
        setTimeout(
          () => reject("rejected."),
          delay
        );
      });	
    };

    Promise.race([
      foo(),
      timeoutPromise(3000) //3 seconds
    ])
    .then(
      () => {
        //foo it's fullfiled
      },
      (error) => {
        //foo was rejected or it took too much and the timeout was fired.
      }
    );
    ```
 - Promises solves the **calling too many times** issues that we get when using callbacks. Promises only takes the first resolution by `resolve` and `reject` and if we try to call those functions multiple times the promise will accept only the first and will ignore the following calls.

 - Also, promises solves the **swallowing any errors/exceptions** that occurs on callback schemas. If we reject the promise, we can set the error that we want to reflect. But, the big thing here is that if we make a runtime error (calla non-existing function, operate with undefined values, etc), then we can catch those errors the same way we handle the rejection of out promise:

    ```javascript
    const p = new Promise((resolve, reject) => {
      foo.bar(); //foo is undefined.
      resolve(42); //Never reached.
    });

    p.then(
      (msg) => {
        //Never gets here.
      },
      (error) => {
        //We can hanlde the error by using the undefined variable.
      }
    );

    ```

    they also provides a way for handle our errors on the resolved branch. One of the principles of promises is that if a promise is rejected or resolved, it can not change it's state during the program execution. This is because they're **immutable** for security reasons. So, we can't handle our errors like the following:

    ```javascript
    const p = new Promise((resolve, reject) => {
      resolve(42);
    });

    p.then(
      (msg) => {
        foo.bar(); //foo is undefined.
        console.log(msg); //Never gets here.
      },
      (error) => {
        //We can'not hanlde the error by using the undefined variable because the promise was already resolved and this is the rejected branch.
      }
    );

    ```
     but instead of doing that, we can chain a `catch` function:

    ```javascript
    //...

    p.then(
      (msg) => {
        foo.bar(); //foo is undefined.
        console.log(msg); //Never gets here.
      },
      (error) => { ... }
    ).catch(err => console.log(err)); //Handle error
    ```

  - If we pass an immediate value (non-async), non-promise, non-thenable value to `Promise.resolve()` we will get the same behaviour as we create a `new Promise` with two different promises
    ```javascript
    const p1 = new Promise((resolve, reject) => resolve(42));

    const p2 = Promise.resolve(42);

    //Both promises have the same behaviour but...
    p1 === p2; //false
    ```
    On the other hand, if we pass to the second promise a genuine promise, then we will get the same promise back, because once a promise is fulfilled, it will keep it's resolution forever.
    ```javascript
    const p1 = Promise.resolve(42);

    const p2 = Promise.resolve(p1);

    p1 === p2; //true
    ```

- Promises establish trust by using `resolve` method, so we can be sure we are using a promise. That's the reason why we don't must trust in thenable objects and assume that they're promises because has a `then` method. Someoune could make a mistake or insert malicious code as follows:

  ```javascript
  const p = {
    then: function(cb, err) {
      cb(42);
      err("muahahaha");
    }
  };

  p.then(
    (msg) => console.log(42), //Will execute this
    (err) => console.log(err) //And also this
  );
  ```

  so, a good practice to avoid this is to wrap a promise with `Promise.resolve` because if it has been already settled, it will keep only the first value (wether it was fulfilled or rejected) for they're immutabile. So we can do as follows:

  ```javascript
  // don't just do this:
  foo(42).then((v) => console.log( v ));

  // instead, do this:
  Promise
    .resolve(foo(42))
    .then((v) => console.log(v));
  ```

- We can easily chain promises that help us create async sequences of flow control, as follows:
  ```javascript
  Promise
    .resolve(21)
    .then(value => {
      console.log(value); //prints 21
      return v*2; //returns 42
    })
    .then(value => console.log(v)); //prints 42
  ```
  The reason why we can do this is because each time we invoke `then` method, it creates a `new Promise` behind the scenes and the value that we return on that function will be the fulfillment value for that promise. Even if we return a new Promise from then, it will unwrap the promise and fulfill it with the value that we passed in the constructor. So the code above could be rewritten as:
  ```javascript
  Promise
    .resolve(21)
    .then(value => {
      console.log(value); //prints 21
      return new Promise((resolve, reject) => {
        resolve(v*2);
      });
    })
    .then(value => console.log(v)); //prints 42
  ```
  it's better to keep things clear and use the first code.

- Promise chain is not only a flow control that expresses a multistep async sequence, but it also acts as a message channel to propagate messages from step to step.

- The error handling is not possible to be done using `try...catch` in promises' world, because it's asynchronous code and can not be handled in that way, unless we use generators. Instead, we can use `catch` method chained after our `then` methods, for instance:
	```javascript
	Promise
		.resolve(42);
		.then(msg => {
				//numbers don't have string functions, so will throw an error
				console.log(msg.toLowerCase());
			}
		}
	)
	.catch((err) => console.log(err)); //Handle errors.
	```

	In any case, even with `catch` we may get errors that still be unhandled: an error occured inside `catch`. For this particular issue, we can use `done`, and the errors inside `done` will be thrown globally (to the console, as a common error):
	```javascript
	Promise
		.resolve(42);
		.then(msg => {
				//numbers don't have string functions, so will throw an error
				console.log(msg.toLowerCase());
			}
		}
	)
	.done(null, err => console.log(err)); //Handle errors.
	```
- A promise chain coordinates a single async task at a given moment. If we have to handle more than one async task and do something after all that tasks finishes, we must use `Promise.all`:
    ```javascript
    const p1 = request('http://url.com/1');
    const p2 = request('http://url.com/2');
    const p3 = request('http://url.com/3');

    Promise
        .all([p1,p2,p3])
        .then((msgs) => {
            //All promises are resolved now.
        
            let str = "";
            msgs.map((msg) => str+=msg);
            return msgs;
        })
        .then(str=>console.log(msg));
    ```
    the order of all fulfillment messages are the same as the order specified in the promises array, regardless its fulfillment order, so we can know the position of each promise by reading the code. Note that the array passed to `Promise.all` can handle promises, thenables and also immediate values, because for each element of the array it will perform `Promise.resolve` to make sure that it's handling promises and normalize each value. If the array is empty the main promise is fulfilled. **If any promise fails at any point, it will discard all results for any other promises**.

- Sometimes we need only the first promise to be settled and get its value, regardless the other promises. For this logic we have to use `Promise.race`. It receives an array of promises and will be resolved as the result of the first resolution of the array of promises; if the first resolution is a fulfillment it would be fulfilled, otherwise, it would be rejected. If the passed array is empty, it will stay in `pending` state forever.
    ```javascript
    const p1 = new Promise((resolve, reject) => setTimeout(resolve, 500, 'one'));
    
    const p2 = new Promise((resolve, reject) => setTimeout(resolve, 100, 'two'));

    Promise.race([p1, p2]).then((value) => {
        // Both resolve, but p2 is faster
        console.log(value); // "two"
    });

    const p3 = new Promise((resolve, reject) => setTimeout(resolve, 100, 'three'));
    const p4 = new Promise((resolve, reject) => setTimeout(reject, 500, 'four'));

    Promise.race([p3, p4]).then(
        (value) => {
            // p3 is faster, so it resolves
            console.log(value); // "three"
        }, 
        (reason) => {
            // Not called
        }
    );

    const p5 = new Promise((resolve, reject) => setTimeout(resolve, 500, 'five'));
    const p6 = new Promise((resolve, reject)=> setTimeout(reject, 100, 'six'));

    Promise.race([p5, p6]).then(
        (value) => {
            // Not called
        }, 
        (reason) => {
            // p6 is faster, so it rejects
            console.log(reason); // "six"
        }
    );
    ```

