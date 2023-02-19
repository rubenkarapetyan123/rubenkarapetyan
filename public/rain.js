function Drop() {
    this.initX = function() {
      this.x = random() * width;
    };
    this.initY = function() {
      this.y = -random() * height / 3; 
    };
  
    this.initX();
    this.y = random() * height;
  
    this.length = random() * 10;
    this.speed = random() * 100;
  
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
        this.speed = random() * 10;
        this.initY();
        this.initX();
      }
    };
  }


var acceleration = 0.0098;
var nDrops = 1000;
var drops = [];