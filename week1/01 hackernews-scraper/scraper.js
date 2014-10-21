var request = require('request'),
    fs = require('fs'),
    filePath = 'articles.json',
	previousMaxItem = JSON.parse(fs.readFileSync(filePath, 'utf8')).maxItem || 8453151,
    maxItem;

request('https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        maxItem = parseInt(body, 10);

        fs.writeFileSync(filePath, JSON.stringify({maxItem: maxItem}, null, 2));
        if(previousMaxItem < maxItem) {
            makeRequest(previousMaxItem + 1, maxItem);
        }
    }
});

function makeRequest(currentItem, maxItem) {
    var url = 'https://hacker-news.firebaseio.com/v0/item/' + currentItem + '.json?print=pretty';
    request(url, (function(currentItem) {
        return function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(JSON.parse(body).type);
            }
            console.log(currentItem);
            if (currentItem < maxItem) {
                makeRequest(currentItem + 1, maxItem);
            }
        }
    } )(currentItem));
}