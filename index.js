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
let Boss = require("./classes/boss")
const { getRandomInt } = require("./functions")
const app = express()
let server = require('http').createServer(app)
let io = require('socket.io')(server)
let startRain = require("./functions").startRain
let startSnow = require("./functions").startSnow
let weatherId,bombId,weatherMainId,mainId,snakeId
////////////////////////////
function main(){
    clearInterval(weatherId)
    clearInterval(bombId)
    clearInterval(snakeId)
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
    wined = false
    matrixHeight = 100
    snowactive = false
    rainactive = false
    spawn = false
    snowflakes = []
    acceleration = 0.0098;
    drops = [];
    damage = [0,2,-3,-5,-30,-15,100,-50,5]

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
    boss = new Boss(50,50)
    matrix[50][50] = 9
    matrix[50][51] = 9
    matrix[51][50] = 9
    matrix[51][51] = 9
    grasses = grasses.filter((val)=>{
        return val.row != 50 || val.column != 50
    })
    herbivores = herbivores.filter((val)=>{
        return val.row != 50 || val.column != 50
    })
    cannibales = cannibales.filter((val)=>{
        return val.row != 50 || val.column != 50
    })
    healthers = healthers.filter((val)=>{
        return val.row != 50 || val.column != 50
    })
    teleporters = teleporters.filter((val)=>{
        return val.row != 50 || val.column != 50
    }) 
    
    weatherId = setInterval(() => {
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


    bombId = setInterval(()=>{ 
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
    
    },3000)
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
    checkPlayerWin()
}


function weahterWork(){
    if(rainactive){
        drops.forEach(function(d) {
            d.drop()
        })
        if(spawn){
            for (i = 0; i < getRandomInt(5,20); i++) {
                drops.push(new Drop());
            }
        }        
    }else if(snowactive){
        snowflakes.forEach((val)=>{
            val.update(0.1)
        })
        if(spawn){
            for (let i = 0; i < getRandomInt(0,3); i++) {
                snowflakes.push(new snowflake())
            }
        }
    
    }
}

io.on('connection', function (socket) {
    clearInterval(weatherMainId)
    clearInterval(mainId)

    main()
    console.log("User Conected")
    socket.emit("matrix", {matrix,countCharacters});

    mainId = setInterval(() => {
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
        io.emit("matrix", {matrix,countCharacters,scores : boss.score,hp : boss.hp})
    }, 1000)

    weatherMainId = setInterval(() => {
        weahterWork()
        io.emit("weather",{drops,snowflakes})
    }, 100);


    socket.on("disconnect",()=>{
        console.log("User Disconected")
    })


    socket.on("RainBtn",(val)=>{
        if(snowactive == false && rainactive == false){
            spawn = true
            clearInterval(weatherId)
            startRain()
            rainactive = true
            weatherId = setInterval(() => {
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
        }else{
            io.emit("WeatherActive",true)
        }
    })


    socket.on("SnowBtn",(val)=>{
        if(snowactive == false && rainactive == false){
            spawn = true
            clearInterval(weatherId)
            startSnow()
            snowactive = true
            weatherId = setInterval(() => {
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
        }else{
            io.emit("WeatherActive",true)
        }

    })

    socket.on("bomb",({i,j})=>{
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
    })

});
 


////////////////////////////





app.use(express.json())

app.get("/main",(req,res)=>{
    res.redirect("index.html")
})

app.get("/",(req,res)=>{
    res.redirect("start.html")
})

app.use(express.static("public"))
app.use(express.static("./public/start"))

server.listen(3001)





function checkPlayerWin(){
    if(wined == false){
        boss.move()
        if(boss.hp <= 0){
            boss.cordinates.forEach(function(val){
                matrix[val[0]][val[1]] = 0
            })
            io.emit("player win",true)
            wined = true
        }
}
}








