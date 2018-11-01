//Grass

class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (newCell && this.multiply >= 3) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;

            var newGrass = new Grass(newX, newY, this.index);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}
// GrassEater

class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 7;
        this.index = index;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        var found = [];
        this.getNewCoordinates();
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var newCell = random(this.chooseCell(0));
        var newCell1 = random(this.chooseCell(4));
        if (newCell) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 2;
            this.x = newCell[0];
            this.y = newCell[1];
        }
        else if(newCell1){
            this.die();
        }
        this.energy--;
        if(this.energy <= 0){
            this.die();
        }
    }

    eat() {
        var newCell = random(this.chooseCell(1));
        var newCell1 = random(this.chooseCell(4))
        if (newCell) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 2;
            this.x = newCell[0];
            this.y = newCell[1];
            for (var i in grassArr) {
                if (grassArr[i].y == this.y && grassArr[i].x == this.x) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.energy++;
            if(this.energy >= 12){
                this.mul();
            }

        }
        else if (newCell1){
            matrix[this.y][this.x] = 0;
            matrix[newCell1[1]][newCell1[0]] = 2;
            this.x = newCell1[0];
            this.y = newCell1[1];
            for (var i in poisnArr) {
                if (poisnArr[i].y == this.y && poisnArr[i].x == this.x) {
                    poisnArr.splice(i, 1);
                    break;
                }
            }
            this.energy = 0;
            console.log("Էշի տղա");
            if(this.energy <= 0){
                this.die();
        }
        }
        else {
            this.move();
        }
    }

    mul(){
        var newCell = random(this.chooseCell(0));
        if(newCell && this.energy >= 10){
            var x = newCell[0];
            var y = newCell[1];

            for (var i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            var newGrasseater = new GrassEater(x,y,2);
            grasseaterArr.push(newGrasseater);
            matrix[y][x] = 2;

        } 
    }

    die(){
        matrix[this.y][this.x] = 0;

        for (var i in grasseaterArr) {
            if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y){
                grasseaterArr.splice(i,1);
                break;
            } 
        }
    }
 
    }

//GrassEterEter

