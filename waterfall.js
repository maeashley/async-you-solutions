/*a get request to http://localhost:3131 in the first waterfall function. The response body is passed as an argument to the next waterfall function via the callback. The second function in the waterfall  accepts the body as a parameter and JSON.parse's it to get the *port property then it does another GET request.* */

//write a program that first reads the contents of a file. The path will be provided (process.argv[2]). The file will contain a single URL.Using http.get, create a get request to this url and console.log the response body.

var http = require('http');
var fs = require('fs');
var path = process.argv[2];

async = require('async');

//read the contents of the file
function readContents(callback) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            callback(err, null);
            return;
        }
        return callback(null, data);
    });
}
//retrieve the data from the file with an HTTP get request
function getInfo(url, callback) {
    http.get(url, function (res) {
        var body = '';
        res.setEncoding('utf8');
        res.on('data', function (data) {
            body += data;
        });
        res.on('end', function () {
            callback(null, body);
        });
        res.on('error', function (err) {
            callback(err);
        })
    });

}

//use the async library parse the response
async.waterfall([
     readContents,
    getInfo
], function (err, body) {
    console.log(body);
});
