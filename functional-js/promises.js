const asyncOp = (number) => new Promise((fulfill, reject) => setTimeout(() => fulfill(number), 300));

asyncOp(5)
.then(console.log)
.then(() =>Promise.resolve(asyncOp(5)))
.then(console.log)
.then(() => Promise.resolve(asyncOp(42)))
.then(console.log);

let Person = {
    get firstName() { return '->'; },
    get lastName() { return ' - '; },
    set firstName(value) { this.firstName = value; },
    set lastName(value) { this.lastName = value; },
    get fullName() { return `${this.firstName} ${this.lastName}`; }
};

Person.name = 'Tomas';
Person.lastName = 'Juarez';

console.log(Person.fullName);