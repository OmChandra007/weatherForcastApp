const express = require("express");// requiring express module.

const https = require("https");// requiring https module.

const bodyParser = require("body-parser");// using bodyParser to go through the body of html document and then read input based on cityName.



const app = express();

app.use(bodyParser.urlencoded({extended: false})); // we are leting our app to use body-parser.

// sending data on server.
app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");// gating data from that perticulaer location.

});

//using app.post to catch the post request data from our server.

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "7c857603336f250abe181e0844fb90f6";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&units="+unit+"&appid="+apiKey+"";
  https.get(url, function(response) {
    response.on("data", function(data) {
      const wetherData = JSON.parse(data);
      const temp = wetherData.main.temp;
      const disc = wetherData.weather[0].description;
      const icon = wetherData.weather[0].icon;
      const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<p>Wether Discription is " + disc + "</p>");
      res.write("<h1>The temprature in " + query +" is " + temp + " Degree Celcios.</h1>");
      res.write("<img src= " + imageURL + ">");

      res.send();

    });
  });

});


app.listen("3000", function() {
  console.log("Server has started on port 3000");
});
