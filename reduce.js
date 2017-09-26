/*Write a program that will receive a URL as the first command line argument. To this URL, for each of the values in the following array, send a GET request using http.get with a query parameter named number set at the prper value*/
//Each time, convert the response body to Number and add it to the previous value. Log the final reduced value

var async = require('async');
var http = require('http');
var numbers = ['one', 'two', 'three'];
var url = process.argv[2];

function iterate(sum, number, finalCallback) {
    http.get(url + '?number=' + number, function (res) {
        var body = '';
        res.on('data', function (chunk) {
            //each time, convert the response body to a number and add it to the previous value.
            body += chunk;
        });
        res.on('end', function () {
            //async call complete, alert via callback
            finalCallback(null, (sum += Number(body)));
        });
        res.on('error', function (err) {
            callback(error);
        });
    }).on('error', function (err) {
        finalCallback(err);
    });
}

//async.reduce(what is getting reduced, initial state, iteratee, final callback)
async.reduce(numbers, 0, iterate, function finalCallback(err, results) {
    if (err) {
        console.log(err);
    }
    console.log(results);
});