class Wolf{
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.index = index;
        this.directions = [];
        this.lastPosIndex = 0;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }

    chooseCell(character) {
        var found = [];
        this.getNewCoordinates();
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {

        var newCell = random(this.chooseCell(0));
        var newCell1 = random(this.chooseCell(1));
        if (newCell) {
            matrix[this.y][this.x] = this.lastPosIndex;
            matrix[newCell[1]][newCell[0]] = 3;
            this.x = newCell[0];
            this.y = newCell[1];
            this.lastPosIndex = 0;
        }
        else if( newCell1){
            matrix[this.y][this.x] = this.lastPosIndex;
            matrix[newCell1[1]][newCell1[0]] = 3;
            this.x = newCell1[0];
            this.y = newCell1[1];
            this.lastPosIndex = 1;

        }
        this.energy--;
        if(this.energy <= 0){
            this.die();
        }
    }

    eat() {
        var newCell = random(this.chooseCell(2));
        var newCell1 = random(this.chooseCell(5));     
        if (newCell) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 3;
            this.x = newCell[0];
            this.y = newCell[1];
            for (var i in grasseaterArr) {
                if (grasseaterArr[i].y == this.y && grasseaterArr[i].x == this.x) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
            this.energy++;
            if(this.energy >= 50){
                this.mul();
            }

        }
        if (newCell1) {
            matrix[this.y][this.x] = 0;
            matrix[newCell1[1]][newCell1[0]] = 3;
            this.x = newCell1[0];
            this.y = newCell1[1];
            for (var i in humanArr) {
                if (humanArr[i].y == this.y && humanArr[i].x == this.x) {
                    humanArr.splice(i, 1);
                    break;
                }
            }
            this.energy+=15;
            if(this.energy >= 50){
                this.mul();
            }

        }
        else {
            this.move();
        }
    }

    mul(){
        var newCell = random(this.chooseCell(2));
        if(newCell && this.energy >=40){
            var x = newCell[0];
            var y = newCell[1];

            for (var i in grasseaterArr) {
                if (grasseaterArr[i].x == x && grasseaterArr[i].y == y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
            var newWolf = new Wolf(x,y,3);
            wolfArr.push(newWolf);
            matrix[y][x] = 3;

        } 
    }

    die(){
        matrix[this.y][this.x] = 0;

        for (var i in wolfArr) {
            if (this.x == wolfArr[i].x && this.y == wolfArr[i].y){
                wolfArr.splice(i,1);
                break;
            } 
        }
    }
 
    }

//GrassEaterKiller

class Poisn{
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (newCell && this.multiply >= 64) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            var newPoisn = new Poisn(newX, newY, this.index);
            poisnArr.push(newPoisn);
            this.multiply = 0;
        }
    }

}
//TheCrualAnimal
//GrassEaterEterKiller 
class Human{
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 50;
        this.index = index;
        this.directions = [];
        this.lastPosIndex = 0;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }

        chooseCell(character) {
        var found = [];
        this.getNewCoordinates();
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {

        var newCell = random(this.chooseCell(0));
        var newCell1 = random(this.chooseCell(1));
        var newCell2 = random(this.chooseCell(4));

        if (newCell) {
            matrix[this.y][this.x] = this.lastPosIndex;
            matrix[newCell[1]][newCell[0]] = 5;
            this.x = newCell[0];
            this.y = newCell[1];
            this.lastPosIndex = 0;
        }
        else if( newCell1){
            matrix[this.y][this.x] = this.lastPosIndex;
            matrix[newCell1[1]][newCell1[0]] =5;
            this.x = newCell1[0];
            this.y = newCell1[1];
            this.lastPosIndex = 1;
        }
        else if( newCell2){
            matrix[this.y][this.x] = this.lastPosIndex;
            matrix[newCell2[1]][newCell2[0]] = 5;
            this.x = newCell2[0];
            this.y = newCell2[1];
            this.lastPosIndex = 4;
        }        

        this.energy--;
        if(this.energy <= 0){
            this.die();
        }
    }

     eat() {
       
        var newCell = random(this.chooseCell(2));
        var newCell1 = random(this.chooseCell(3));
        if (newCell) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 5;
            this.x = newCell[0];
            this.y = newCell[1];
            for (var i in grasseaterArr) {
                if (grasseaterArr[i].y == this.y && grasseaterArr[i].x == this.x) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
            this.energy++;
            if(this.energy >= 100){
                this.mul();
            }

        }
        else if (newCell1){
            matrix[this.y][this.x] = 0;
            matrix[newCell1[1]][newCell1[0]] = 5;
            this.x = newCell1[0];
            this.y = newCell1[1];
            for (var i in wolfArr) {
                if (wolfArr[i].y == this.y && wolfArr[i].x == this.x) {
                    wolfArr.splice(i, 1);
                    break;
                }
            }
            // Էներգիան չի աճում քանի որ գայլի միսը ուտելու չէ ասինք կենդանիա մարդը բայց ոչ ետքան 
        }
        else {
            this.move();
        }
    }

    mul(){
        var newCell = random(this.chooseCell(2));
        if(newCell && this.energy >=5){
            var x = newCell[0];
            var y = newCell[1];
            for (var i in grasseaterArr) {
                if (grasseaterArr[i].x == x && grasseaterArr[i].y == y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
            var newHuman= new Human(x,y,5);
            humanArr.push(newHuman);
            matrix[y][x] = 5;

        } 
    }

    die(){
        matrix[this.y][this.x] = 0;

        for (var i in humanArr) {
            if (this.x == humanArr[i].x && this.y == humanArr[i].y){
                humanArr.splice(i,1);
                break;
            } 
        }
    }
 
}




