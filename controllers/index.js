const {
    readCategories,
    readReviews,
    readReviewById
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

const getReviewById = (req, res, next) => {
    const id = req.params.review_id;
    readReviewById(id).then((review) => {
        res.status(200).send({ review: review });
    }).catch((err) => {
        console.log(err);
        next(err);
    })
}

module.exports = {
    getCategories,
    getReviews,
    getReviewById
};