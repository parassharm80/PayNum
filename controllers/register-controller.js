var nodemailer = require('nodemailer');
var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./../config');
cryptr = new Cryptr('myTotalySecretKey');
 
var from = 'paynumgroup@gmail.com';            //Your Email ID
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: from,
    pass: 'Paynum@103073'           //Write your password here
  }
});

module.exports.register=function(req,res){
    // var today = new Date();
    var EMail = req.body.email;
    var encryptedString = cryptr.encrypt(req.body.password);
    var user={
        "FName":req.body.Fname,
        "LName":req.body.Lname,
        "Password":encryptedString,
        "E_Mail":req.body.email,
        "Phone":req.body.phone,
        "DOB":req.body.DOB,
        "UserName":req.body.Username,
    }
    var uname = req.body.Username;
    connection.query('SELECT * FROM users WHERE username = ?',[req.body.Username], function (error, results, fields) {
        if(results.length > 0){
            res.send('<h1>Username '+uname+' not available !<br>Click <a href="/Sign-Up">here</a> to register again.');
        }
    else{
        connection.query('SELECT * FROM users WHERE E_Mail = ?',[req.body.email], function (error, results, fields) {
        if(results.length > 0){
            res.send('<h1>Email already registered !<br>Click <a href="/Sign-Up">here</a> to register again.');
        }
        else{
    connection.query('SELECT * FROM users WHERE Phone = ?',[req.body.phone], function (error, results, fields) {
        if(results.length > 0){
            res.send('<h1>Phone already registered !<br>Click <a href="/Sign-Up">here</a> to register again.');
        }
        else{

    connection.query('INSERT INTO users SET ?',user, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{

        connection.query('SELECT * FROM users WHERE username = ?',[req.body.Username], function (error, results, fields) {
        var acc = results[0].Account_Number;
        var bal = 1000;
        var mailOptions = {
        from: from,
        to: EMail,
        subject: 'Congrats! Account created successfully.',
        html: '<h1>Welcome ' + req.body.Username+',</h1><br><h2>Your account number is:' + acc + '</h1><br><h3>Account Balance: 0.00</h3>'
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } 
          else {
            console.log('Email sent !');
          }
        });

        res.send('<h1>Registration successful !<br>Click <a href="/login">here</a> to login.');
      });            
        }
    });
    }
});

    }
    }); 

    }
    });
}