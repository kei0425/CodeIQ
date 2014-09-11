var cluster = require('cluster');

if (cluster.isMaster) {
    var worker = cluster.fork();

    worker.send('hi there');

    cluster.on(
        'death',
        function (worker) {
            console.log('worker ' + worker.pid + ' died');
        }
    );

    worker.on(
        'message',
        function (msg) {
            console.log(msg);

            worker.kill();
        }
    );
}
else {
    process.on(
        'message', function (msg) {
            console.log(msg);
            process.send(msg + '!!!');
        }
    );
}