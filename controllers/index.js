const {
    readCategories
} = require('../models');

const getCategories = (req, res) => {
    return readCategories().then((result) => {
        res.status(200).send(result);
    });
}

module.exports = {
    getCategories
};