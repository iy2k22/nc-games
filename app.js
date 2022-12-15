const express = require('express');
const app = express();
const {
    getCategories,
    getReviews,
    getReviewById
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

app.all('*', handleInvalidEndpoints);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handle500Errors);

module.exports = app;