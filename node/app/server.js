var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var path	   = require('path');
var morgan 	   = require('morgan');             // log requests to the console (express4)
var mongoose   = require("mongoose");

var messages   = require('./routes/messages');
var weather    = require('./routes/weather');

// mongoose.connect('mongodb://db/restdb')
mongoose.connect('mongodb://db/newtest')
 
// Express app will use body-parser to get data from POST
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    
 
// Set port
var port = process.env.PORT || 8080;        // set the port

// Define a prefix for all routes
// Can define something unique like MyRestAPI
// We'll just leave it so all routes are relative to '/'
app.use('/messages/api/v1', messages);
app.use('/weather/api/v1', weather);

// make '/app' default route
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/messages', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'messages.html'));
});
app.get('/weather', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'weather.html'));
});
 
// Start server listening on port 8080
app.listen(port);
console.log('RESTAPI listening on port: ' + port);