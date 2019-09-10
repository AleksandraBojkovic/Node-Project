const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const issuesRoutes = require("./routes/issues.js");

const app = express();

//povezivanje sa DB
mongoose.connect(
  "mongodb+srv://aki:asdfgh12345@cluster0-e9ctu.mongodb.net/IssuesDB?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => console.log("Halo, da li se cujemo?")
);

app.use(bodyParser.json());
app.use("/issues", issuesRoutes);

//osluskivanje servera
app.listen(9001);
