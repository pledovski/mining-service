const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: 'string',
    required: true,
    unique: true
  },
  password: {
    type: 'string',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  }
});

module.exports = User = mongoose.model('user', UserSchema);