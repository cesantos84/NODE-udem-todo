//cd C:\Program Files\MongoDB\Server\3.4\bin
//mongod.exe --dbpath /web/Mongo-data
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	//findOneAndUpdate
	db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID('596faf7b5d7559b41d933659')
	}, {
		$set: {
			completed: false
		},
		$inc: {
			age: 1
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	//db.close();
});