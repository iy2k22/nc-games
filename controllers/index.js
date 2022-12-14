const {
    readCategories
} = require('../models');

const getCategories = (req, res) => {
    return readCategories().then((result) => {
        res.status(200).send({ result: result });
    });
}

module.exports = {
    getCategories
};