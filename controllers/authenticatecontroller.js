
//var Cryptr = require('cryptr');
var express = require("express");

var connection = require('./../config');

exports.authenticate=function(req,res){
	var Email = req.body.Email;
	var Password = req.body.Password;
	
	connection.query('SELECT *  FROM users WHERE email = ?', [Email], function(error,results,fields){ 
	if(error) {
		res.json({
			status: false,
			message: "Error"
	})}
	else{
		//console.log(results.length);
		//console.log(results[0].password);
		if(results.length>0)
		{
			if(Password==results[0].password)
			{
				res.json({
					status: true,
					message: "Successfully Authenticated"
				})
			}
			else
			{
				res.json({
					status: false,
					message: "Email and Password does not match"
				});
			}
		}
		else
		{
			res.json({
				status: false,
				message: "Email does not exist"
			});
		}
	}
	});
}