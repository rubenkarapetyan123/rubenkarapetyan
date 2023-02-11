
let matrix = []
let grasses = []
let herbivores = []
let cannibales = []
let bombs = []
let teleporters = []
let side = 9
let colors = ["gray","green","yellow","blue","black","red","white","purple","pink"]
let healthers = []
let scores = [0,1,2,3,5,0,10,20]
console.warn("kayfot")





class Cannibal{
    constructor(row,column){
        this.row = row
        this.column = column
        this.multiply = 0
        this.ate = []
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
    check(){
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 2){
                return 1
            }else if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 1){
                return 2
            }
        }
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 0){
                return 3
            }
        }
    }
    eating(){
        this.multiply++
        if(this.multiply > 2){
            let a = this.check()
            if(a == 1){
                while(true){
                    let i  = getRandomInt(0,8)
                    if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 2){
                        herbivores = herbivores.filter((val)=>{
                            return val.row != this.neighbors[i][0] || val.column != this.neighbors[i][1]
                        })
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
            }else if(a == 2){
                while(true){
                    let i  = getRandomInt(0,8)
                    if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 1){
                        this.ate.push(1)
                        grasses = grasses.filter((val)=>{
                            return val.row != this.neighbors[i][0] || val.column != this.neighbors[i][1]
                        })
                        matrix[this.neighbors[i][0]][this.neighbors[i][1]] = 3
                        matrix[this.row][this.column] = 0
                        if(this.ate.indexOf(-1) >= 0){
                            this.ate = []
                        }else if(this.ate.length > 10 && this.ate.indexOf(-1) < 0){
                            let cannibal = new Cannibal(this.row,this.column)
                            cannibales.push(cannibal)
                            this.ate = []
                            matrix[this.row][this.column] = 3 
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
        }else if(a == 3){
            while(true){
                let i  = getRandomInt(0,8)
                if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 0){
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
            this.multiply = 0
        }
    }
}

class Grass{
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
    check(){
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] === 0){
                return true
            }
        }
        return false
    }
    mull(){
        let a = this.check()
        if(a == true){
            this.multiply++
            if(this.multiply > 5){
                while(true){
                    let i  = getRandomInt(0,8)
                    if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] == 0){
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

class Herbivore{
    constructor(row,column){
        this.row = row
        this.column = column
        this.ate = []
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
        let a = this.check()
        if(a == 1){
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
        }else if(a == 2){
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


class Bomb extends Grass{
    constructor(row,column){
        super(row,column)
        this.found = []
        this.multiply = 2
        this.multiply2 = 0
        this.color = colors[matrix[this.row][this.column]]
    }
    check(){
        this.found = []
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100){
                this.found.push(this.neighbors[i])
            }
        }
    }
    explosion(){
        if(this.multiply2 == 0){
            for(let i in this.found){
                matrix[this.found[i][0]][this.found[i][1]] = 5
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
            }
            matrix[this.row][this.column] = 5
            this.multiply2++
        }else if(this.multiply2 == 1){
            for(let i in this.found){
                matrix[this.found[i][0]][this.found[i][1]] = 0
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
            }
            bombs = bombs.filter((val)=>{
                return val.row != this.row || val.column != this.column
            })
            matrix[this.row][this.column] = 0
            this.multiply2 = 0
        }

    }
    bomber(){
        this.check()
        this.multiply++
        if(this.multiply > 7){
            this.explosion()
            if(this.multiply2 == 0){
                this.multiply = 0
            }
        }else if(this.multiply % 2 == 1){
            colors[4] = "black"
        }else if(this.multiply % 2 == 0){
            colors[4] = this.color
        }
    }

}



class Enchantress extends Bomb{
    constructor(row,column){
        super(row,column)
    }
    check(){
        this.found = []
        for(let i = 0;i<this.neighbors.length;i++){
            if(this.neighbors[i][0] >= 0 && this.neighbors[i][1] >= 0 && this.neighbors[i][0]< 100 && this.neighbors[i][1] < 100 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] != 4 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] != 5 && matrix[this.neighbors[i][0]][this.neighbors[i][1]] != 6){
                this.found.push(this.neighbors[i])
            }
        }
    }
    healthing(){
        for(let i in this.found){
            matrix[this.found[i][0]][this.found[i][1]] = 1
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
            let grass = new Grass(this.found[i][0],this.found[i][1])
            grasses.push(grass)
        }
    }
    move(){
        let i = getRandomInt(0,this.found.length)
        matrix[this.found[i][0]][this.found[i][1]] = 6
        matrix[this.row][this.column] = 1
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
        let grass = new Grass(this.row,this.column)
        grasses.push(grass)
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
    do(){
        this.check()
        this.multiply2++
        if(this.multiply2 == 1){
            this.healthing()
        }else if(this.multiply2 == 2){
            this.move()
            this.multiply2 = 0
        }
    }
}

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




















function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);

}


// petqa iranc sirun dasavorel
for(let i = 0;i<100;i++){
    matrix[i] =  []
    for(let j = 0;j<100;j++){
        matrix[i][j] = getRandomInt(-500,500)
        if(matrix[i][j] == 1){
            let grass = new Grass(i,j)
            grasses.push(grass)
        }else if(matrix[i][j] == 2){
            let herb = new Herbivore(i,j)
            herbivores.push(herb)
        }else if(matrix[i][j] == 3){
            let cannibal = new Cannibal(i,j)
            cannibales.push(cannibal)
        }else if(matrix[i][j] == 0){
            matrix[i][j] = 0
        }else if(matrix[i][j] == 6){
            let health = new Enchantress(i,j)
            healthers.push(health)
        }else if(matrix[i][j] == 7){
            let telep = new Teleporter(i,j)
            teleporters.push(telep)
        }else{
            matrix[i][j] = 1
            let grass = new Grass(i,j)
            grasses.push(grass)
        }
    }
    // let a = getRandomInt(0,99)
    // matrix[i][a] = 2
    // let herb = new Herbivore(i,a)
    // herbivores.push(herb)
    // grasses = grasses.filter(function(val){
    //     return val.row != i || val.column != a
    // })
}

matrix[50][50] = 8
let hero = new Hero(50,50)
cannibales = cannibales.filter((val)=>{
    return val.row != 50 || val.column != 50
})
grasses = grasses.filter((val)=>{
    return val.row != 50 || val.column != 50
})
herbivores = herbivores.filter((val)=>{
    return val.row != 50 || val.column != 50
})
healthers = healthers.filter((val)=>{
    return val.row != 50 || val.column != 50
})
teleporters = teleporters.filter((val)=>{
    return val.row != 50 || val.column != 50
})
bombs = bombs.filter((val)=>{
    return val.row != 50 || val.column != 50
})




setInterval(()=>{ 
    let i = getRandomInt(0,100)
    let j = getRandomInt(0,100)
    let bomb = new Bomb(i,j)
    bombs.push(bomb)
    cannibales = cannibales.filter((val)=>{
        return val.row != i || val.column != j
    })
    grasses = grasses.filter((val)=>{
        return val.row != i || val.column != j
    })
    herbivores = herbivores.filter((val)=>{
        return val.row != i || val.column != j
    })
    healthers = healthers.filter((val)=>{
        return val.row != i || val.column != j
    })
    matrix[i][j] = 4
},1000)



function setup() {
    createCanvas(matrix.length*side,matrix.length*side);
    background('#acacac');
    frameRate(5)
}



function draw(){
    for(let i = 0;i<matrix.length;i++){
        for(let j = 0;j<matrix[i].length;j++){
            fill(colors[matrix[i][j]])
            rect(side*j,side*i,side,side)
        }
    }
    herbivores.forEach(function(val){
        val.eating()
    })
    grasses.forEach(function(val){
        val.mull()
    })
    cannibales.forEach(function(val){
        val.eating()
    })
    healthers.forEach(function(val){
        val.do()
    })
    teleporters.forEach(function(val){
        val.teleport()
    })
    bombs.forEach(function(val){
        val.bomber()
    })
}




document.addEventListener("keyup", function(evt){
    if(evt.key == "w"){
        hero.moveup()
    }
    if(evt.key == "s"){
        hero.movedown()
    }
    if(evt.key == "a"){
        hero.moveleft()
    }
    if(evt.key == "d"){
        hero.moverigth()
    }
    if(evt.key == " "){
        hero.kick()
    }
    console.log(hero.score)
});