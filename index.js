let express = require("express")
let Bomb = require("./classes/bomb.js")
let Cannibal = require("./classes/cannibal.js")
let Grass = require("./classes/grass.js")
let Enchantress = require("./classes/enchantress.js")
let Herbivore = require("./classes/herbivore.js")
let Mushroom = require("./classes/mushroom.js")
let Drop = require("./classes/rain.js")
let snowflake = require("./classes/snowflakes.js")
let Teleporter = require("./classes/telephorter.js")
const { getRandomInt } = require("./functions")
const app = express()
let server = require('http').createServer(app)
let io = require('socket.io')(server)
let startRain = require("./functions").startRain
let startSnow = require("./functions").startSnow
let Hero = require("./classes/hero")
let heroX = 50
let heroY = 50
////////////////////////////
function main(){
    countCharacters = {
        grass : 0,
        Herbivore : 0,
        cannibal : 0,
        enchantress : 0,
        Teleporter : 0,
        bomb : 0,
        mushroom : 0
    }
    matrix = []
    grasses = []
    herbivores = []
    cannibales = []
    bombs = []
    teleporters = []
    side = 6
    colors = ["gray","green","yellow","blue","black","red","white","purple","orange","IndianRed"]
    scores = [0,1,2,3,5,0,10,20,5]
    healthers = []
    Mushroomes = []
    mullGrass = 1
    mullCannibal = 1
    mullHerbivore = 1
    matrixWidth = 100
    matrixHeight = 100
    snowactive = false
    rainactive = false
    spawn = false
    snowflakes = []
    acceleration = 0.0098;
    drops = [];

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
    }, 120000);


    setInterval(()=>{ 
        let i = getRandomInt(0,100)
        let j = getRandomInt(0,100)
        if(i !== hero.row || j !== hero.column){
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
        }
    },3000)

    hero = new Hero(heroX,heroY)
    cannibales = cannibales.filter((val)=>{
        return val.row != heroX || val.column != heroY
    })
    grasses = grasses.filter((val)=>{
        return val.row != heroX || val.column != heroY
    })
    herbivores = herbivores.filter((val)=>{
        return val.row != heroX || val.column != heroY
    })
    healthers = healthers.filter((val)=>{
        return val.row != heroX || val.column != heroY
    })
    teleporters = teleporters.filter((val)=>{
        return val.row != heroX || val.column != heroY
    })
    Mushroomes = Mushroomes.filter((val)=>{
        return val.row != heroX || val.column != heroY
    })
    bombs = bombs.filter((val)=>{
        return val.row != heroX || val.column != heroY
    })
    matrix[heroX][heroY] = 9
}




function MainGameWork(){
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
    Mushroomes.forEach(function(val){
        val.mull()
    })
    bombs.forEach(function(val){
        val.bomber()
    })
    if(rainactive){
        drops.forEach(function(d) {
            d.drop()
        })
        if(spawn){
            for (i = 0; i < getRandomInt(1,41); i++) {
                drops.push(new Drop());
            }
        }        
    }else if(snowactive){
        snowflakes.forEach((val)=>{
            val.update(60)
        })
        if(spawn){
            for (let i = 0; i < getRandomInt(1,16); i++) {
                snowflakes.push(new snowflake())
            }
        }
    
    }
}

io.on('connection', function (socket) {
    main()
    console.log("User Conected")
    socket.emit("matrix", {matrix,drops,snowflakes,countCharacters});

    socket.on("hero",function(data){
        if(data == "w"){
            hero.moveup()
        }else if(data == "s"){
            hero.movedown()
        }else if(data == "a"){
            hero.moveleft()
        }else if(data == "d"){
            hero.moverigth()
        }else if(data == " "){
            hero.attack()
        }
        io.emit("hero played", matrix)
    })

    setInterval(() => {
        MainGameWork()
        countCharacters = {
            grass : grasses.length,
            Herbivore : herbivores.length,
            cannibal : cannibales.length,
            enchantress : healthers.length,
            teleporter : teleporters.length,
            bomb : bombs.length,
            mushroom : Mushroomes.length
        }
        io.emit("matrix", {matrix,drops,snowflakes,countCharacters})
    }, 1000)
});
 


////////////////////////////





app.use(express.json())
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.redirect("index.html")
})




server.listen(3001)





















