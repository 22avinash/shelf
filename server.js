var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

var app = express();
var apiRoutes = require('./server/apiRoutes');

// configurations
var config = require('./server/config');
var port = process.env.PORT || 5000;

//database
mongoose.connect(config.database);
app.set('superSecret', config.secret);

//app.use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/app',express.static(__dirname+'/app'));
app.use('/node_modules', express.static(__dirname+'/node_modules'));
app.use(morgan('dev'));
app.use('/api', apiRoutes);


// basic routes
app.get('/', function(req, res){
	res.sendFile(__dirname+'/app/index.html');
});


//api routes

app.listen(port,function(){
	console.log("Listening on port "+port);
});

module.exports = app;