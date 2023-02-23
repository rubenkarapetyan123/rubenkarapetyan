
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


socket.on("hero played",function(matrix){
    matrixClient = matrix
})


socket.on("matrix", function({drops,matrix,snowflakes,countCharacters}){
    matrixClient = matrix
    dropsClient = drops
    snowflakesClient = snowflakes
    countCharactersClient = countCharacters
})


function setup() {
    createCanvas(matrixWidth*side,matrixHeight*side);
    background('#acacac');
    frameRate(60)
}


function draw(){
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
    divStatic.innerText = "Static\n" + "grass : " + countCharactersClient.grass + "\n" + "herbivore : " + countCharactersClient.Herbivore + "\n" + "cannibal : " + countCharactersClient.cannibal + "\n" + "enchantress : " + countCharactersClient.enchantress + "\n" + "teleporter : " + countCharactersClient.teleporter + "\n" + "bomb : " + countCharactersClient.bomb + "\n" + "mushroom : " + countCharactersClient.mushroom
}



document.addEventListener("keypress", function(evt){
    socket.emit("hero",evt.key)
});

