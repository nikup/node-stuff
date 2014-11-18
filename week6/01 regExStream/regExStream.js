var stream = require('stream'),
    regExStream = new stream.Transform( { objectMode: true } ),
    regEx = /^a/;
 
regExStream._transform = function (chunk, encoding, done) {
    var data = chunk.toString();
    if (data.match(regEx)) {
        this.push(data);
    }
    done();
}
 
module.exports = regExStream;