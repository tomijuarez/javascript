const alwaysThrows = _ => { 
    throw new Error('OH NOES') 
};

const iterate = number => {
    console.log(number);
    return number + 1;
};

const logError = err => console.log(err.message);

Promise
    .resolve(1)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(alwaysThrows)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .then(iterate)
    .catch(logError);
