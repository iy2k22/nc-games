const {
  readCategories,
  readReviews,
  readReviewById,
  readCommentsFromReview,
  putComment,
  patchVotes,
  readUsers
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

const patchComment = (req, res, next) => {
  if (req.body.inc_votes) {
    return patchVotes(req.params.review_id, req.body.inc_votes)
      .then((review) => {
        res.status(200).send({ review: review });
      })
      .catch((err) => {
        next(err);
      });
  } else next({ status: 400, msg: "Bad Request" });
};

const getUsers = (req, res, next) => {
  return readUsers().then((users) => {
    res.status(200).send({ users: users });
  }).catch((err) => {
    next(err);
  })
}

module.exports = {
  getCategories,
  getReviews,
  getReviewById,
  getCommentsFromReview,
  postComment,
  patchComment,
  getUsers
};
