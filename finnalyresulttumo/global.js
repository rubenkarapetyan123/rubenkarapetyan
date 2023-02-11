class Global{
    constructor(row,column){
        this.row = row
        this.column = column
        this.multiply = 0
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
    check(int){
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.neighbors[i][0] >= int && this.neighbors[i][1] >= int && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === int){
                return true
            }
        }
        return false
    }
}