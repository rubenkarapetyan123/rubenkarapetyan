function Drop() {
    this.x = random() * width
    this.y = 0;
  
    this.length = random() * 10;
    this.speed = getRandomInt(50,100)
  
    this.drawAndDrop = function() {
      this.draw();
      this.drop();
    };
  
    this.draw = function() {
      stroke(255)
      line(this.x, this.y, this.x, this.y + this.length);
    };
  
    this.drop = function() {
      if (this.y < height) {
        this.y += this.speed;
        this.speed += acceleration;
      } else {
        let index = drops.indexOf(this);
        drops.splice(index, 1);
      }
    };
  }


var acceleration = 0.0098;
var drops = [];