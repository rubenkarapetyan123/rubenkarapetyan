
class Grass extends Global{
    constructor(row,column){
        super(row,column)
    }
    mull(i){
        if(this.check(0)){
            this.multiply += i
            if(this.multiply > 5){
                while(true){
                    let i  = getRandomInt(0,8)
                    if(this.inMatrix(i) && matrix[this.neighbors[i][0]][this.neighbors[i][1]] == 0){
                        matrix[this.neighbors[i][0]][this.neighbors[i][1]] = 1
                        let grass = new Grass(this.neighbors[i][0],this.neighbors[i][1])
                        grasses.push(grass)
                        this.multiply = 0
                        break
                    }
                }
            }
        }
    }
}

