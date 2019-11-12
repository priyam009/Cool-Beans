const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ngoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Ngo = mongoose.model("Ngo", ngoSchema);

module.exports = Ngo;