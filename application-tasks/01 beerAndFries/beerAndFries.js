var _ = require('underscore');

var beerAndFries = function (items) {
	var beers = _.sortBy(_.filter(items, function(item) { return item.type == "beer"}), "score"),
		fries = _.sortBy(_.filter(items, function(item) { return item.type == "fries"}), "score");

	return _.reduce(_.zip(beers, fries), function(totalScore, combination){ 
		return totalScore + combination[0].score * combination[1].score; 
		}, 0);
}

//pure js version
//just for fun and to see how long it will be
//and yeah, i like reverse fors
var beerAndFriesNoUnderscore = function (items) {
	var beers = [],
		fries = [];

	for (var i = items.length - 1; i >= 0; i--) {
		if(items[i].type == "beer") {
			beers.push(items[i].score);
		} else {
			fries.push(items[i].score);
		}
	}

	var sortingFunction = function (a, b) {
		return a - b;
	};

	beers = beers.sort(sortingFunction);
	fries = fries.sort(sortingFunction);

	var	totalScore = 0;
	for (var i = beers.length - 1; i >= 0; i--) {
		totalScore += beers[i] * fries[i];
	}

	return totalScore;
}

exports.beerAndFries = beerAndFries;
exports.beerAndFriesNoUnderscore = beerAndFriesNoUnderscore;