const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const questions = require("./routes/api/questions");
const levels = require("./routes/api/levels");
const users = require("./routes/api/users");
var cors = require("cors");

const app = express();

cors
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// // cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'localhost:3000');

  // // Request methods you wish to allow
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true }) // Let us remove that nasty deprecation warrning :)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/questions", questions);
app.use("/api/levels", levels);
app.use("/api/users", users);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
