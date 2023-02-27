const { getRandomInt } = require("../functions");

module.exports = function snowflake() {
    // initialize coordinates
    this.posX = 0;
    this.posY = getRandomInt(-50, 1);
    this.initialangle = getRandomInt(0, 2 * 3.14+1);
    this.size = getRandomInt(2, 6);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = Math.sqrt(getRandomInt(0,Math.pow(matrixWidth*side / 2, 2)+1));

    this.update = function(time) {
        // x position follows a circle
        let w = 0.6; // angular speed
        let angle = w * time + this.initialangle;
        this.posX = matrixWidth*side / 2 + this.radius * Math.sin(angle);

        // different size snowflakes fall at slightly different y speeds
        this.posY += Math.pow(this.size,1.5);

        // delete snowflake if past end of screen
        if (this.posY > matrixHeight*side) {
        let index = snowflakes.indexOf(this);
        snowflakes.splice(index, 1);
        }
    };

    this.display = function() {
        fill("white")
        ellipse(this.posX, this.posY, this.size);
    };
    this.drawAndDrop = function(frame){
        this.display()
        this.update(frame)
    }
}

