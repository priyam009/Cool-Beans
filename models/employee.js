const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  ngo: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;