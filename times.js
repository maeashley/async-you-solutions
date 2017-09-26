/*Write a program that will receive two command line arguments containing the hotname and port. Using http.request, send a POST request to ___ with the body of ____. Do this 5 times with each time the user_id++ (starting at 1)  Once these requests are done, send a get request to ___ and console.log the response body*/
debugger;
var http = require('http');
var async = require('async');
var hostname = process.argv[2];
var port = process.argv[3];
var url = 'http://' + hostname + ':' + port;

function postReq(callbackTop) {
    function getUser(n, callbackTimes) {
        var postData = JSON.stringify({
            user_id: n + 1
        });
        var options = {
            hostname: hostname,
            port: port,
            path: '/users/create',
            method: 'POST'
        };
        var req = http.request(options, function (res) {
            res.on('data', function (chunk) {
                console.log(chunk);
            });
            res.on('end', function () {
                callbackTimes(null, postData);
            });
            res.on('error', function (err) {
                callbackTimes(err);
            });
        });

        req.on('error', function (err) {
            callbackTimes(error);
        });
        req.write(postData);
        req.end();
    }
    async.times(5, getUser, function callback(err, data) {
        if (err) {
            callbackTop(err)
            return;
        }
        callbackTop(null, data)
    });
}

function getReq(callback) {
    var body = '';
    http.get(url + '/users', function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            callback(null, body);
        });
        res.on('error', function (err) {
            callback(err);
        });
    }).on('error', function (err) {
        callback(err);
    });
}
var myObject = {
    post: postReq,
    get: getReq
}
//use async.series. Pass in an object, one of the task functions will use async.times to send POST requests.
//The other task function(in the same object will do )
async.series(myObject, function (err, results) {
    if (err) {
        console.log(err);
    }
    console.log(results.get);
});
