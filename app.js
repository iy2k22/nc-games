const express = require('express');
const app = express();
const {
    getCategories,
    getReviews
} = require('./controllers');
const {
    handle404Errors
} = require('./errors');

app.get('/api/categories', getCategories);
app.get('/api/reviews', getReviews)
app.all('*', handle404Errors);

module.exports = app;