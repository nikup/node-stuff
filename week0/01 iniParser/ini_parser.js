var os = require('os'),
    _ = require('underscore'),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    iniPath = process.argv[2],
    iniFile, fileName = getFileName(iniPath),

    onResponse = function(response) {
        response.on('data', function(resData) {
            iniToJson(resData.toString(), fileName);
        });
    };

if (isUrl(iniPath)) {
    if (isHttps(iniPath)) {
        https.get(iniPath, onResponse);
    } else if (isHttp(iniPath)) {
        http.get(iniPath, onResponse);
    }
} else {
    iniFile = fs.readFileSync(iniPath, 'utf8');
    iniToJson(iniFile);
}

function iniToJson(iniFile) {
    var iniLines = _.filter(iniFile.split(os.EOL), function(line) {
        return line.replace(/^\s*[\r\n]/gm, "").length && line[0] != ";";
    }),
    result = {}, lastSection, keyValuePair;

    _.each(iniLines, function(line) {
        if (line[0] == "[") {
            lastSection = line.slice(1, line.length - 1).trim();
            result[lastSection] = {};
        } else {
            keyValuePair = line.split("=");
            result[lastSection][keyValuePair[0].trim()] = keyValuePair[1].trim();
        }
    });

    fs.writeFileSync(fileName, JSON.stringify(result, null, 2));
}

function getFileName(path) {
    var startPosition = path.lastIndexOf("/"),
        originalName, newName;

    startPosition = startPosition > 0 ? startPosition + 1 : 0;
    originalName = path.slice(startPosition, path.length);
    if(originalName.indexOf(".ini") >= 0) {
        newName = originalName.replace(".ini", ".json");
    } else {
        newName = originalName + ".json";
    }

    return newName;
}
function isUrl(str) {
    return isHttp(str) || isHttps(str);
}

function isHttp(str) {
    return str.indexOf("http") == 0;
}

function isHttps(str) {
    return str.indexOf("https") == 0;
}