//Require Express
const express = require("express");
//Require Mongoose
const mongoose = require("mongoose");
//Require Cookie Parser
const cookieParser = require("cookie-parser");

//Initialise Express
const app = express();

// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

const routes = require("./routes");

//Add Port
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost/coolbeans";

//Connect to Mongo DB
mongoose.connect(mongoUrl);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
