var fs = require('fs');
var Q = require('q');
var readFile = Q.denodeify(fs.readFile);


readFile(
    'dictionary.txt', 'utf8'
).then(
    function (data) {
        return data.split('\n');
    }
);

function dataRead(err, text) {
    var table = text.split('\n').reduce(
        function (t, w) {
            
        },{}
    );
}
