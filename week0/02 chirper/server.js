var http = require('http'),
    users = [],
    chirps = [],
    superUniqueCounter = 0;

http.createServer(function (req, res) {
    console.log(req.url);
    console.log(req.method);

    req.on('data', function(chunk) {
        console.log("Received body data:");
        console.log(chunk.toString());
    });

    req.on('end', function() {
        // empty 200 OK response for now
        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
        //res.end("PANDATIGAN");

        if(req.url.indexOf("/all_chirps") === 0) {
            console.log(req.url);
            console.log(req.method);
            res.end(getAllChirps());
        }
    });

}).listen(9615);

function createUser(name) {
    var key = generateUnique();
    users.push({name: name, key: key});
    return key;
}

function checkUserCredentials(name, key) {
    user = _.find(users, function (user) {
        return user.name = name;
    });

    if (user && user.key === key) {
        return true;
    }

    return false;
}

function createChirp(user, key, chirpText) {
    var chirpId = generateUnique();
    chirps.push = {
        chirpId: chirpId,
        user: user,
        chirpText: chirpText
    }
    return chirpId;
}

function getAllChirps() {
    return chirps;
}

function getUserChirps(user) {
    return _.filter(chirps, function(chirp) {
        chirp.user === user;
    });
}

function deleteChirp(chirpId, key) {
    var chirp = _.find(chirps, function (chirp) {
        return chirp.chirpId = chirpId;
    });

    if(checkUserCredentials(chirp.user, key)) {
        chirps.splice(chirps.indexOf(chirp), 1);
        return true;
    }

    return false;
}

function generateUnique() {
    superUniqueCounter += 1;
    return "kostenurkiteninja" + superUniqueCounter;
}