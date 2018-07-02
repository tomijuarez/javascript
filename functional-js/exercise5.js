const testAllValid = validUsers => {
    return users => users.every(user => {
        return validUsers.some(goodUser => goodUser.id === user.id);
    });
};

module.exports = testAllValid;