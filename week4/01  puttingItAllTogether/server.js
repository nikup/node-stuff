var _ = require('underscore'),
    express = require ('express'),
    bodyParser = require('body-parser'),
    app = express();

function initialize(callback) {
  var Snippet = global.Db.model("Snippet");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", ["X-Requested-With", "Content-Type", "Access-Control-Allow-Methods"]);
    res.header("Access-Control-Allow-Methods", ["GET"]);
    next();
  });


  app.post('/create', function (req, res) {
    var newSnippet = new Snippet(req.body);
  });

  app.post('/update', function (req, res) {
      
  });

  app.post('/delete', function (req, res) {
      
  });

  app.get('/list', function (req, res) {
      
  });

  app.get('/listByCreator', function (req, res) {
      
  });

  app.get('/getById', function (req, res) {
      
  });

  app.listen(8000);
  callback();
};

module.exports = {
  initialize: initialize
}