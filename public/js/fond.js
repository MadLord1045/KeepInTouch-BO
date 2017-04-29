var Fond=function(width,height,aheight,awidth){

    this.width=width;
    this.height=height;
    this.aheight=aheight;
    this.awidth=awidth;
    this.img = new Image();
    this.img.src = '/images/fond.jpg';
    this.draw = function(canvasContext, ball) {
        var basex=-awidth/2+width/2;
        var basey=-aheight/2+height/2;
        var ballx=(ball.x-awidth/2+width/2);
        var bally=(ball.y-aheight/2+height/2);
        //canvasContext.drawImage(this.img,-ball.x+width/2, -ball.y+height/2,awidth,aheight);
        canvasContext.drawImage(this.img,basex-ballx, basey-bally,awidth,aheight);
  };
}
    