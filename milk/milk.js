var fs = require('fs');
var Q = require('q');
var readFile = Q.denodeify(fs.readFile);

var inputfile = 'codeiq_milk.csv';

main(inputfile).then(
    function (result) {
        console.log(JSON.stringify(result, null, '  '));
    }
);

function main(inputfile) {
    return readFile(
        inputfile, 'utf8'
    ).then(
        function (data) {
            var milk = new Milk(data);
            return milk.getAnswer(1);
        }
    );
}

var Milk = function (data) {
    var self = this;
    self.minCost = Number.MAX_VALUE;
    self.root = data.split(/\r?\n/).map(
        function (line) {
            return line.split(',').map(
                function (x) {
                    var cost = parseInt(x, 10);
                    if (cost < self.minCost) {
                        self.minCost = cost;
                    }

                    return cost;
                }
            );
        }
    );
    self.length = self.root.length;
};

Milk.prototype.heuristic = function (answer) {
    return answer.cost + (this.length - answer.root.length) * this.minCost;
};

Milk.prototype.getAnswer = function (start) {
    var self = this;
    // 0オリジンに変更
    start--;
    var answerList = [
        {
            cost : 0,
            root : [start],
            remain : []
        }
    ];
    var answer = answerList[0];
    var i;
    var lastPosition;
    for (i = 1; i < this.length; i++) {
        answer.remain.append(i);
    }

    answer.hueristicCost = this.heuristic(answer);

    while (true) {
        answer = answerList.pop(0);
        lastPosition = answer.root[answer.root.length - 1];
        answer.remain.map(
            function (x) {
                var newAnswer = {
                    cost : answer.cost + self.cost();
                };
            }
        );
    }
};
