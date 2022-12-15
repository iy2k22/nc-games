const {
    readCategories,
    readReviews
} = require('../models');

const getCategories = (req, res, next) => {
    return readCategories().then((result) => {
        res.status(200).send({ categories: result });
    }).catch((err) => {
        next(err);
    });
}

const getReviews = (req, res, next) => {
    readReviews().then((result) => {
        const newResult = result.map((obj) => {
            const newObj = {...obj};
            newObj.comment_count = Number(obj.comment_count);
            return newObj;
        })
        res.status(200).send({ reviews: newResult });
    }).catch((err) => {
        next(err);
    })
}

module.exports = {
    getCategories,
    getReviews
};