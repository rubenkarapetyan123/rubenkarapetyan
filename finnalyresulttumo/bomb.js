
class Bomb extends Grass{
    constructor(row,column){
        super(row,column)
        this.found = []
        this.multiply = 2
        this.multiply2 = 0
        this.color = colors[matrix[this.row][this.column]]
    }
    check(){
        this.found = []
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100){
                this.found.push(this.neighbors[i])
            }
        }
    }
    explosion(){
        if(this.multiply2 == 0){
            for(let i in this.found){
                matrix[this.found[i][0]][this.found[i][1]] = 5
                grasses = grasses.filter((val)=>{
                    return val.row != this.found[i][0] || val.column != this.found[i][1]
                })
                herbivores = herbivores.filter((val)=>{
                    return val.row != this.found[i][0] || val.column != this.found[i][1]
                })
                cannibales = cannibales.filter((val)=>{
                    return val.row != this.found[i][0] || val.column != this.found[i][1]
                })
                healthers = healthers.filter((val)=>{
                    return val.row != this.found[i][0] || val.column != this.found[i][1]
                })
            }
            matrix[this.row][this.column] = 5
            this.multiply2++
        }else if(this.multiply2 == 1){
            for(let i in this.found){
                matrix[this.found[i][0]][this.found[i][1]] = 0
                grasses = grasses.filter((val)=>{
                    return val.row != this.found[i][0] || val.column != this.found[i][1]
                })
                herbivores = herbivores.filter((val)=>{
                    return val.row != this.found[i][0] || val.column != this.found[i][1]
                })
                cannibales = cannibales.filter((val)=>{
                    return val.row != this.found[i][0] || val.column != this.found[i][1]
                })
                healthers = healthers.filter((val)=>{
                    return val.row != this.found[i][0] || val.column != this.found[i][1]
                })
            }
            bombs = bombs.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            matrix[this.row][this.column] = 0
            this.multiply2 = 0
        }

    }
    bomber(){
        this.check()
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