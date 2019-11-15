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
  ngo: [{
    type: Schema.Types.ObjectId,
    ref: "Ngo"
  }]
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;