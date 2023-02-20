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

let videosrc = ["rain.mp4","snow.mp4"]




function setVideo(src){
    video.remove()
    source.remove()
    let back = document.getElementById("videoback")
    source = document.createElement("source")
    source.setAttribute('src', src)
    video = document.createElement("video")
    video.setAttribute('autoplay', 'autoplay');
    video.setAttribute('muted', 'muted');
    source.setAttribute("type","video/mp4")
    video.style.width = "100%"
    video.style.position = "absolute"
    video.style.zIndex = -1
    video.appendChild(source)
    back.appendChild(video)
}




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

