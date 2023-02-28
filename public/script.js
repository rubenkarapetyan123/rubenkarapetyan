

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
                socket.emit("bomb",{j : Math.floor(mouseX/side),i : Math.floor(mouseY/side)})
                bombReload = true
                setTimeout(()=>{bombReload = false},5000)
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
    createCanvas(matrixWidth*side,matrixHeight*side);
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
        divStatic.innerText = "Static\n" + "grass : " + countCharactersClient.grass + "\n" + "herbivore : " + countCharactersClient.Herbivore + "\n" + "cannibal : " + countCharactersClient.cannibal + "\n" + "enchantress : " + countCharactersClient.enchantress + "\n" + "teleporter : " + countCharactersClient.teleporter + "\n" + "bomb : " + countCharactersClient.bomb + "\n" + "mushroom : " + countCharactersClient.mushroom
        score.innerText = "Boss HP : " + hpClient
        hp.innerText = "Boss Score : " + scoresClient
    }
}


let rainBtn = document.getElementById("RainBtn")
let snowBtn = document.getElementById("SnowBtn")
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
    alert("You Win")
})