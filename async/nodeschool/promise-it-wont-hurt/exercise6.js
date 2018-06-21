const fulfilledPromise = Promise.resolve('FULFILLED!');
const rejectedPromise = Promise.reject(new Error('REJECTED!'));

const onReject = (error) => console.log(error.message);

fulfilledPromise.then(console.log);
rejectedPromise.catch(onReject);