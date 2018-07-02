const findOccurrences = array =>
    array.reduce((acc, element) => {
        acc[element] = (acc[element] || 0) + 1;
        return acc;
    }, {});

module.exports = findOccurrences;