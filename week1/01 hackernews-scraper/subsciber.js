var express = require ('express'),
    bodyParser = require('body-parser'),
    rand = require('generate-key'),
    _ = require('underscore'),
    fs = require('fs'),
    app = express(),
    filePath = './subscribers.json',
    subscribers;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post('/subscribe', function (req, res) {
    var subscriber;

    subscriber = {
        email: req.body.email,
        keywords: req.body.keywords,
        subscriberId: rand.generateKey(10),
    };

    subscribers = JSON.parse(fs.readFileSync(filePath, 'utf8')) || [];
    subscribers.push(subscriber);

    console.log('Subscribed ' + subscriber.email + " for " + subscriber.keywords);
    
    fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));

    res.json({
        email: subscriber.email,
        subscriberId: subscriber.subscriberId
    });
});

app.post('/unsubscribe', function (req, res) {
    subscribers = JSON.parse(fs.readFileSync(filePath, 'utf8')) || [];
    
    var subscriber = _.findWhere(subscribers, {subscriberId: req.body.subscriberId});
    if (subscriber) {
        subscribers.splice(subscribers.indexOf(subscriber), 1);
        fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));
        console.log('Unubscribed ' + subscriber.email + " : " + subscriber.subscriberId);

        res.json({
            result: "Unubscribed",
            subscriberId: req.body.subscriberId
        });
    } else {
        res.json({
            result: "Not found",
            subscriberId: req.body.subscriberId
        });
    }
});

app.get('/listSubscribers', function (req, res) {
    subscribers = JSON.parse(fs.readFileSync(filePath, 'utf8')) || [];
    res.json(subscribers);
});

console.log("Server at 8000");
app.listen(8000);