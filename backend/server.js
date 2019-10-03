const dotenv = require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const issuesRoutes = require("./routes/issues.js");   
const multer = require('multer');
const config = require('config');

const app = express();
const DIR = './routes/uploads';

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("Connected to DB!?")
);

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PATCH, POST, GET, DELETE, OPTIONS');
  next();
});

app.use("/issues", issuesRoutes);

app.listen(9001);

module.exports = app;
