const express = require('express');
const categoryRouter = require('./api/category/index');
const notFound = require('./utils/notFoundHandler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/category', categoryRouter);

app.use(notFound);

module.exports = app;