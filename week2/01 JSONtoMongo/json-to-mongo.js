var MongoClient = require('mongodb').MongoClient,
    fs = require('fs'),
    _ = require('underscore'),
    jsonFile = process.argv[2];

// Connection URL
var url = JSON.parse(fs.readFileSync("config.json", 'utf8')).mongoConnectionUrl;

var insertDocuments = function(db, callback) {
	var data = JSON.parse(fs.readFileSync(jsonFile, 'utf8')),
  		collection = db.collection(jsonFile.replace(".json", ""));

  _.each(data, function (person) {
  	collection.insert(person);
  });

  callback();
},

findDocuments = function(db, callback) {
  var collection = db.collection(jsonFile.replace(".json", ""));

  collection.find({}).toArray(function(err, docs) {
    console.dir(docs);
    callback(docs);
  });      
};

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");
  
  insertDocuments(db, function() {
  	findDocuments(db, function() {
  		db.close();
  	});
  });
});