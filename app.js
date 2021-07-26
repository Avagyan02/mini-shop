const express = require('express');
const categoryRouter = require('./api/category/index');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/category', categoryRouter);

module.exports = app;