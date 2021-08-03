const express = require('express');
const categoryRouter = require('./api/category/index');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/category', categoryRouter);

app.use((req,res) => {
    res.status(404).send('Page NOT_FOUND')
})

module.exports = app;