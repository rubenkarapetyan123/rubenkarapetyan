const { getRandomInt } = require("../functions")
let Global = require("./global")

module.exports = class Boss extends Global{
    constructor(row,column){
        super()
        this.score = 0
        this.cordinates = [[row,column],[row,column+1],[row+1,column],[row+1,column+1]]
        this.hp = 500
    }
    newNeighborsCordinates(){
        this.neighbors = [
            [
                [this.cordinates[0][0],this.cordinates[0][1]-2],
                [this.cordinates[0][0],this.cordinates[0][1]-1],
                [this.cordinates[0][0]+1,this.cordinates[0][1]-2],
                [this.cordinates[0][0]+1,this.cordinates[0][1]-1],
            ],
            [
                [this.cordinates[0][0]+2,this.cordinates[0][1]],
                [this.cordinates[0][0]+2,this.cordinates[0][1]+1],
                [this.cordinates[0][0]+3,this.cordinates[0][1]],
                [this.cordinates[0][0]+3,this.cordinates[0][1]+1],
            ],
            [
                [this.cordinates[0][0],this.cordinates[0][1]+2],
                [this.cordinates[0][0],this.cordinates[0][1]+3],
                [this.cordinates[0][0]+1,this.cordinates[0][1]+2],
                [this.cordinates[0][0]+1,this.cordinates[0][1]+3],
            ],
            [
                [this.cordinates[0][0]-2,this.cordinates[0][1]],
                [this.cordinates[0][0]-2,this.cordinates[0][1]+1],
                [this.cordinates[0][0]-1,this.cordinates[0][1]],
                [this.cordinates[0][0]-1,this.cordinates[0][1]+1],

            ],
            [
                [this.cordinates[0][0]-2,this.cordinates[0][1]-2],
                [this.cordinates[0][0]-2,this.cordinates[0][1]-1],
                [this.cordinates[0][0]-1,this.cordinates[0][1]-2],
                [this.cordinates[0][0]-1,this.cordinates[0][1]-1],
            ],
            [
                [this.cordinates[0][0]+2,this.cordinates[0][1]+2],
                [this.cordinates[0][0]+2,this.cordinates[0][1]+3],
                [this.cordinates[0][0]+3,this.cordinates[0][1]+2],
                [this.cordinates[0][0]+3,this.cordinates[0][1]+3],
            ],
            [
                [this.cordinates[0][0]+2,this.cordinates[0][1]-2],
                [this.cordinates[0][0]+2,this.cordinates[0][1]-1],
                [this.cordinates[0][0]+3,this.cordinates[0][1]-2],
                [this.cordinates[0][0]+3,this.cordinates[0][1]-1],
            ],
            [
                [this.cordinates[0][0]-2,this.cordinates[0][1]+2],
                [this.cordinates[0][0]-2,this.cordinates[0][1]+3],
                [this.cordinates[0][0]-1,this.cordinates[0][1]+2],
                [this.cordinates[0][0]-1,this.cordinates[0][1]+3],
            ]

        ]
    }

    checkWithFound(){
        this.found = []
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.neighbors[i][0][0] >= 0 && this.neighbors[i][0][1] >= 0 && this.neighbors[i][0][0] < matrixHeight && this.neighbors[i][0][1] < matrixWidth && this.neighbors[i][1][0] >= 0 && this.neighbors[i][1][1] >= 0 && this.neighbors[i][1][0] < matrixHeight && this.neighbors[i][1][1] < matrixWidth && this.neighbors[i][2][0] >= 0 && this.neighbors[i][2][1] >= 0 && this.neighbors[i][2][0] < matrixHeight && this.neighbors[i][2][1] < matrixWidth && this.neighbors[i][3][0] >= 0 && this.neighbors[i][3][1] >= 0 && this.neighbors[i][3][0] < matrixHeight && this.neighbors[i][3][1] < matrixWidth){
                this.found.push(this.neighbors[i])
            }
        }
    }

    poisoned(){
        if(this.eatedmushroom == false){
            setTimeout(()=>{
                this.hp -= 50
                matrix[this.row][this.column] = 5
                this.checkWithFound()
                for(let i = 0;i<this.found.length;i++){
                    matrix[this.found[i][0]][this.found[i][1]] = 5
                }
                this.eatedmushroom = false
          },5000)
        } 
    }

    move(){
        this.newNeighborsCordinates()
        this.checkWithFound()
        let int = getRandomInt(0,this.found.length)
        for(let i in this.found[int]){
            this.hp += damage[matrix[this.found[int][i][0]][this.found[int][i][1]]]
            this.score = this.score + scores[matrix[this.found[int][i][0]][this.found[int][i][1]]]
            matrix[this.found[int][i][0]][this.found[int][i][1]] = 9
            grasses = grasses.filter((val)=>{
                return val.row != this.found[int][i][0] || val.column != this.found[int][i][1]
            })
            herbivores = herbivores.filter((val)=>{
                return val.row != this.found[int][i][0] || val.column != this.found[int][i][1]
            })
            cannibales = cannibales.filter((val)=>{
                return val.row != this.found[int][i][0] || val.column != this.found[int][i][1]
            })
            healthers = healthers.filter((val)=>{
                return val.row != this.found[int][i][0] || val.column != this.found[int][i][1]
            })
            teleporters = teleporters.filter((val)=>{
                return val.row != this.found[int][i][0] || val.column != this.found[int][i][1]
            })   
            Mushroomes = Mushroomes.filter((val)=>{
                return val.row != this.found[int][i][0] || val.column != this.found[int][i][1]
            })  
            if(matrix[this.found[int][i][0]][this.found[int][i][1]] == true){
                this.poisoned()
                this.eatedmushroom = true
            }
        }
        for(let i in this.cordinates){
            matrix[this.cordinates[i][0]][this.cordinates[i][1]] = 0
        }
        this.cordinates = this.found[int]
        this.newNeighborsCordinates()
        this.hp--
    }
}