var fs = require('fs');
var Q = require('q');
var readFile = Q.denodeify(fs.readFile);

var filename = 'magic_number.txt';

var oneprime_list = [2,3,5,7];

readFile(
    filename, 'utf8'
).then(
    function (file) {
        file.split('\n').map(
            getAnswer
        ).forEach(
            function (ans) {
                console.log(ans);
            }
        );
    }
);

function getNumbers(input) {
    if (input.length == 1) {
        return [input];
    }
    var matches = input.match(/^(\d)(\d+)$/);
    var firstnum = matches[1];
    var remainnum = matches[2];

    
}

function getAnswer(input) {
    input
}