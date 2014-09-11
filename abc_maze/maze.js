var fs = require('fs');
var Q = require('q');
var readFile = Q.denodeify(fs.readFile);

var inputfile = [
    'sample.in.txt',
    'case1.in.txt',
    'case2.in.txt',
    'case3.in.txt',
    'case4.in.txt',
    'case5.in.txt',
    'case6.in.txt',
    'case7.in.txt'
];

main(inputfile);

function main(inputfile) {
    Q.all(
        inputfile.map(
            function (filename) {
                return readFile(
                    filename, 'utf8'
                ).then(
                    function (data) {
                        var maze = new Maze(data);
                        maze.resolve();

                        if (maze.answer) {
                            return filename + ':possible';
                        }
                        else {
                            return filename + ':impossible';
                        }
                    }
                );
            }
        )
    ).done(
        function (results) {
            results.forEach(
                function (result) {
                    console.log(result);
                }
            );
        }
    );
}

var Maze = function (data) {
    var self = this;
    this.maze = {};

    var splitdata = data.split('\n').filter(
        function (x) {
            return x.length > 0;
        }
    ).map(
        function (row, y) {
            return row.split('').map(
                function (c, x) {
                    self.maze[x + ':' + y] = c;
                    return c;
                }
            );
        }
    );

    this.goal = (splitdata[0].length - 1) + ':' + (splitdata.length - 1);
};
Maze.prototype.check = function (x,y) {
    return this.maze[x + ':' + y];
};
Maze.prototype.delete = function (x,y) {
    this.maze[x + ':' + y] = null;
};
Maze.prototype.isGoal = function (x,y) {
    return this.goal == x + ':' + y;
};
Maze.prototype.resolve = function () {
    var self = this;
    var nextCharTable = {
        'A':'B',
        'B':'C',
        'C':'A'
    };
    var answerlist = [[[0,0, self.check(0,0)]]];
    var answer;
    var point;
    var nextChar;
    var nextPointList;
    var where;
    var isGoal = false;
    self.delete(0,0);


    while ((answer = answerlist.pop()) != null && !isGoal) {
//        console.log(answer);
        point = answer[answer.length - 1];
        nextChar = nextCharTable[point[2]];
        nextPointList = [
            [point[0] - 1, point[1], nextChar],
            [point[0] + 1, point[1], nextChar],
            [point[0], point[1] - 1, nextChar],
            [point[0], point[1] + 1, nextChar]
        ];

        nextPointList.forEach(
            function (point) {
                var x = point[0];
                var y = point[1];
                if (self.check(x,y) == point[2]) {
                    if (self.isGoal(x,y)) {
                        self.answer = answer.concat([point]);
//                        console.log(self.answer);
                        isGoal = true;
                    }
                    self.delete(x,y);
                    answerlist.push(
                        answer.concat([point])
                    );
                }
            }
        );
    }

    return isGoal;
};
