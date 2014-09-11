var fs = require('fs');
var Q = require('q');
var readFile = Q.denodeify(fs.readFile);

var filename = 'ltsv_labels.ltsv';

readFile(
    filename, 'utf8'
).then(
    function (file) {
        var data = file.split('\n').map(
            function (line) {
                return line.split('\t').map(
                    function (data) {
                        return data.split(':', 2);
                    }
                ).reduce(
                    function (t, d) {
                        t[d[0]] = d[1];
                        return t;
                    },{}
                );
            }
        );

        console.log('Q1:' +
            data.filter(
                function (x) {
                    return x.recommended_label && x.recommended_label.charAt(0) == 'r';
                }
            ).length);
        console.log('Q2:' +
            data.filter(
                function (x) {
                    return x.description && x.description.indexOf('of') >= 0;
                }
            ).length);
        console.log('Q3:' +
            data.filter(
                function (x) {
                    return x.apache_format && x.apache_format.match(/[A-Z]/);
                }
            ).length);
        console.log('Q4:' +
            data.filter(
                function (x) {
                    return x.nginx_format && x.nginx_format.match(/time/);
                }
            ).length);
        console.log('Q4:' +
            data.filter(
                function (x) {
                    return x.recommended_label && x.recommended_label.match(/[siowa]/) && x.description && x.description.match(/[ta]/);
                }
            ).length);
    }
);