let Global = require("./global")

let speed = [[1,0],[0,-1],[-1,0],[0,1]]
let imgLinks = []
module.exports = class Snake extends Global{
    constructor(row,column){
        super(row,column)
        this.corner = getRandomInt(0,4)
        this.speedRow = speed[this.corner][0]
        this.speedColumn = speed[this.corner][1]
        this.link1 = imgLinks[this.corner][0]
        this.link2 = imgLinks[this.corner][1]
    }
    setNeighbors(){
        this.neighbors = []
        for(let i = 1;i<16;i++){
            this.neighbors.push([this.row+i,this.column])
        }
        for(let i = 1;i<16;i++){
            this.neighbors.push([this.row+i,this.column+1])
        }
        for(let i = 1;i<16;i++){
            this.neighbors.push([this.row+i,this.column+2])
        }
        for(let i = 1;i<16;i++){
            this.neighbors.push([this.row+i,this.column-1])
        }
        for(let i = 1;i<16;i++){
            this.neighbors.push([this.row+i,this.column-2])
        }
    }

    move(){
        this.setNeighbors()
        this.checkWithFound()
        this.row += this.speedRow
        this.column += this.speedColumn
        for(let i in this.found){
            if(matrix[i[0]][i[1]] != 1){
                this.clear()
            }
        }
        //move
    }
}