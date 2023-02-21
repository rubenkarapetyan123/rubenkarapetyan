let Bomb = require("./bomb")
let getRandomInt = require('../functions').getRandomInt
let Grass = require("./grass")
module.exports = class Enchantress extends Bomb{
    constructor(row,column){
        super(row,column)
    }
    check(){
        this.found = []
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.inMatrix(i) && matrix[this.neighbors[i][0]][this.neighbors[i][1]] != 4 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] != 5 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] != 6){
                this.found.push(this.neighbors[i])
            }
        }
    }
    healthing(){
        for(let i in this.found){
            matrix[this.found[i][0]][this.found[i][1]] = 1
            super.filterForEnchantress(i)
            let grass = new Grass(this.found[i][0],this.found[i][1])
            grasses.push(grass)
        }
    }
    move(){
        let i = getRandomInt(0,this.found.length)
        if(matrix[this.found[i][0]][this.found[i][1]] === 8){
            this.poisoned()
            this.eatedmushroom = true
        }
        matrix[this.found[i][0]][this.found[i][1]] = 6
        matrix[this.row][this.column] = 1
        super.filterForEnchantress(i)
        let grass = new Grass(this.row,this.column)
        grasses.push(grass)
        super.newCordinatesWithFound(i)
    }
    do(){
        this.check()
        this.multiply2++
        if(this.multiply2 == 1){
            this.move()
        }else if(this.multiply2 == 2){
            this.healthing()
            this.multiply2 = 0
        }
    }
}

