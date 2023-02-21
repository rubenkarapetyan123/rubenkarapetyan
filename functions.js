



module.exports.getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports.startRain = function(){
    mullGrass = 2
    setTimeout(()=>{
        setMushrooms()
        finishEvent()
    },45000)
}

function finishEvent(){
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

module.exports.finishEvent = finishEvent

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

module.exports.setMushrooms = setMushrooms

module.exports.startSnow = function(){
    mullGrass = 0.5
    mullCannibal = 0.5
    mullHerbivore = 0.5
    setTimeout(()=>{
        finishEvent()
    },45000)
}



