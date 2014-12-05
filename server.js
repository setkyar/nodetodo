//server.js

// set up
var express 	= require('express');
var app			= express(); //create our app with express

var mongoose	= require('mongoose'); //mongoose for mongodb

var morgan		= require('morgan'); //log request to the console (express4)

var bodyParser 	= require('body-parser'); //pull information from HTML Post (express4)

var methodOverride = require('method-override'); //Simulate DELETE and PUT (express4)

//Database Configuration

	//load the config
	var databases = require('./config/database');

	mongoose.connect(database.url);	//connect to mongo db database
				  
app.use(express.static(__dirname + '/public')); //Set the static fiels location

app.use(morgan('dev')); //log every request to the console

app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded

app.use(bodyParser.json()); // parse application/json

app.use(bodyParser.json({ type: 'application/vnd.api+json' })); //parse application/vnd.api+json as json

app.use(methodOverride());

//Model Configuration
	
	//load mongoose since we need it to define a model
	var mongoose 	= require('mongoose');

	module.exports	= mongoose.model('Todo', {
		text : String,
		done : Boolean
	});

//Route Configuration
	
	//load the routes
	require('./app/routes')(app);

//See application port
app.listen(port);
console.log("App listening on port " + port);