
//var Cryptr = require('cryptr');
var express = require("express");

var connection = require('./../config');

exports.register=function(req,res){
	var today = new Date();
	//var encryptedString = req.body.Password;
	var users={
		"Name" : req.body.Name,
		"Email" : req.body.Email,
		"Password" : req.body.Password,
		"created_at" : today,
		"updated_at" : today
	}
	connection.query('INSERT INTO users SET ?',users,function(error,results,fields){
	if(error){
		res.json({
		status :false,
		message : "Error in Query"
		})
	}
	else {
			res.json({
				status: true,
				message: "USER REGISTERED SUCESSFULLY"
			})
	}
});
} 