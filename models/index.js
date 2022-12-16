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

const readReviewById = (id) => {
  return db.query(`SELECT * FROM reviews WHERE reviews.review_id = $1;`, [id])
  .then((result) => result.rows[0] || Promise.reject({ status: 404, msg: "error: review id not found" }));
}

const readCommentsFromReview = (id) => {
  return db.query(`SELECT * FROM comments WHERE comments.review_id = $1;`, [id])
  .then((result) => result.rows.length ? result.rows : Promise.reject({ status: 404, msg: `error: no comments found for id ${id}` }));
}
module.exports = {
  readCategories,
  readReviews,
  readReviewById,
  readCommentsFromReview
};
