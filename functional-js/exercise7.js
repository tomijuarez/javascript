const reducerHelper = (cuttedArray, originalArray, previousResult, reducer, index) => {
    if (cuttedArray.length > 0) {
        return reducerHelper(
            cuttedArray.slice(1), 
            originalArray, 
            reducer(previousResult, cuttedArray[0], index, originalArray),
            reducer,
            index++
        );
    }
    return previousResult;
};

const reduce = (arr, reducer, initialValue) => {
    return reducerHelper(arr, arr, initialValue, reducer, 0);
};

module.exports = reduce;