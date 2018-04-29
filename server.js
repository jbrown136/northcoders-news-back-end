if (!process.env.NODE_ENV) process.env.NODE_ENV = "dev";
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const { test, dev } = process.env || require("./config/DB");
mongoose.Promise = Promise;
const apiRouter = require("./routers/api");
let db;
if (process.env.NODE_ENV === "dev") db = dev;
else if (process.env.NODE_ENV === "test") db = test;

mongoose
  .connect(db, { useMongoClient: true })
  .then(() => console.log("successfully connected to", db))
  .catch(err => console.log("connection failed", err));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use("/api", apiRouter);
app.get("/", (req, res) => {
  res.send("Welcome to the Northcoders News API");
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    if (err.message) res.status(404).send({ Error: err.message });
    else res.status(404).send({ Error: "page does not exist" });
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ Error: "Internal Server Error" });
});

module.exports = app;
