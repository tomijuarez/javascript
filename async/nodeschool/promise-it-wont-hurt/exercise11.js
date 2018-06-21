const all = (promises) => {

    let promisesFulfilled = 0;
    const results = [];

    return new Promise((fulfill, reject) => 
        promises.forEach((promise, index) => {
            Promise
            .resolve(promise())
            .then((result) => { results[index] = result; }, reject)
            .then(() => {
                ++promisesFulfilled;
                if (promisesFulfilled === promises.length)
                    fulfill(results)
             });
        })
    );
}

Promise
    .resolve(all([getPromise1, getPromise2]))
    .then(console.log).catch(console.log);