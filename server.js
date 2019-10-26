let express = require('express');
let logger = require('morgan');
let mongoose = require('mongoose');
let port = 6020;





let app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/articleScraper", { useNewUrlParser: true });

require("./routes/htmlroutes.js")(app);
require("./routes/apiroutes.js")(app);


app.listen(port,function(){
    console.log(`Listening to http://localhost:${port}`)
})