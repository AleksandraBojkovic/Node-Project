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
app.use("/issues", issuesRoutes);

//osluskivanje servera
app.listen(9001);
