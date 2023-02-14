
for(let i = 0;i<100;i++){
    matrix[i] =  []
    for(let j = 0;j<100;j++){
        matrix[i][j] = getRandomInt(-500,500)
        // if(matrix[i][j] == 1){
        //     let grass = new Grass(i,j)
        //     grasses.push(grass)
        // }else if(matrix[i][j] == 2){
        //     let herb = new Herbivore(i,j)
        //     herbivores.push(herb)
        // }else if(matrix[i][j] == 3){
        //     let cannibal = new Cannibal(i,j)
        //     cannibales.push(cannibal)
        // }else if(matrix[i][j] == 0){
        //     matrix[i][j] = 0
        // }else if(matrix[i][j] == 6){
        //     let health = new Enchantress(i,j)
        //     healthers.push(health)
        // }else if(matrix[i][j] == 7){
        //     let telep = new Teleporter(i,j)
        //     teleporters.push(telep)
        // }
        // if(matrix[i][j] == 8){
        //     let pgrass = new PGrass(i,j)
        //     poisonGrass.push(pgrass)
        // }else if(matrix[i][j] == 2){
        //         let herb = new Herbivore(i,j)
        //         herbivores.push(herb)
        // }
        
            matrix[i][j] = 1
            let grass = new Grass(i,j)
            grasses.push(grass)
        
    }

}

let herb = new Herbivore(50,49)
herbivores.push(herb)

let pgrass = new PGrass(50,50)
poisonGrass.push(pgrass)
matrix[50][50] = 8
matrix[50][49] = 2
grasses = grasses.filter((val)=>{
    return val.row != 50 || val.column != 50
})
grasses = grasses.filter((val)=>{
    return val.row != 50 || val.column != 49
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
    teleporters = teleporters.filter((val)=>{
        return val.row != i || val.column != j
    })
    poisonGrass = poisonGrass.filter((val)=>{
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
    poisonGrass.forEach(function(val){
        val.mull()
    })
}
