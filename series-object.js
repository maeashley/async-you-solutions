/**Write a program that will receive 2 urls as the first and second comand-line arguments. Create a get request 
to these urls and pass the response body to the callback. Pass in an object of task functions, using the property 
names requestOne and requestTwo, to async.series. console.log the reults in the callback for series when all the 
task functions have completed.*/

var http = require('http');
async = require('async');

function getStuff(url, callback) {
    var body = '';
    http.get(url, function (res) {
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
    });
}

async.series({
        requestOne: function (callback) {
            var url = process.argv[2];
            getStuff(url, callback);
        },
        requestTwo: function (callback) {
            var url = process.argv[3];
            getStuff(url, callback);
        }
    },
    function (err, results) {
        if (err) {
            console.log(err)
            return;
        }
        console.log(results);
    }
);
//async series can use an object, running each property and creating a result object with the same properties.
