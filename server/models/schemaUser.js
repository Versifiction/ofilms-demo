const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const config = require("../config/config");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true
  },
  fistname: String,
  lastname: String,
  mobilePhone: Number,
  postalCode: Number,
  city: String,
  creationDate: Date,
  lastConnection: Date,
  isAdmin: Boolean,
  isModerator: Boolean,
  isConnected: Boolean
});

userSchema.methods = {
  authenticate: function(password) {
    return bcrypt.compareSync(password, this.password);
  },
  getToken: function() {
    return jwt.encode(this, config.secret);
  }
};

module.exports = mongoose.model("Users", userSchema);
