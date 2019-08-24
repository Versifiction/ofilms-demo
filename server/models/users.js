const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema({
    id: {
        type: Number,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    password: String,
    email: String,
    fistname: String,
    lastname: String,
    phoneNumber : Number,
    adresse1: String,
    adresse2: String,
    postalCode: Number,
    city: String,
    creationDate: Date,
    lastConnection: Date,
    isAdmin: Boolean,
    isModerator: Boolean,
    isConnected: Boolean
});

module.exports = mongoose.model('Users', Users);