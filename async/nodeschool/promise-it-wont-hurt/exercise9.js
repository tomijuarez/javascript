const parsePromised = rawData => new Promise((fulfill, reject) => {
    try {
        const jsonData = JSON.parse(rawData);
        fulfill(jsonData);
    }
    catch (error) {
        reject(new Error(error.message));
    }
});

const handleError = error => console.log(error.message)

Promise
    .resolve(parsePromised(process.argv[2]))
    .then(console.log, handleError)
    .catch(handleError);