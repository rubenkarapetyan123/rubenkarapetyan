class PGrass extends Global{
    constructor(row,column){
        super(row,column)
    }
    mull(){
        if(this.check(0)){
            this.multiply++
            if(this.multiply > 10){
                while(true){
                    let i  = getRandomInt(0,8)
                    if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] == 0){
                        matrix[this.neighbors[i][0]][this.neighbors[i][1]] = 8
                        let pgrass = new PGrass(this.neighbors[i][0],this.neighbors[i][1])
                        poisonGrass.push(pgrass)
                        this.multiply = 0
                        break
                    }
                }
            }
        }
    }
}