
class Teleporter extends Bomb{
    constructor(row,column){
        super(row,column)
    }
    check(){
        while(true){
            this.found = []
            let i = getRandomInt(0,100)
            let j = getRandomInt(0,100)
            if(matrix[i][j] == 1 || matrix[i][j] == 6){
                this.found = [i,j]
                break
            }
        }
    }
    teleport(){
        this.multiply2++
        if(this.multiply2 > 8){
            this.check()
            matrix[this.found[0]][this.found[1]] = 7
            let herb = new Herbivore(this.row,this.column)
            herbivores.push(herb)
            matrix[this.row][this.column] = 2
            grasses = grasses.filter((val)=>{
                return val.row != this.found[0] || val.column != this.found[1]
            })
            healthers = healthers.filter((val)=>{
                return val.row != this.found[0] || val.column != this.found[1]
            })
            this.row = this.found[0]
            this.column = this.found[1]
            this.multiply2 = 0
        }
    }
}

