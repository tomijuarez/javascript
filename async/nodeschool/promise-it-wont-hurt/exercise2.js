const fulfillPromise = new Promise((fulfill, reject) => 
    setTimeout(() => fulfill('FULFILLED!'), 300)
);

fulfillPromise.then((msg) => console.log(msg));
//or promise.then(console.log(msg));