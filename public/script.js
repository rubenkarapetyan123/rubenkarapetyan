

// let e = new Herbivore(50,50)
// herbivores.push(e)
// matrix[50][50] = 2
// let mushroom = new Mushroom(50,50)
// Mushroomes.push(mushroom)
// matrix[50][50] = 8
// matrix[50][49] = 7
// Mushroomes = Mushroomes.filter((val)=>{
//     return val.row != 50 || val.column != 50
// })
// grasses = grasses.filter((val)=>{
//     return val.row != 50 || val.column != 49
// })

// let c = new Cannibal(50,50)
// cannibales.push(c)
// matrix[50][50] = 3

// let g = new Grass(50,40)
// grasses.push(g)
// matrix[50][40] = 1




function setup() {
    createCanvas(matrix.length*side,matrix.length*side);
    background('#acacac');
    frameRate(10)
}

function draw(){
    noStroke() // stroke()
    for(let i = 0;i<matrix.length;i++){
        for(let j = 0;j<matrix[i].length;j++){
            fill(colors[matrix[i][j]])
            rect(side*j,side*i,side,side)
        }
    }
    
}

