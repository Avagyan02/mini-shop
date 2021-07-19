const express = require('express');
const categoryRouter = require('./api/category/index');
const create = require('./api/category/post');
const readMany = require('./api/category/get_many');
const update = require('./api/category/put');
const delCat = require('./api/category/delete');
const read = require('./api/category/get_one');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/category', categoryRouter);
console.log(categoryRouter);

module.exports = app;
module.exports = categoryRouter;