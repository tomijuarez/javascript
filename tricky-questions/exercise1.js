/**
 * Result of this:
 */ 

[[123],[123]].map((value)=>{ return value *2 });

/**
 * The result will be [246, 246] because `map` goes to the deepest element of the array and in this case they're numbers.
 * If the array would be like [[1,2,3],[[[12]]]].map(value => value * 2); it would output [NaN, 24] because the deepest element at first position
 * is an array.
 */