const db = require("../db/connection");

const readCategories = () => {
  return db.query(`SELECT * FROM categories;`).then((result) => result.rows);
};

const readReviews = () => {
  return db.query(`SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer,
  COUNT(comments.comment_id) AS comment_count
  FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id
  GROUP BY reviews.review_id
  ORDER BY created_at desc`).then((result) => result.rows);
};

const checkReviewExists = (id) => {
  return db.query(`SELECT reviews.review_id FROM reviews WHERE reviews.review_id = $1;`, [id])
  .then(({ rows }) => rows[0] || Promise.reject({ status: 404, msg: "error: review id not found" }))
}
const readReviewById = (id) => {
  return checkReviewExists(id).then(() => {
    return db.query(`SELECT * FROM reviews WHERE reviews.review_id = $1;`, [id])
  }).then(({ rows }) => rows[0])
}

const readCommentsFromReview = (id) => {
  return checkReviewExists(id).then(() => {
    return db.query(`SELECT * FROM comments WHERE comments.review_id = $1;`, [id])
  }).then(({ rows }) => rows)
}

const putComment = (id, comment) => {
  return checkReviewExists(id).then(() => {
    return db.query(`INSERT INTO comments(body, review_id, author)
    VALUES($1, $2, $3);`, [comment["body"], id, comment["username"]]);
  }).then(() => {
    const createdComment = {
      body: comment.body,
      review_id: Number(id),
      author: comment.username,
      votes: 0
    };
    return createdComment;
  })
}

module.exports = {
  readCategories,
  readReviews,
  readReviewById,
  readCommentsFromReview,
  putComment
};
