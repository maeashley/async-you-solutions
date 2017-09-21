/*Create a program that will receive two URLs as the first and second command-line arguments. Then using http.get, create two get requests, one to each URL and console.log any errors. use your callback as the third and final parameters. */

var http = require('http');
var async = require('async');

var twoUrls = [process.argv[2], process.argv[3]];

function getThings(item, callback) {
    //item.callsomeAsyncFunction
    var body = '';
    http.get(item, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            //async call complete, alert via callback
            callback(null);
        })
        res.on('error', function (err) {
            callback(err);
        });
    }).on('error', function (err) {
        callback(err);
    });

}

async.each(twoUrls, getThings, function (err, result) {
    //third parameter is the callback function for the whole thing
    if (err) {
        //        console.log('Your error was' + err);
        return;
    }
    console.log(result);
});
