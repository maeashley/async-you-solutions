/*async.map does the same thing as async.each, but collects the results of the async iterator function and passes the results to the callback. The results are in an array that is in the same order as the original array. */
/*Write a program that will receive two cmd line arguments to 2 URLs. Console.log the results array.*/

var http = require('http');
var async = require('async');
var twoUrls = [process.argv[2], process.argv[3]];

function getThings(item, callback) {
    var body = '';
    http.get(item, function (res) {
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            callback(null, body);
        });
        res.on('error', function (err) {
            callback(err);
        });
    });
}

async.map(twoUrls, getThings, function callback(err, results) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(results);
});
