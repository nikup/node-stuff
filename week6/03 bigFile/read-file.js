var fs = require('fs'),
    liner = require('./liner'),
    argv = require('yargs').argv,
	filename = argv.input || "hehe.txt",
    source = fs.createReadStream(filename),
    bigint = require('bigint'),
    sum = bigint(0);

source.pipe(liner);

liner.on('readable', function () {
	sum = sum.add(bigint(liner.read()));
});

liner.on('end', function () {
	console.log(sum);
});