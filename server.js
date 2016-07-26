//npm install body-parser@1.13.3 --save

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();


var PORT = process.env.PORT ||3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('TODO api root');
});

//GET /todos
app.get('/todos', function(req, res){
	res.json(todos);
});
//GET /todos/:id
app.get('/todos/:id',function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos,{id: todoId});
	 /* same code using underscore!!!
	 // var matchedTodo;

	// todos.forEach(function (todo) {
	// 	if (todoId === todo.id) {
	// 		matchedTodo = todo; 
	// 	}
	// });
	*/

	if (matchedTodo) {
		res.json(matchedTodo);
	} else{
		res.status(404).send();
	}	
});

//POST /todos/
app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');
	 


	if (!_.isBoolean(body.completed)|| !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}
	
	body.description = body.description.trim();
	//add id field
	body.id = todoNextId++;
	
	//push data ont the array
	todos.push(body);
	
	res.json(body);
});

app.listen(PORT, function(){
	console.log('express listening on port '+PORT+ '!');
})