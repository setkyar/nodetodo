//server.js

// set up
var express 	= require('express');
var app			= express(); //create our app with express

var mongoose	= require('mongoose'); //mongoose for mongodb

var morgan		= require('morgan'); //log request to the console (express4)

var bodyParser 	= require('body-parser'); //pull information from HTML Post (express4)

var methodOverride = require('method-override'); //Simulate DELETE and PUT (express4)

// ==========Configuration==========

mongoose.connect('mongodb://localhost:27017/nodetodo'); //Connect to database
				  
app.use(express.static(__dirname + '/public')); //Set the static fiels location

app.use(morgan('dev')); //log every request to the console

app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded

app.use(bodyParser.json()); // parse application/json

app.use(bodyParser.json({ type: 'application/vnd.api+json' })); //parse application/vnd.api+json as json

app.use(methodOverride());

// ========== Listedn(start app with node server.js) ==========

app.listen(8080);
console.log('App listening on port 8080');

// ----------------Finish Configuration---------------

//defnine model 
var Todo = mongoose.model('Todo', {
	text : String
});

//Routes

//get all todos
app.get('/api/todos', function(req, res) {

	//use mongoose to get all todos from the databases;
	Todo.find(function(err, todos) {
		//if there is an error retrieving, send the errors, nothing after res.send(err) will all excute
		if (err)
			res.send(err)

		res.json(todos); //return all the todos in the json format
	});
});

//create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {
	//create a todo, information comes from AJAX request from Angular
	Todo.create({
		text	: req.body.text,
		done	: false
	}, function(err, todo) {
		if (err)
			res.send(err);

		//get and return all the todos after created another
		Todo.find(function(err, todos) {
			if (err)
				res.send(err)
			res.json(todos);
		});
	});
});

//delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo) {
		if (err)
			res.send(err);

		// get and return all the todos after created another one
		Todo.find(function(err, todos) {
			if (err)
				res.send(err)
			res.json(todos);
		});
	});
});

app.get('*', function(req, res) {
	debugger;
	res.sendfile('public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});