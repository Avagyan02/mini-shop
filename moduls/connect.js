const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/categories')
    .then(() => console.log("Success"))
    .catch(err => console.log("Dont connect"));
