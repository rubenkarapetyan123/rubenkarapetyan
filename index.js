import express from "express"
import Bomb from "./classes/bomb.js"
import Cannibal from "./classes/cannibal.js"
import Grass from "./classes/grass.js"
import Enchantress from "./classes/enchantress.js"
import Herbivore from "./classes/herbivore.js"
import Mushroom from "./classes/mushroom.js"
import Drop from "./classes/rain.js"
import snowflake from "./classes/snowflakes.js"
import Teleporter from "./classes/telephorter.js"
let express = require(express)//sax requare ara


let matrix = []
let grasses = []
let herbivores = []
let cannibales = []
let bombs = []
let teleporters = []
let side = 7
let colors = ["gray","green","yellow","blue","black","red","white","purple","orange"]
let healthers = []
let Mushroomes = []
let mullGrass = 1
let mullCannibal = 1
let mullHerbivore = 1
let matrixWidth = 100
let matrixHeight = 100
let snowactive = false
let rainactive = false
let spawn = false
let snowflakes = []
let acceleration = 0.0098;
let drops = [];



////////////////////////////

for(let i = 0;i<matrixHeight;i++){
    matrix[i] =  []
    for(let j = 0;j<matrixWidth;j++){
        matrix[i][j] = getRandomInt(-500,500)
        if(matrix[i][j] == 1){
            let grass = new Grass(i,j)
            grasses.push(grass)
        }
        else if(matrix[i][j] == 2){
            let herb = new Herbivore(i,j)
            herbivores.push(herb)
        }
        else if(matrix[i][j] == 3){
            let cannibal = new Cannibal(i,j)
            cannibales.push(cannibal)
        }
        else if(matrix[i][j] == 0){
            matrix[i][j] = 0
        }
        else if(matrix[i][j] == 6){
            let health = new Enchantress(i,j)
            healthers.push(health)
        }
        else if(matrix[i][j] == 7){
            let telep = new Teleporter(i,j)
            teleporters.push(telep)
        }
        else{
            matrix[i][j] = 1
            let grass = new Grass(i,j)
            grasses.push(grass)
        }
    }
}




setInterval(() => {
    let random = getRandomInt(0,2)
    spawn = true
    if(random == 0){
        startRain()
        rainactive = true
    }else{
        startSnow()
        snowactive = true
    }
}, 180000);


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
    Mushroomes = Mushroomes.filter((val)=>{
        return val.row != i || val.column != j
    })
    matrix[i][j] = 4
},1000)



herbivores.forEach(function(val){
    val.eating(mullHerbivore)
})
grasses.forEach(function(val){
    val.mull(mullGrass)
})
cannibales.forEach(function(val){
    val.eating(mullCannibal)
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
Mushroomes.forEach(function(val){
    val.mull()
})
if(rainactive){
    drops.forEach(function(d) {
        d.drawAndDrop()
    })
    if(spawn){
        for (i = 0; i < getRandomInt(1,41); i++) {
            drops.push(new Drop());
        }
    }        
}else if(snowactive){
    snowflakes.forEach((val)=>{
        val.drawAndDrop(10)
    })
    if(spawn){
        for (let i = 0; i < getRandomInt(1,16); i++) {
            snowflakes.push(new snowflake())
        }
    }

}
////////////////////////////





const app = express()

app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.redirect("index.html")
})




app.listen(3001)

























function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function startRain(){
    console.log("start")
    mullGrass = 2
    setTimeout(()=>{
        setMushrooms()
        finishEvent()
    },45000)
}
function finishEvent(){
    console.log("finish")
    mullGrass = 1
    mullCannibal = 1
    mullHerbivore = 1
    spawn = false
    setTimeout(() => {
        rainactive = false
        snowactive = false
        snowflakes = []
        drops = []
    }, 25000);
}

function setMushrooms(){
    let count = getRandomInt(0,10)
    let id = setInterval(() => {
        if(count < 0){
            clearInterval(id)
        }
        let i = getRandomInt(0,matrixWidth)
        let j = getRandomInt(0,matrixHeight)
        let mushroom = new Mushroom(i,j)
        Mushroomes.push(mushroom)
        matrix[i][j] = 8
        grasses = grasses.filter((val)=>{
            return val.row != i || val.column != j
        })
        herbivores = herbivores.filter((val)=>{
            return val.row != i || val.column != j
        })
        cannibales = cannibales.filter((val)=>{
            return val.row != i || val.column != j
        })
        healthers = healthers.filter((val)=>{
            return val.row != i || val.column != j
        })
        teleporters = teleporters.filter((val)=>{
            return val.row != i || val.column != j
        })   
        Mushroomes = Mushroomes.filter((val)=>{
            return val.row != i || val.column != j
        }) 
        bombs = bombs.filter((val)=>{
            return val.row != i || val.column != j
        }) 
        count--
    }, 500);
}

function startSnow(){
    console.log("starts")
    mullGrass = 0.5
    mullCannibal = 0.5
    mullHerbivore = 0.5
    setTimeout(()=>{
        finishEvent()
    },45000)
}



export {
     matrix,
     grasses ,
     herbivores ,
     cannibales ,
     bombs ,
     teleporters ,
     side ,
     colors ,
     healthers ,
     Mushroomes ,
     mullGrass ,
     mullCannibal ,
     mullHerbivore ,
     matrixWidth ,
     matrixHeight ,
     snowactive ,
     rainactive ,
     spawn ,
     snowflakes,
     acceleration,
     drops,
     getRandomInt
}