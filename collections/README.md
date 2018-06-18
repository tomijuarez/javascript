# ARRAYS

## Common methods

- `Array.some` is a method used to check y _any_ of the elements is `true`.  If that happens, the function will return true, if all elements are false, it will return false. 

  ```javascript
  //Check if at least there's an even number.
  javascript[2,3,5,7,9].some(number => (number % 2) === 0); //true
  [3,5,7,9].some(number => (number % 2) === 0); //false
  //Separated callback.
  const isEven = number => (number % 2) === 0;
  [2,3,5,7,9].some(isEven);
  ```
- `Array.every` returns true is every condition evaluated of ech element of the array is `true`. If any element is evaluated and the condition is false, the result of `every` will be `false`.

  ```javascript
  [2,4,6,8,9].every(number => (number % 2) === 0); //false
  [2,4,8].every(number => (number % 2) === 0); //true

  //Separated callback.
  const isEven = number => (number % 2) === 0;
  [2,4,8].every(isEven);
  ```
- `Array.map` **creates a new array** with the results of a **function** that has been applied on **each element** of the original array. So, summarizing:
  1. Takes an array and a function.
  2. Applies the function to every element in the original array.
  3. Keeps track of the result of each successive function call.
  4. Returns a **new array** containing these results, keeping the original array without any modification.
 
  This function is usually used for transform data (take only a subset of fields of all objects in an array), apply format to each register and stuff.
  ```javascript
  const users = [
    { firstName: 'Homer', lastName: 'Simpson' },
    { firstName: 'Marge', lastName: 'Simpson' },
    { firstName: 'Bart', lastName: 'Simpson' },
    { firstName: 'Lisa', lastName: 'Simpson' },
    { firstName: 'Maggie', lastName: 'Simpson' }
  ];

  users.map((reg) => reg.firstName); //[ 'Homer', 'Marge', 'Bart', 'Lisa', 'Maggie' ]

  /**
   * If we don't use `return` in map, it will create an array with the same size of the original with `undefined` elements
   */
  users.map((reg) => { reg.firstName }); //[ undefined, undefined, undefined, undefined, undefined ]
  ```
- `Array.reduce` is a method that allow us to perform aggregation operations over an array. This method is used when we want to return a value computed in base of the array elements. for this reason it provides four arguments in its callback: an accumulator, the current element, the current index and the original array. The accumulator carries the returned value from the previous execution of `reduce`  as the second parameter is the initial value. If the initial value is not present, then the function will start at index 1 avoiding index 0 so we can use the accumulator with the first value in order to avoid an undefined value.

  ```javascript
  [1,2,3,4,5,6,7,8,9].reduce((previous, current) => previous + current);

  //Flat a deep array:
  const _flat = (array) =>
    array.reduce ((acc, current) => {
        return Array.isArray(current) 
          ? [...acc, ..._flat(...current)] 
          : [...acc, current]
    },[]
  );
  ```