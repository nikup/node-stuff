var _ = require('underscore'),
    express = require ('express'),
    bodyParser = require('body-parser'),
    app = express();

function initialize(callback) {
  var collection = global.Db.collection("locations");
  collection.ensureIndex({location : "2dsphere"});

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", ["X-Requested-With", "Content-Type", "Access-Control-Allow-Methods"]);
    res.header("Access-Control-Allow-Methods", ["GET"]);
    next();
  });


  app.post('/locations', function (req, res) {
      var place = req.body;

      collection.insert(
        {
           location : { type: "Point", coordinates: [ parseFloat(place.position.lng, 10), parseFloat(place.position.lat, 10)] },
           name: place.name,
           tags: place.tags
        }
     );

     res.json({
       "status": "success"
     });
  });

  app.get('/locations', function (req, res) {
      var result = [];
      collection.find(
      {
          location: {
             $nearSphere: {
                $geometry: {
                   type : "Point",
                   coordinates : [parseFloat(req.query.position.lng, 10), parseFloat(req.query.position.lat, 10)]
                },
                $maxDistance: req.query.range * 1000
             }
          },
          tags: {$all: req.query.tags}
      }).toArray(function(err, docs) {
          _.each(docs, function(point) {
              result.push({
                  name: point.name, 
                  coordinates: point.location.coordinates
              });
          });
          console.log(result);

          res.json(result);
      });
  });

  app.listen(8000);
  callback();
};

module.exports = {
  initialize: initialize
}