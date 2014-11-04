function Graph() {
    this.users = {};
}

Graph.prototype = function () {
    var addUser = function(userName) {
        if (this.users[userName]) {
            return;
        }

        this.users[userName] = [];
    },

    addNeighbors = function(source, target) {
        this.addUser(source);

        //TODO: ensure uniqueness at some point
        this.users[source].push(target);
    },

    getNeighborsFor = function(userName) {
        this.addUser(userName);
        return this.users[userName];
    },

    pathBetween = function(source, target, reached) {
        var newSourse = this.getNeighborsFor(source);
        reached = reached || [];

        for (var i = 0; i < newSourse.length; i++) {
            if (newSourse[i] === target) {
                return true;
            } else if(reached.indexOf(newSourse[i]) === -1) {
                console.log(newSourse[i]);
                reached.push(newSourse[i]);
                return this.pathBetween(newSourse[i], target, reached);
            };
        };
        return false;
    },

    toString = function() {
        return JSON.stringify(this.users, null, 2);
    };

    return {
        addUser: addUser,
        addNeighbors: addNeighbors,
        getNeighborsFor: getNeighborsFor,
        pathBetween: pathBetween,
        toString: toString
    }
}();

module.exports = Graph;