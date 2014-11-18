var fs = require('fs'),
    liner = require('./liner'),
    regExStream = require('./regExStream'),
    source = fs.createReadStream('./data.txt');

source.pipe(liner).pipe(regExStream);
regExStream.on('readable', function () {
    console.log(regExStream.read());
});