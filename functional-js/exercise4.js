const getShortMessages = data =>
    data
    .filter((object) => object.message.length < 50)
    .map((element) => element.message);


module.exports = getShortMessages;