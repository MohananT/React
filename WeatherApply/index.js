const express = require('express');
const body_parser = require('body-parser');
let request = require('request');

const app = express();
const API_KEY = '28ef4e6d4c1601f7c17ec765d431d25f';

app.use(express.static('public'));
app.use(body_parser.urlencoded({extended:true}));
//SetUp template engine
app.set('view engine', 'ejs');

//Routing
app.get('/', function(req, res) {
    res.render('index', {weather : ''});
});

app.post('/', function(req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

request(url, function (err, response, body) {
  if(err){
    res.render('index', { weather : null, error : 'Please try again'});
  } else {
    var weather = JSON.parse(body);
    if(weather.main == undefined){
        var msg = "Weather for this city not found";
        res.render('index', { weather : msg, error : null});
    }
    else {
        var msg = `Its ${weather.main.temp} degress in ${weather.name}`;
        console.log(weather);
        res.render('index', { weather : msg, error : null});
    }
  }
});
});

app.listen(3000, function() {
    console.log('App Started - Port 3000');
});