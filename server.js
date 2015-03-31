console.log("starting");
var port = process.env.PORT || 5000;
process.env.PWD = process.cwd()

var compression = require('compression');
var express = require("express");

var express = require("express");

var app = express();

app.use(compression());

app.use(express.static(process.env.PWD));
app.get("/", function(request, response) {
    response.send("Hello SVS!");
});

app.listen(port);