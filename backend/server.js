const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv/config'); 

//ruta 
app.get("/", function(req, res){
    res.send("Neki kreativni tekst za probu :)")
});

app.get("/post", function(req, res){
    res.send("Neki post.")
});

//povezivanje sa DB
mongoose.connect(
      process.env.DB_Connection,
     { useNewUrlParser: true },
      () => console.log("Halo, da li se cujemo?"))

//osluskivanje servera
app.listen(9001);