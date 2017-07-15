var express = require('express');
 
// Get the router
var router = express.Router();
var rest = require('restler');

var weatherModel = require('../models/weatherModel');

var weather_url = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
var weather_api_key = '36395be892112f17b47909b165aa532b';
 
// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
  console.log('Request Received: ', dateDisplayed(Date.now()));
  next();
});

router.get('/test', function(req, res) {
    res.json({ message: 'Welcome to the REST API' });   
});

router.route('/data/:zip')
    .get(function(req, res) {
    	getWeatherData(res, req.params.zip, 'us');
    });
router.route('/data/:zip/:country')
    .get(function(req, res) {
    	getWeatherData(res, req.params.zip, req.params.country);
    });


module.exports = router;

function getWeatherData(res, zip, country) {
	var b = '';
	var request_url = weather_url + zip + ',' + country + '&units=metric' + '&APPID=' + weather_api_key;
	console.log('Sending request: ' + request_url);
	rest.get(request_url).on('complete', function(result) {
    	console.log(result.cod); // Print the response status code if a response was received
	    res.send(result);  
	});
}
 
function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}