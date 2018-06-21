const attachTitle = name => `DR. ${name}`;
const fulfilledPromise = Promise.resolve('MANHATTAN');

Promise
    .resolve(fulfilledPromise)
    .then(attachTitle)
    .then(console.log);