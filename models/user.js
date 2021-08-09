const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'Email address is required',
  },
  password: {
    type: String,
    trim: true,
    required: 'Password is required'
  }
})

const Users = mongoose.model('users', userSchema);
module.exports = Users;