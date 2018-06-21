const rejectPromise = new Promise((fulfill, reject) => 
    setTimeout(() => reject(new Error('REJECTED!')),300)
);

rejectPromise.then(
    null, //onFulfill
    (error) => console.log(error.message) //onReject
);