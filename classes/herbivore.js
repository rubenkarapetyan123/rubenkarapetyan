let getRandomInt = require('../functions').getRandomInt
let Global = require("./global")
module.exports = class Herbivore extends Global{
    constructor(row,column){
        super(row,column)
        this.ate = []
    }
    check(){
        if(super.check(1,1) == 1 || super.check(8,1) == 1){
            return 1
        }else if(super.check(0,2) == 2){
            return 2
        }
    }
    eatHerbivore(i){
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
        super.newCordinates(i)
    }
    eating(i){
        this.multiply += i
        if(this.multiply > 1){
            if(this.check() == 1){
                while(true){
                    let i  = getRandomInt(0,8)
                    if(this.inMatrix(i) && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 1){
                        grasses = grasses.filter((val)=>{
                            return val.row != this.neighbors[i][0] || val.column != this.neighbors[i][1]
                        })
                        this.eatHerbivore(i)
                        break
                    }
                    else if(this.inMatrix(i) && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 8){
                        Mushroomes = Mushroomes.filter((val)=>{
                            return val.row != this.neighbors[i][0] || val.column != this.neighbors[i][1]
                        })
                        this.eatHerbivore(i)
                        this.poisoned()
                        this.eatedmushroom = true
                        break
                    }
                }
            }else if(this.check() == 2){
                while(true){
                    let i  = getRandomInt(0,8)
                    if(this.inMatrix(i) && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 0){
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
                        super.newCordinates(i)
                        break
                    }
                }
            }
            this.multiply = 0
        }
    }
}


