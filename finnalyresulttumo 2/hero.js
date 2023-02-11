class Hero{
    constructor(row,column){
        this.row = row
        this.column = column
        this.multiply = 0
        this.score = 0
        this.found = []
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
    check(){
        this.found = []
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100){
                this.found.push(this.neighbors[i])
            }
        }
    }
    kick(){ //nuyn texna jnjum
        this.check()
        for(let i = 0;i<this.found.length;i++){
            matrix[this.found[i][0]][this.found[i][1]] = 0
            cannibales = cannibales.filter((val)=>{
                return val.row != this.found[i][0] || val.column != this.found[i][1]
            })
            grasses = grasses.filter((val)=>{
                return val.row != this.found[i][0] || val.column != this.found[i][1]
            })
            herbivores = herbivores.filter((val)=>{
                return val.row != this.found[i][0] || val.column != this.found[i][1]
            })
            healthers = healthers.filter((val)=>{
                return val.row != this.found[i][0] || val.column != this.found[i][1]
            })
            teleporters = teleporters.filter((val)=>{
                return val.row != this.found[i][0] || val.column != this.found[i][1]
            })
            bombs = bombs.filter((val)=>{
                return val.row != this.found[i][0] || val.column != this.found[i][1]
            })
            this.score = this.score + scores[matrix[this.found[i][0]][this.found[i][1]]]
        }
    }
    moveup(){
        this.check()
        if(this.row - 1 >= 0 && this.row - 1 < 100){
            this.score = this.score + scores[matrix[this.row - 1][this.column]]
            matrix[this.row][this.column] = 0
            this.row = this.row - 1
            matrix[this.row][this.column] = 8
            cannibales = cannibales.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            grasses = grasses.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            herbivores = herbivores.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            healthers = healthers.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            teleporters = teleporters.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            bombs = bombs.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
        }
    }
    movedown(){
        this.check()
        if(this.row + 1 >= 0 && this.row + 1 < 100){
            this.score = this.score + scores[matrix[this.row + 1][this.column]]
            matrix[this.row][this.column] = 0
            this.row = this.row + 1
            matrix[this.row][this.column] = 8
            cannibales = cannibales.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            grasses = grasses.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            herbivores = herbivores.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            healthers = healthers.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            teleporters = teleporters.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            bombs = bombs.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
        }
    }
    moverigth(){
        this.check()
        if(this.column + 1 >= 0 && this.column + 1 < 100){
            this.score = this.score + scores[matrix[this.row][this.column + 1]]
            matrix[this.row][this.column] = 0
            this.column = this.column + 1 
            matrix[this.row][this.column] = 8
            cannibales = cannibales.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            grasses = grasses.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            herbivores = herbivores.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            healthers = healthers.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            teleporters = teleporters.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            bombs = bombs.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
        }
    }
    moveleft(){
        this.check()
        if(this.column - 1 >= 0 && this.column - 1 < 100){
            this.score = this.score + scores[matrix[this.row][this.column - 1]]
            matrix[this.row][this.column] = 0
            this.column = this.column - 1 
            matrix[this.row][this.column] = 8
            cannibales = cannibales.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            grasses = grasses.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            herbivores = herbivores.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            healthers = healthers.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            teleporters = teleporters.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            bombs = bombs.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
        }

    }
}
