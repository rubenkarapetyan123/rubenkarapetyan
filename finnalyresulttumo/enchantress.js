
class Enchantress extends Bomb{
    constructor(row,column){
        super(row,column)
    }
    check(){
        this.found = []
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] != 4 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] != 5 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] != 6){
                this.found.push(this.neighbors[i])
            }
        }
    }
    healthing(){
        for(let i in this.found){
            matrix[this.found[i][0]][this.found[i][1]] = 1
            grasses = grasses.filter((val)=>{
                return val.row != this.found[i][0] || val.column != this.found[i][1]
            })
            herbivores = herbivores.filter((val)=>{
                return val.row != this.found[i][0] || val.column != this.found[i][1]
            })
            cannibales = cannibales.filter((val)=>{
                return val.row != this.found[i][0] || val.column != this.found[i][1]
            })
            teleporters = teleporters.filter((val)=>{
                return val.row != this.found[i][0] || val.column != this.found[i][1]
            })
            let grass = new Grass(this.found[i][0],this.found[i][1])
            grasses.push(grass)
        }
    }
    move(){
        let i = getRandomInt(0,this.found.length)
        matrix[this.found[i][0]][this.found[i][1]] = 6
        matrix[this.row][this.column] = 1
        grasses = grasses.filter((val)=>{
            return val.row != this.found[i][0] || val.column != this.found[i][1]
        })
        herbivores = herbivores.filter((val)=>{
            return val.row != this.found[i][0] || val.column != this.found[i][1]
        })
        cannibales = cannibales.filter((val)=>{
            return val.row != this.found[i][0] || val.column != this.found[i][1]
        })
        teleporters = teleporters.filter((val)=>{
            return val.row != this.found[i][0] || val.column != this.found[i][1]
        })
        let grass = new Grass(this.row,this.column)
        grasses.push(grass)
        this.row = this.found[i][0]
        this.column = this.found[i][1]
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
    }
    do(){
        this.check()
        this.multiply2++
        if(this.multiply2 == 1){
            this.healthing()
        }else if(this.multiply2 == 2){
            this.move()
            this.multiply2 = 0
        }
    }
}
