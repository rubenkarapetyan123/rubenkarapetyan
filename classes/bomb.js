import Global from "./global.js"
import {colors,matrix} from "../index.js"

class Bomb extends Global{
    constructor(row,column){
        super(row,column)
        this.multiply = 2
        this.multiply2 = 0
        this.color = colors[matrix[this.row][this.column]]
        this.neighbors = [
            ...this.neighbors,
            [this.row - 2, this.column - 2],
            [this.row - 2, this.column - 1],
            [this.row - 2, this.column],
            [this.row - 2, this.column + 1],
            [this.row - 2, this.column + 2],
            [this.row - 1, this.column - 2],
            [this.row - 1, this.column + 2],
            [this.row, this.column - 2],
            [this.row, this.column + 2],
            [this.row + 1, this.column - 2],
            [this.row + 1, this.column + 2],
            [this.row + 2, this.column - 2],
            [this.row + 2, this.column - 1],
            [this.row + 2, this.column],
            [this.row + 2, this.column + 1],
            [this.row + 2, this.column + 2]
        ]
    }
    explosion(){
        if(this.multiply2 == 0){
            for(let i in this.found){
                matrix[this.found[i][0]][this.found[i][1]] = 5
                super.filterForBomb(i)
            }
            matrix[this.row][this.column] = 5
            this.multiply2++
        }else if(this.multiply2 == 1){
            for(let i in this.found){
                matrix[this.found[i][0]][this.found[i][1]] = 0
                super.filterForBomb(i)
            }
            bombs = bombs.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            matrix[this.row][this.column] = 0
            this.multiply2 = 0
        }
    }
    bomber(){
        this.checkWithFound()
        this.multiply++
        if(this.multiply > 7){
            this.explosion()
            if(this.multiply2 == 0){
                this.multiply = 0
            }
        }else if(this.multiply % 2 == 1){
            colors[4] = "black"
        }else if(this.multiply % 2 == 0){
            colors[4] = this.color
        }
    }
}


export default Bomb