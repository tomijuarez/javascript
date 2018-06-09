# Javascript

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

## CALLBACKS
- Callbacks are one way to handle ascynchronous tasks in JS.
- Some functions that accepts callbacks could be synchronous and others could by asynchronous. An example of a synchronous function that accepts a callback could be the following:
```javascript
[1,2,3].forEach(function(element) {
	console.log('first');
});

console.log('last');
```

this snippet will print: `first first first last`.

On the other hand we can find a functions that accepts a callback and has an async execution, like the following:

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
}
```

As we can see, if there's an error because the lack of the nickname in options the execution will be synchronous (`return callback(errors, null)`) and if there's a nickname it will be asynchronous because it will make a http request to some API (`request('get', 'api/users, nick, callback')`). This is not a good practice and should be avoided using `process.nextTick()`:

```javascript
function register(options, callback) {
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
}
```

Using this built-in function we can ensure this code is always asynchronous. `process.nextTick` is the way we say to node that we want something to execute "later", and the meaning of "later" will depend on the load of the different stages of the event loop.

