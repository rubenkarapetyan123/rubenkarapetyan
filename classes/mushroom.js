let Global = require("./global")


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = class Mushroom extends Global{
    constructor(row,column){
        super(row,column)
    }
    mull(){
        if(this.check(0)){
            this.multiply++
            if(this.multiply > 15){
                while(true){
                    let i  = getRandomInt(0,8)
                    if(this.inMatrix(i) && matrix[this.neighbors[i][0]][this.neighbors[i][1]] == 0){
                        matrix[this.neighbors[i][0]][this.neighbors[i][1]] = 8
                        let mushroom = new Mushroom(this.neighbors[i][0],this.neighbors[i][1])
                        Mushroomes.push(mushroom)
                        this.multiply = 0
                        break
                    }
                }
            }
        }
    }
}
