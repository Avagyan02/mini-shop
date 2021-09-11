const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  surname: {
    type: String,
    trim: true,
    required: 'Surname is required',
  },
  email: {
    type: String,
    trim: true,
    required: 'Email address is required',
  },
  password: {
    type: String,
    trim: true,
    required: 'Password is required',
  },
  telephone: {
    type: Number,
    required: 'Telephone is required',
  },
  verified: {
    type: Boolean,
    default: false,
  },
  userCode: {
    type: Number,
    default: null,
  },
  restoreCode: {
    type: Number,
    default: null,
  },
  registerDt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: Number,
    required: true,
  },
});

const Users = mongoose.model('users', userSchema);
module.exports = Users;
