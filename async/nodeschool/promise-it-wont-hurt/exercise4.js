const promise = new Promise((fulfill, reject) => {
    fulfill('I FIRED');
    reject(new Error('I DID NOT FIRE'));
});

const onFulfill = (successMessage) => console.log(successMessage);
const onReject = (error) => console.log(error.message);

promise.then(onFulfill, onReject);