const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema({
    name: {
        type: String,
        unique: true
    },
    password: String
});

module.exports = mongoose.model('Users', Users);