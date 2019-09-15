const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  date: Date,
  writer: String,
  isMasked: Boolean
});

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
