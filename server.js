//Require Express
const express = require("express");
//Require Mongoose
const mongoose = require("mongoose");

const path = require("path");
const routes = require("./routes");

//Add Port
const PORT = process.env.PORT || 3001;

//Initialise Express
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

//Connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/coolbeans");

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
