let express = require('express');
let logger = require('morgan');
var PORT = 6020 || process.env.PORT





let app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/htmlroutes.js")(app);
require("./routes/apiroutes.js")(app);


app.listen(PORT,function(){
    console.log(`Listening to http://localhost:${PORT}`)
})