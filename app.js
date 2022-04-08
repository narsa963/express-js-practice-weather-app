const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
res.sendFile(__dirname +"/index.html");

});
app.post("/", function(req, res){
  const query = req.body.cityName;
  const api ="e604c32bbb3c0e83b9b68146de8089b9"
  const unit = "metric"
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+api+"&units="+unit
  https.get(url, function (response){
    console.log(response.statusCode);
    if(response.statusCode ==200){
      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        const temp = weatherData.main.temp
        const weatherDiscription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = " http://openweathermap.org/img/wn/"+ icon+"@2x.png"
        res.write("<p>current weather condtion" +weatherDiscription+"</p>")
        res.write("<h1>the current weather in"+query+"is"+temp+" degree cel</h1>")
        res.write("<img src="+imageURL+">");
       res.send();
      })
    }else{
      res.write("oops check your cityname");
      res.send();
    }

    })


});

app.listen(3000, function(){
  console.log("sever stared port o 3000");
});
