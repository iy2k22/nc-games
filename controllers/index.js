const {
  readCategories,
  readReviews,
  readReviewById,
  readCommentsFromReview,
  putComment,
} = require("../models");

const getCategories = (req, res, next) => {
  return readCategories()
    .then((result) => {
      res.status(200).send({ categories: result });
    })
    .catch((err) => {
      next(err);
    });
};

const getReviews = (req, res, next) => {
  readReviews()
    .then((result) => {
      const newResult = result.map((obj) => {
        const newObj = { ...obj };
        newObj.comment_count = Number(obj.comment_count);
        return newObj;
      });
      res.status(200).send({ reviews: newResult });
    })
    .catch((err) => {
      next(err);
    });
};

const getReviewById = (req, res, next) => {
  readReviewById(req.params.review_id)
    .then((review) => {
      res.status(200).send({ review: review });
    })
    .catch((err) => {
      next(err);
    });
};

const getCommentsFromReview = (req, res, next) => {
  readCommentsFromReview(req.params.review_id)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
};

const postComment = (req, res, next) => {
  return putComment(req.params.review_id, req.body)
    .then((comment) => {
      res.status(201).send({ comment: comment });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCategories,
  getReviews,
  getReviewById,
  getCommentsFromReview,
  postComment,
};
