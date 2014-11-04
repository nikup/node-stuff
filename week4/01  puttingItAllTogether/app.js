var server = require('./server');
var db = require('./db');

db.initialize(function(err) {
    if(err) {
        return console.log(err);
    }
    console.log('db initialized');

    server.initialize(function(err) {
        if(err) {
            return console.log(err);
        }
        console.log('server initialized');
    });  
})