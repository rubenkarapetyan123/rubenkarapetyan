
let Bomb = require("./bomb")
let getRandomInt = require('../functions').getRandomInt
let Herbivore = require("./herbivore")
module.exports = class Teleporter extends Bomb{
    constructor(row,column){
        super(row,column)
    }
    checkifhavemove(){
        for(let i = 0;i<matrix.length;i++){
            if(matrix[i].indexOf(1) >= 0 || matrix[i].indexOf(6) >= 0 || matrix[i].indexOf(8) >= 0){
                return true
            }
        } 
        return false
    }
    check(){
        while(true){
            this.found = []
            let i = getRandomInt(0,matrixWidth)
            let j = getRandomInt(0,matrixHeight)
            if(matrix[i][j] == 1 || matrix[i][j] == 6 || matrix[i][j] == 8){
                this.found = [i,j]
                break
            }
        }
    }
    teleport(){
        this.multiply2++
        if(this.multiply2 > 8){
            if(this.checkifhavemove() == true){
                this.check()
                if(matrix[this.found[0]][this.found[1]] === 8){
                    this.poisoned()
                    this.eatedmushroom = true
                }
                matrix[this.found[0]][this.found[1]] = 7
                let herb = new Herbivore(this.row,this.column)
                herbivores.push(herb)
                matrix[this.row][this.column] = 2
                grasses = grasses.filter((val)=>{
                    return val.row != this.found[0] || val.column != this.found[1]
                })
                healthers = healthers.filter((val)=>{
                    return val.row != this.found[0] || val.column != this.found[1]
                })
                Mushroomes = Mushroomes.filter((val)=>{
                    return val.row != this.found[0] || val.column != this.found[1]
                })
                this.row = this.found[0]
                this.column = this.found[1]
                this.multiply2 = 0
            }else{
                matrix[this.row][this.column] = 0
                teleporters = teleporters.filter((val)=>{
                    return val.row != this.row || val.column != this.column
                })
            }


        }
    }
}

