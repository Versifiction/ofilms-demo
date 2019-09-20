/* eslint-disable no-undef */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//   email: {
//     type: String,
//     lowercase: true,
//     trim: true,
//     unique: true,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   username: {
//     type: String,
//     unique: true,
//     required: true,
//     trim: true
//   },
//   fistname: String,
//   lastname: String,
//   sexe: String,
//   mobilePhone: Number,
//   postalCode: Number,
//   city: String,
//   creationDate: {
//     type: Date,
//     default: Date.now
//   },
//   lastConnection: Date,
//   isAdmin: Boolean,
//   isModerator: Boolean,
//   isConnected: Boolean
// });

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: String,
  lastname: String,
  sexe: String,
  mobilePhone: Number,
  departement: Number,
  city: String,
  creationDate: {
    type: Date,
    default: Date.now
  },
  lastConnection: Date,
  isAdmin: Boolean,
  isModerator: Boolean,
  isConnected: Boolean
});

module.exports = User = mongoose.model("users", UserSchema);
