var grassArr = [];
var grasseaterArr = [];
var wolfArr = [];
var poisnArr = [];
var humanArr = [];
// var matrix = [
//     [2, 2, 0, 4, 4],
//     [1, 0, 0, 0, 0],
//     [0, 1, 0, 0, 0],
//     [0, 0, 1, 0, 0],
//     [1, 1, 0, 0, 0],
//     [1, 1, 0, 0, 0],
//     [3, 1, 0, 5, 0]
// ];

// matrix
// var matrix = [];
// var row = 50;
// var column = 50;
// for (var i = 0; i < row; i++) {
//     matrix[i] = [];
//     for (var j = 0; j < column; j++) {
//         matrix[i][j] = Math.round(Math.random()*6);
//     }
// }

function genMatrix(w, h) {
    var matrix = [];
    for(var y = 0; y < h; ++y) {
        matrix[y] = [];
        for(var x = 0; x < w; ++x) {
            var r = random(210);
            if     (r < 20) r = 0;
            else if(r < 150) r = 1;
            else if(r < 200) r = 2;
            else if(r < 202)r = 3;
            else if(r < 204)r = 4;
            else if(r < 206)r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

var side = 5;
var w = 100;
var h = 100;


function setup() {
    matrix = genMatrix(w, h);
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y,1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var gr = new GrassEater(x, y,2);
                grasseaterArr.push(gr);
            }
            else if (matrix[y][x] == 3) {
                var wf = new Wolf(x, y,3);
                wolfArr.push(wf);
            }
            else if (matrix[y][x] == 4) {
                var po = new Poisn(x, y,4);
                poisnArr.push(po);
            }
            else if (matrix[y][x] == 5) {
                var hu = new Human(x, y,5);
                humanArr.push(hu);
            }
    }
}
}
function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if(matrix[y][x] == 2){
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if(matrix[y][x] == 3){
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if(matrix[y][x] == 4){
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if(matrix[y][x] == 5){
                fill("black");
                rect(x * side, y * side, side, side);
            }

        }
    }
    for(var i in grassArr){
        grassArr[i].mul();
     }
     for (var i in grasseaterArr) {
            grasseaterArr[i].eat();
    }
    for(i in wolfArr){
        wolfArr[i].eat();
    }
    for(var i in poisnArr){
        poisnArr[i].mul();
    }
    for(i in humanArr){
        humanArr[i].eat();
    }



    
}

