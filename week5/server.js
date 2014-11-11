var _ = require('underscore'),
    express = require ('express'),
    bodyParser = require('body-parser'),
    app = express();

function initialize(callback) {
  var collection = global.Db.collection("contacts");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", ["X-Requested-With", "Content-Type", "Access-Control-Allow-Methods"]);
    res.header("Access-Control-Allow-Methods", ["GET"]);
    next();
  });

  app.post('/create', function (request, responce) {
    collection.insert(request.body);

    responce.json({
     "status": "success"
    });
  });

  app.get('/contacts', function (request, responce) {
    collection.find().toArray(function(err, contacts) {
      responce.json(contacts);
    });
  });

  app.post('/contact', function (request, responce) {
    collection.find({personIdentifier: request.body.personIdentifier}).toArray(function(err, contacts) {
      console.log(contacts);
      responce.json(contacts);
    });
  });

  app.post('/delete', function (request, responce) {
    collection.remove({personIdentifier: request.body.personIdentifier});

    responce.json({
      "status": "success"
    });
  });

  app.listen(8000);
  callback();
};

module.exports = {
  initialize: initialize
}