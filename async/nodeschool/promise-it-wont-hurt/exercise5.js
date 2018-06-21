const immediatePromise = new Promise((fulfill, reject) => fulfill('PROMISE VALUE'));

immediatePromise.then(console.log);

console.log('MAIN PROGRAM');