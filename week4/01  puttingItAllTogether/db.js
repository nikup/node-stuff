var mongoose = require('mongoose'),
    url = 'mongodb://localhost:27017/test-database';

function initialize(callback) {
    mongoose.connect(url);

    var db = mongoose.connection;
    db.on('error', callback);
    db.once('open', function() {
        var snippetSchema = new mongoose.Schema({
            language: String,
            fileName: String,
            value: String,
            creator: String,
            id: Number
        });
        mongoose.model('Snippet', snippetSchema);
        
        global.Db = mongoose;
        callback();
    });
}

module.exports = {
    initialize: initialize
}