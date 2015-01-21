var fs = require('fs'),
	stream = require('stream'),
	argv = require('yargs').argv,
	filename = argv.output || "numbers.txt",
	limit = parseSize(argv.size) || 1, //MB
    source = new stream.Readable({ objectMode: true }),
    destination = fs.createWriteStream(filename);

source._read  = function () {
    var result = "";
	for (var i = 0; i < 1000; i++) {
        var number = (Math.floor(Math.random() * 1000000)).toString();
        result += number;
        result += ", \n";
    }
    source.push(result);

    if (getFilesizeInMegabytes(filename) > limit) {
    	source.push(null);
    }
}

source.pipe(destination);

function getFilesizeInMegabytes(filename) {
    var stats = fs.statSync(filename),
        fileSizeInBytes = stats["size"];

    return fileSizeInBytes / 1000000.0;
}

function parseSize(inputSize) {
	var ext = inputSize.slice(inputSize.length - 2),
		number = parseInt(inputSize,10);

	if (ext === "GB") {
		return number * 1024;
	}
	return number;
}