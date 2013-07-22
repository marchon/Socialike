console.log("starting");

var fs = require("fs");

var config = JSON.parse(fs.readFileSync("config.json"));

var host = config.host;
var port = config.port;

var express = require("express");

var app = express();

//app.use(app.router);
//app.use(express.static(process.env.PWD + "/"));
app.use(express.static(__dirname)); 
app.get("/", function(request, response) {
    response.send("Hello SVS!");
});

app.listen(port, host);