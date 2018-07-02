const repeat = (operation, number) => {
    if (number > 0)
        repeat(operation, --number);
    
    return operation();
};

module.exports = repeat;