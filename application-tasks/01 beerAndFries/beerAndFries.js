var _ = require('underscore');

var beerAndFries = function (items) {
	var beers = _.sortBy(_.filter(items, function(item) { return item.type == "beer"}), "score"),
		fries = _.sortBy(_.filter(items, function(item) { return item.type == "fries"}), "score");

	return _.reduce(_.zip(beers, fries), function(totalScore, combination){ 
		return totalScore + combination[0].score * combination[1].score; 
		}, 0);
}

exports.beerAndFries = beerAndFries;