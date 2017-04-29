function Player(x, y, vx, vy, diameter) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.radius = diameter/2;
 
 this.draw = function(canvasContext) {
      canvasContext.beginPath();
      canvasContext.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
      canvasContext.fill();
  };
 
 this.move = function() {
    this.x += this.vx;
    this.y += this.vy;
  };
}

function createPlayer(number) {
  for(var i=0; i < number; i++) {
 
    var res=[];
    var ball =  new Ball(width*Math.random(),
                          height*Math.random(),
                          (10*Math.random())-5,
                          (10*Math.random())-5,
                          30);
 
   res[i] = ball;
   return res;
  }
}