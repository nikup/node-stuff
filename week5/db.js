var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/test-database';

function initialize(callback) {
	MongoClient.connect(url, function(err, db) {
		global.Db = db;
		callback(err);
	});
}

module.exports = {
	initialize: initialize
}