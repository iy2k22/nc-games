const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
const {
    getCategories,
    getReviews,
    getReviewById,
    getCommentsFromReview,
    postComment,
    patchComment,
    getUsers
} = require('./controllers');
const {
    handleInvalidEndpoints,
    handleCustomErrors,
    handlePsqlErrors,
    handle500Errors
} = require('./errors');

app.use(express.json());

app.get('/api/categories', getCategories);
app.get('/api/reviews', getReviews)
app.get('/api/reviews/:review_id', getReviewById);
app.get('/api/reviews/:review_id/comments', getCommentsFromReview);
app.post('/api/reviews/:review_id/comments', postComment);
app.patch('/api/reviews/:review_id', patchComment);
app.get('/api/users', getUsers);

app.all('*', handleInvalidEndpoints);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500Errors);

module.exports = app;
