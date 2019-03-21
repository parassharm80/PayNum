
var express = require("express");
var bodyParser = require("body-parser");

var connection = require('./config');
var app=express();

var ac = require("./controllers/authenticatecontroller");
var rc = require("./controllers/registercontroller");

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.get('/',function(req,res)
{
	res.send("Welcome :) ")
});
app.use(express.static('./html'));
app.post('/login',ac.authenticate);
app.post('/index',rc.register);
app.listen(8012);