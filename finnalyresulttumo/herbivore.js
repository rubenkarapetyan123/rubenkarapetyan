
class Herbivore extends Global{
    constructor(row,column){
        super(row,column)
        this.ate = []
    }
    check(){
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 1){
                return 1
            }
        }
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 0){
                return 2
            }
        }
    }
    eating(){
        if(this.check() == 1){
            while(true){
                let i  = getRandomInt(0,8)
                if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 1){
                    grasses = grasses.filter((val)=>{
                        return val.row != this.neighbors[i][0] || val.column != this.neighbors[i][1]
                    })
                    this.ate.push(1)
                    matrix[this.neighbors[i][0]][this.neighbors[i][1]] = 2
                    matrix[this.row][this.column] = 0
                    if(this.ate.indexOf(-1) >= 0){
                        this.ate = []
                    }else if(this.ate.length > 5 && this.ate.indexOf(-1) < 0){
                        this.ate = []
                        matrix[this.row][this.column] = 2 
                        let herb = new Herbivore(this.row,this.column)
                        herbivores.push(herb)
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
        }else if(this.check() == 2){
            while(true){
                let i  = getRandomInt(0,8)
                if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 0){
                    this.ate.push(-1)
                    matrix[this.neighbors[i][0]][this.neighbors[i][1]] = 2
                    matrix[this.row][this.column] = 0
                    if(this.ate.indexOf(1) >= 0){
                        this.ate = []
                    }else if(this.ate.length > 5 && this.ate.indexOf(1) < 0){
                        this.ate = []
                        herbivores = herbivores.filter((val)=>{
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
    }
}