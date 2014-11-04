var chai = require("chai"),
    expect = chai.expect,
    Graph = require("./graph");

var assert = require("assert")
describe('Graph', function(){
    var graph1;

    beforeEach(function(done){
        graph1 = new Graph();
        done();
    });

    it('can add users', function(){
        graph1.addUser("nikup");
        expect(graph1.users).to.deep.equal({nikup: []});
    })

    it('can add neighbours', function () {
        graph1.addNeighbors("nikup", "mimipaskova");
        expect(graph1.users).to.deep.equal({nikup: ["mimipaskova"]});
    })

    it('returns neighbours for a user', function () {
        expect(graph1.getNeighborsFor("nikup")).to.deep.equal([]);

        graph1.addNeighbors("nikup", "mimipaskova");
        expect(graph1.getNeighborsFor("nikup")).to.deep.equal(["mimipaskova"]);
    })

    it('finds if there\'s path between users' , function () {
        expect(graph1.pathBetween("nikup", "test")).to.equal(false);

        graph1.addNeighbors("nikup", "rado");
        expect(graph1.pathBetween("nikup", "rado")).to.equal(true);

        graph1.addNeighbors("rado", "nikup");
        graph1.addNeighbors("rado", "mimipaskova");
        expect(graph1.pathBetween("nikup", "mimipaskova")).to.equal(true);
    })

    it('has a toString method', function () {
        expect(graph1.toString()).to.equal(JSON.stringify(graph1.users, null, 2));
    })
})