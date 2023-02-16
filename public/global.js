class Global{
    constructor(row,column){
        this.row = row
        this.column = column
        this.found = []
        this.multiply = 0
        this.eatedmushroom = false
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
    inMatrix(i){
        return this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1]
    }
    check(int,willreturn=true){
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0] < 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === int){
                return willreturn
            }
        }
    }
    newCordinates(i){
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
    }
    filterForBomb(i){
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
        teleporters = teleporters.filter((val)=>{
            return val.row != this.found[i][0] || val.column != this.found[i][1]
        })   
        Mushroomes = Mushroomes.filter((val)=>{
            return val.row != this.found[i][0] || val.column != this.found[i][1]
        })  
    }
    filterForEnchantress(i){
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
        Mushroomes = Mushroomes.filter((val)=>{
            return val.row != this.found[i][0] || val.column != this.found[i][1]
        })  
    }
    newCordinatesWithFound(i){
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
    clear(){
        grasses = grasses.filter((val)=>{
            return val.row != this.row || val.column != this.column
        })
        herbivores = herbivores.filter((val)=>{
            return val.row != this.row || val.column != this.column
        })
        cannibales = cannibales.filter((val)=>{
            return val.row != this.row || val.column != this.column
        })
        healthers = healthers.filter((val)=>{
            return val.row != this.row || val.column != this.column
        })
        teleporters = teleporters.filter((val)=>{
            return val.row != this.row || val.column != this.column
        })   
        Mushroomes = Mushroomes.filter((val)=>{
            return val.row != this.row || val.column != this.column
        })   
    }
    poisoned(){
        if(this.eatedmushroom == false){
            setTimeout(()=>{
                this.clear()
                matrix[this.row][this.column] = 5
                this.checkWithFound()
                for(let i = 0;i<this.found.length;i++){
                    this.filterForBomb(i)
                    matrix[this.found[i][0]][this.found[i][1]] = 5
                }
                setTimeout(()=>{
                    this.clear()
                    matrix[this.row][this.column] = 0
                    this.checkWithFound()
                for(let i = 0;i<this.found.length;i++){
                    this.filterForBomb(i)
                    matrix[this.found[i][0]][this.found[i][1]] = 0
                }
                },150)
          },5000)
        }
    }
    checkWithFound(){
        this.found = []
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100){
                this.found.push(this.neighbors[i])
            }
        }
    }
}