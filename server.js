let express = require('express');
let logger = require('morgan');
let mongoose = require('mongoose');
let port = 6020;
let axios = require('axios');
let cheerio = require('cheerio');
let path = require ('path')

let db = require('./models');

let app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/articleScraper", { useNewUrlParser: true });



app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname + "/public/index.html"))
})








app.listen(port,function(){
    console.log(`Listening to http://localhost:${port}`)
})