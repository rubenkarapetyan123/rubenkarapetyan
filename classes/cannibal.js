import Global from "./global.js"
class Cannibal extends Global{
    constructor(row,column){
        super(row,column)
        this.multiply = 0
        this.ate = []
    }
    check(){
        if(super.check(2,1) == 1 || super.check(1,2) == 2 || super.check(8,8) == 8){
            return 1
        }else if(super.check(0,3) == 3){
            return 2
        }
    }
    eat(i){
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
        super.newCordinates(i)
    }
    eating(i){
        this.multiply += i
        if(this.multiply > 2){
            let a = this.check()
            if(a == 1){
                while(true){
                    let i  = getRandomInt(0,8)
                    if(this.inMatrix(i) && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 2){
                        herbivores = herbivores.filter((val)=>{
                            return val.row != this.neighbors[i][0] || val.column != this.neighbors[i][1]
                        })
                        this.eat(i)
                        break
                    }else if(this.inMatrix(i) && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 1){
                        grasses = grasses.filter((val)=>{
                            return val.row != this.neighbors[i][0] || val.column != this.neighbors[i][1]
                        })
                        this.eat(i)
                        break
                    }else if(this.inMatrix(i) && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 8){
                        Mushroomes = Mushroomes.filter((val)=>{
                            return val.row != this.neighbors[i][0] || val.column != this.neighbors[i][1]
                        })
                        this.poisoned()
                        this.eatedmushroom = true
                        this.eat(i)
                        break
                    }
                }
            }else if(a == 2){
                while(true){
                    let i  = getRandomInt(0,8)
                    if(this.inMatrix(i) && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 0){
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
                        super.newCordinates(i)
                        break
                        }
                    }
            }
            this.multiply = 0
        }
    }
}


export default Cannibal