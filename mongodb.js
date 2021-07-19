const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/categories')
    .then(() => console.log("Connect to db done"))
    .catch(err => console.log("Dont connect to db"));