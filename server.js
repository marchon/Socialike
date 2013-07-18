console.log("starting");
var port = process.env.PORT || 5000;
process.env.PWD = process.cwd()
//var fs = require("fs");

//var config = JSON.parse(fs.readFileSync("config.json"));

//var host = config.host;
//var port = config.port;

var express = require("express");

var app = express();

//app.use(app.router);
//app.use(express.static(process.env.PWD + "/"));
app.use(express.static(process.env.PWD)); 
app.get("/", function(request, response) {
    response.send("Hello SVS!");
});

app.listen(port);