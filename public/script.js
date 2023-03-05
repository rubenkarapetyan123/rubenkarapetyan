let countCharactersClient = {}
let colorsClient = ["gray","green","yellow","blue","black","red","white","purple","orange","IndianRed"]
let side = 6
let socket = io()
let matrixClient = []
let matrixHeight = 100
let matrixWidth = 100
let dropsClient = []
let snowflakesClient = []
let scores = [0,1,2,3,5,0,10,20,5]
let divStatic = document.querySelector("#static")
let scoresClient = 0
let hpClient = 0
let score = document.getElementById("bossScore")
let hp = document.getElementById("bossHp")
let rainBtn = document.getElementById("RainBtn")
let snowBtn = document.getElementById("SnowBtn")
let reloadVideo = document.getElementById("reload")
///////////////////////////////////////////////
let BombBtn = document.getElementById("BombBtn")
let bombActive = false
let bombReload = false
BombBtn.addEventListener("click",(evt)=>{
    bombActive = true
})


function mouseClicked(){
    if(Math.floor(mouseX/side) >= 0 && Math.floor(mouseY/side) >=0 && Math.floor(mouseX/side) < matrixWidth && Math.floor(mouseY/side) < matrixHeight){
        if(bombActive){
            if(bombReload == false){
                reloadVideo.play()
                socket.emit("bomb",{j : Math.floor(mouseX/side),i : Math.floor(mouseY/side)})
                bombReload = true
                setTimeout(()=>{bombReload = false},4500)
            }else{
                alert("bomb on reload")
            }
        }
                
    }
}

///////////////////////////////////////////////

socket.on("weather",function({drops,snowflakes}){
    dropsClient = drops
    snowflakesClient = snowflakes
})


socket.on("matrix", function({matrix,countCharacters,scores,hp}){
    matrixClient = matrix
    countCharactersClient = countCharacters
    scoresClient = scores
    hpClient = hp
})


function setup() {
    socket.emit("get matrix size",true)
    socket.on("setting",({width,height,audioOn,musicSound})=>{
        matrixHeight = height
        matrixWidth = width
        createCanvas(matrixWidth*side,matrixHeight*side);
        let music = document.getElementById('back')
        if(audioOn){
            music.volume = musicSound
            music.play()
        }else{
            music.volume = 0  
        }
    })
    background('#acacac');
    frameRate(30)
}

function draw(){
    clear()
    noStroke() // stroke()
    for(let i = 0;i<matrixClient.length;i++){
        for(let j = 0;j<matrixClient[i].length;j++){
            fill(colorsClient[matrixClient[i][j]])
            rect(side*j,side*i,side,side)
        }
    }
    snowflakesClient.forEach((val)=>{
        fill("white")
        ellipse(val.posX, val.posY, val.size);
    })
    dropsClient.forEach((val)=>{
        stroke(255)
        line(val.x, val.y, val.x, val.y + val.length);
    })
    if(hpClient != undefined && scoresClient != undefined){
        divStatic.innerHTML = "Static\n" + "<p id='green'>■ : " + countCharactersClient.grass + "</p>\n<p id='yellow'>■ : " + countCharactersClient.Herbivore + "</p>\n<p id='blue'>■ : " + countCharactersClient.cannibal + "</p>\n<p id='white'>■ : " + countCharactersClient.enchantress + "</p>\n<p id='purple'>■ : " + countCharactersClient.teleporter + "</p>\n<p id='black'>■ : " + countCharactersClient.bomb + "</p>\n<p id='orange'>■ : " + countCharactersClient.mushroom + "</p>"
        score.innerText = "Boss HP : " + hpClient
        hp.innerText = "Boss Score : " + scoresClient
    }
}

snowBtn.addEventListener("click",(evt)=>{
    socket.emit("SnowBtn",true)
})

rainBtn.addEventListener("click",(evt)=>{
    socket.emit("RainBtn",true)
})


socket.on("WeatherActive",(val)=>{
    alert("Weather Active")
})


socket.on("player win",()=>{
    let divWin = document.createElement("div")
    let continueBtn = document.createElement("a")
    let restartBtn = document.createElement("a")
    let manuBtn = document.createElement("a")
    manuBtn.href = "/"
    restartBtn.href = "/main"

    continueBtn.innerText = "Continue"
    restartBtn.innerText = "Restart"
    manuBtn.innerText = "Manu"

    continueBtn.className = "button"
    restartBtn.className = "button"
    manuBtn.className = "button"

    continueBtn.id = "continue"
    restartBtn.id = "RestartBtn"
    manuBtn.id = "ManuBtn"

    divWin.id = "windiv"
    divWin.innerHTML = "You Win"
    divWin.appendChild(continueBtn)
    divWin.appendChild(restartBtn)
    divWin.appendChild(manuBtn)
    document.querySelector("body").appendChild(divWin)

    continueBtn.addEventListener("click",(evt)=>{
        evt.preventDefault()
        divWin.remove()
    })
})

socket.on("player lose",()=>{
    let divlose = document.createElement("div")
    let continueBtn = document.createElement("a")
    let restartBtn = document.createElement("a")
    let manuBtn = document.createElement("a")
    manuBtn.href = "/"
    restartBtn.href = "/main"

    continueBtn.innerText = "Continue"
    restartBtn.innerText = "Restart"
    manuBtn.innerText = "Manu"

    continueBtn.className = "button"
    restartBtn.className = "button"
    manuBtn.className = "button"

    continueBtn.id = "continue"
    restartBtn.id = "RestartBtn"
    manuBtn.id = "ManuBtn"

    divlose.id = "windiv"
    divlose.innerHTML = "You Lose"
    divlose.appendChild(continueBtn)
    divlose.appendChild(restartBtn)
    divlose.appendChild(manuBtn)
    document.querySelector("body").appendChild(divlose)

    continueBtn.addEventListener("click",(evt)=>{
        evt.preventDefault()
        divlose.remove()
    })
})

document.getElementById("manu").addEventListener("click",()=>{
    socket.emit("refresh",true)
})
