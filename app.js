const express = require('express');
const app = express();
const {
    getCategories
} = require('./controllers');
const {
    handle404Errors
} = require('./errors');

app.get('/api/categories', getCategories);
app.all('*', handle404Errors);

module.exports = app;