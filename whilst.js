/*Write a program that will receive a single command line argument to a URL. Using async.whilst and http.get, send GET requests to this URL until the response body contains the string "meerkat". console.log the amount of get requests needed to retrieve the meerkat string.*/

var async = require('async');
var http = require('http');
var url = process.argv[2];

var count = 0;
var doesntHave = true;

function truth() {
    return doesntHave !== 'meerkat';
}

function doThings(finalCallback) {
    http.get(url, function (res) {
        var body = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            //send the request until the response body contains the string "meerkat"
            doesntHave = body.trim();
            count++;
            finalCallback(null, count);
        });
        res.on('error', function (err) {
            callback(err);
        });
    }).on('error', function (err) {
        finalCallback(err);
    });
}

//async.whilst takes 3 functions:
//while this function is true, execute this function ,callback function 
async.whilst(truth, doThings, function finalCallback(err) {
    if (err) {
        console.log(err);
        return;
    }
    //don't print the results, print how many times around it took you to get to meerkat.
    console.log(count);
});
