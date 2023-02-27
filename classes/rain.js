const { getRandomInt } = require("../functions");

module.exports = function Drop() {
    this.x = Math.random() * matrixWidth*side
    this.y = 0;
  
    this.length = Math.random() * 10;
    this.speed = getRandomInt(20,40)
  
    this.drawAndDrop = function() {
      this.draw();
      this.drop();
    };
  
    this.draw = function() {
      stroke(255)
      line(this.x, this.y, this.x, this.y + this.length);
    };
    
    this.data = function(){
      return {
        x : this.x,
        y : this.y,
        l : this.length
      }
    }

    this.drop = function() {
      if (this.y < matrixHeight*side) {
        this.y += this.speed;
        this.speed += acceleration;
      } else {
        let index = drops.indexOf(this);
        drops.splice(index, 1);
      }
    };
  }


