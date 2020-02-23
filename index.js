
// Line 4-45 containing a request code from outside server without any parameter

/*
//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");   // body-parser = body-parser extract the entire body portion of an incoming request stream and exposes it on req. body .
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  //console.log(req.body.Crypto);  // to fetch which crypto currency is selected

  request(" https://apiv2.bitcoinaverage.com/indices/global/ticker/" + req.body.Crypto + req.body.Fiat , function(error, response, body){

    // console.log(req.body.Crypto);
    // console.log(response.statusCode); // HTTSP Status code
    // console.log(body);

    var data = JSON.parse(body);  // Convert JSON body in JavaScript object
    var price = data.last;        // fetching last key from data just for example

    res.write("<p>The current date and time is: " + data.display_timestamp + "</p>"); // write functon is used when there are more than one elements to send
    res.write("<h1>The current price of " + req.body.Crypto + " is " + price + " " + req.body.Fiat + "</h1>");

    // res.send("<h1>The current price of " + req.body.Crypto + " is " + price + " " + req.body.Fiat + "</h1>"); // send function is used when there is only one element to sent

    res.send();

  });
});

app.listen(3000, function(req, res){
  console.log("Server is running on port 3000");
});
*/

// API call with parameter

//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
       from: req.body.Crypto,
       to: req.body.Fiat,
       amount: req.body.amount
    }
  };

  request(options, function(error, response, body){

    var data = JSON.parse(body);
    var price = data.price;

    res.write("<p>The current date and time is: " + data.time + "</p>");
    res.write("<h1>The current price of " + req.body.amount + " " + req.body.Crypto + " is " + price + " " + req.body.Fiat + "</h1>");

    res.send();

  });
});

app.listen(3000, function(req, res){
  console.log("Server is running on port 3000");
});
