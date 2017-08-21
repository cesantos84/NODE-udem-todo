/*db startup*/
	//cd C:\Program Files\MongoDB\Server\3.4\bin
	//mongod.exe --dbpath /web/Mongo-data
/*db startup*/
require('./config/config');

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	})
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	//valid id is using isValid
		//404 - send back empty send
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	//findById
	Todo.findById(id).then((todo) =>{
		if(!todo){
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
		//success
			//if todo - send it back
			//if no todo - send 404 w/ empty body
		//error
			//400 - send back empty
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	})
});

app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;

	//valid id is using isValid
		//404 - send back empty send
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	//findById
	Todo.findByIdAndRemove(id).then((todo) =>{
		if(!todo){
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
		//success
			//if todo - send it back
			//if no todo - send 404 w/ empty body
		//error
			//400 - send back empty
	/*Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	})*/
});

app.patch('/todos/:id', (res, req) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed) {
		body.completed = new Date().getTime();
	} else { 
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) =>{
		if(!todo){
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});

app.patch('/users', (res, req) => {
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);

	user.findByToken;
	user.generateAuthToken;

	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth').send(user);
	}).catch((e) => {
		res.status(400).send();
	});
});

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

app.listen(port, () => {
	console.log(`Started up at port ${port}`);
});

module.exports = {app};