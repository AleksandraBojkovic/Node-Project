const dotenv = require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const issuesRoutes = require("./routes/issues.js");


const app = express();

//povezivanje sa DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("Connected to DB!?")
);

app.use(bodyParser.json());

// CORS 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PATCH, POST, GET, DELETE, OPTIONS');
  next();
});

app.use("/issues", issuesRoutes);

//osluskivanje servera
app.listen(9001);
