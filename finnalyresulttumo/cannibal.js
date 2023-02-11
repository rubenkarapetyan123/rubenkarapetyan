
class Cannibal extends Global{
    constructor(row,column){
        super(row,column)
        this.multiply = 0
        this.ate = []
    }
    check(){
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 2){
                return 1
            }else if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 1){
                return 2
            }
        }
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 0){
                return 3
            }
        }
    }
    eating(){
        this.multiply++
        if(this.multiply > 2){
            let a = this.check()
            if(a == 1){
                while(true){
                    let i  = getRandomInt(0,8)
                    if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 2){
                        herbivores = herbivores.filter((val)=>{
                            return val.row != this.neighbors[i][0] || val.column != this.neighbors[i][1]
                        })
                        this.ate.push(1)
                        matrix[this.neighbors[i][0]][this.neighbors[i][1]] = 3
                        matrix[this.row][this.column] = 0
                        if(this.ate.indexOf(-1) >= 0){
                            this.ate = []
                        }else if(this.ate.length >= 10 && this.ate.indexOf(-1) < 0){
                            this.ate = []
                            matrix[this.row][this.column] = 3 
                            let cannibal = new Cannibal(this.row,this.column)
                            cannibales.push(cannibal)
                        }
                        this.row = this.neighbors[i][0]
                        this.column = this.neighbors[i][1]
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
                        break
                    }
                }
            }else if(a == 2){
                while(true){
                    let i  = getRandomInt(0,8)
                    if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 1){
                        this.ate.push(1)
                        grasses = grasses.filter((val)=>{
                            return val.row != this.neighbors[i][0] || val.column != this.neighbors[i][1]
                        })
                        matrix[this.neighbors[i][0]][this.neighbors[i][1]] = 3
                        matrix[this.row][this.column] = 0
                        if(this.ate.indexOf(-1) >= 0){
                            this.ate = []
                        }else if(this.ate.length > 10 && this.ate.indexOf(-1) < 0){
                            let cannibal = new Cannibal(this.row,this.column)
                            cannibales.push(cannibal)
                            this.ate = []
                            matrix[this.row][this.column] = 3 
                        }
                        this.row = this.neighbors[i][0]
                        this.column = this.neighbors[i][1]
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
                        break
                    }
                }
        }else if(a == 3){
            while(true){
                let i  = getRandomInt(0,8)
                if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 0){
                    this.ate.push(-1)
                    matrix[this.neighbors[i][0]][this.neighbors[i][1]] = 3
                    matrix[this.row][this.column] = 0
                    if(this.ate.indexOf(1) >= 0){
                        this.ate = []
                    }else if(this.ate.length > 10 && this.ate.indexOf(1) < 0){
                        this.ate = []
                        cannibales = cannibales.filter((val)=>{
                            return val.row !== this.row || val.column !== this.column 
                        })
                        matrix[this.neighbors[i][0]][this.neighbors[i][1]] = 0
                        break 
                    }
                    this.row = this.neighbors[i][0]
                    this.column = this.neighbors[i][1]
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
                    break
                    }
                }
            }
            this.multiply = 0
        }
    }
}


