


function mainLoop() {
    ctx.clearRect(0, 0, width, height);
    fond.draw(ctx,ballArray[0]);
    for(var i=0; i < ballArray.length; i++) {
      var ball = ballArray[i]; 
      ball.draw(ctx);
      
  }
	ctx.fillRect(150,150,100,100);
    // ask for a new frame of animation at 60f/s
     window.requestAnimationFrame(mainLoop);
}

var canvas, ctx, width, height,awidth,aheight;
 
// array of balls to animate
var ballArray = [];

var messages = [];
    var socket ;
    var field ;
    var sendButton;
    var content ;
    var fond;
    
window.onload = function() {

     
     field = document.getElementById("field");
     sendButton = document.getElementById("send");
     content = document.getElementById("content");

    

    sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', { message: text });
    };
	
	initCanvas();
	initSocket();
	addListener();
	requestAnimationFrame(mainLoop);

}

function addListener(){
	
	window.addEventListener('keydown', function(event){
 var ball=ballArray[0];
 console.log(event.keyCode);
	if (event.keyCode === 37) {
		socket.emit('moove', { dir: 0 });
	} else if (event.keyCode === 38) {
		socket.emit('moove', { dir: 1 });
	} else if (event.keyCode === 39) {
		socket.emit('moove', { dir: 2 });
	} else if (event.keyCode === 40) {
		socket.emit('moove', { dir: 3 });
	}  
	}, false);
 
}

function initCanvas(){
	canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;
  awidth = 2000;
  aheight = 2000;
 
 // try to change this number
  ballArray=createBalls(1); 
  fond= new Fond(width,height,awidth,aheight);
 requestAnimationFrame(mainLoop);
}

function initSocket(){
	socket = io.connect('http://localhost:3700');
	socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });
	
	socket.on('newpos', function(data){
		
		if(data.x && data.y)
		{
			var ball=ballArray[0];
			ball.x=data.x;
			ball.y=data.y;
		}
	});
}