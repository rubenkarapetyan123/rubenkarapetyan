

let colors = ["gray","green","yellow","blue","black","red","white","purple","orange"]
let side = 7
let socket = io()
let matrixClient = []
let matrixHeight = 100
let matrixWidth = 100
let dropsClient = []
let snowflakesClient = []

socket.on("matrix", function({drops,matrix,snowflakes}){
    matrixClient = matrix
    dropsClient = drops
    snowflakesClient = snowflakes
})

function setup() {
    createCanvas(matrixWidth*side,matrixHeight*side);
    background('#acacac');
    frameRate(30)
}


function draw(){
    noStroke() // stroke()
    for(let i = 0;i<matrixClient.length;i++){
        for(let j = 0;j<matrixClient[i].length;j++){
            fill(colors[matrixClient[i][j]])
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
}





