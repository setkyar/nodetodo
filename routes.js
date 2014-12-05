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
	res.sendfile('public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});