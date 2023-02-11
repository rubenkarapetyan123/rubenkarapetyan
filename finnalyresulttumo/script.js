let matrix = []
let grasses = []
let herbivores = []
let cannibales = []
let bombs = []
let teleporters = []
let side = 9
let colors = ["gray","green","yellow","blue","black","red","white","purple"]
let healthers = []

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);

}

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

}

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
