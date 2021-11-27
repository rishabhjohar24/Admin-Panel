const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv").config();

const loginRoutes = require("./routes/login");
const showRoutes = require("./routes/show");

mongoose
  .connect("mongodb://localhost:27017/_admin", { useNewUrlParser: true })
  .then(() => {
    console.log("Monogo is Hot!!");
  })
  .catch((err) => {
    console.log("Something went wrong!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/user", loginRoutes);
app.use("/show", showRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
