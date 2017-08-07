const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5988ca71ea0f1a2f28b2c5de';
var userId = '598381bab67cd02a6cfd3305';

if(!ObjectID.isValid(id)){
	console.log('Id not valid');
}

Todo.find({
	_id: id
}).then((todos) => {
	console.log('Todos',todos);
});

Todo.findOne({
	_id: id
}).then((todo) => {
	console.log('Todo',todo);
});

Todo.findById(id).then((todo) => {
	if(!todo){
		return console.log('Id not found');
	}
	console.log('Todo By Id',todo);
}).catch((e) => console.log(e));

User.findById(userId).then((user) => {
	if(!user){
		return console.log('User Id not found');
	}
	console.log('User By Id',todo);
}).catch((e) => console.log(e));