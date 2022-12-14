const {
    readCategories
} = require('../models');

const getCategories = (req, res, next) => {
    return readCategories().then((result) => {
        res.status(200).send({ categories: result });
    }).catch((err) => {
        next(err);
    });
}

module.exports = {
    getCategories
};