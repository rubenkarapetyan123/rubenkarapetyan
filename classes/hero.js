let Global = require("./global")
module.exports = class Hero extends Global{
    constructor(row,column){
        super(row,column)
        this.score = 0
    }
    filterHero(i){
        this.filterForBomb(i)
        bombs = bombs.filter((val)=>{
            return val.row != this.found[i][0] || val.column != this.found[i][1]
        })
    }
    check(){
        this.neighbors = [
            [this.row - 1 , this.column - 1],
            [this.row - 1 , this.column + 1],
            [this.row - 1 , this.column],
            [this.row + 1 , this.column + 1],
            [this.row + 1 , this.column - 1],
            [this.row + 1 , this.column],
            [this.row , this.column - 1],
            [this.row , this.column + 1]
        ]
        this.found = []
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.inMatrix(i)){
                this.found.push(this.neighbors[i])
            }
        }
    }
    attack(){ 
        this.check()
        for(let i = 0;i<this.found.length;i++){
            this.score = this.score + scores[matrix[this.found[i][0]][this.found[i][1]]]
            matrix[this.found[i][0]][this.found[i][1]] = 0
            this.filterHero(i)
        }
    }
    moveup(){
        this.check()
        if(this.row - 1 >= 0 && this.row - 1 < 100){
            this.score = this.score + scores[matrix[this.row - 1][this.column]]
            matrix[this.row][this.column] = 0
            this.row = this.row - 1
            matrix[this.row][this.column] = 9
            this.clear()
        }
    }
    movedown(){
        this.check()
        if(this.row + 1 >= 0 && this.row + 1 < 100){
            this.score = this.score + scores[matrix[this.row + 1][this.column]]
            matrix[this.row][this.column] = 0
            this.row = this.row + 1
            matrix[this.row][this.column] = 9
            this.clear()
        }
    }
    moverigth(){
        this.check()
        if(this.column + 1 >= 0 && this.column + 1 < 100){
            this.score = this.score + scores[matrix[this.row][this.column + 1]]
            matrix[this.row][this.column] = 0
            this.column = this.column + 1 
            matrix[this.row][this.column] = 9
            this.clear()
        }
    }
    moveleft(){
        this.check()
        if(this.column - 1 >= 0 && this.column - 1 < 100){
            this.score = this.score + scores[matrix[this.row][this.column - 1]]
            matrix[this.row][this.column] = 0
            this.column = this.column - 1 
            matrix[this.row][this.column] = 9
            this.clear()
        }

    }
}
