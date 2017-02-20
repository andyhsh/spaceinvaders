console.log("Game Engine");

//game engine
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

//player movement
var keyLEFT = false;
var keyRIGHT = false;

var motion = {
  left: false,
  right: false
}

// Initial position of player
var x = document.getElementById('gameboard').clientHeight / 2;
var y = document.getElementById('gameboard').clientWidth / 2;
var speed = 5;

// Set player position
var player = document.getElementById("player");
player.style.top = y;
player.style.left = x;

// Viewport
var screenHeight = document.getElementById('gameboard').clientHeight;
var screenWidth = document.getElementById('gameboard').clientWidth;

// player controls
document.addEventListener('keydown', function(e) {  
  
  switch(e.keyCode){
    case 37:
      keyLeft = true;
      break;
    case 39:
      keyRight = true;
      break;
  }
});

document.addEventListener('keyup', function(e) {  
  
  switch(e.keyCode){
    case 37:
      keyLeft = false;
      break;
    case 39:
      keyRight = false;
      break;
  }
  
});

document.addEventListener('keydown', function(e) {
	if (e.keyCode === 32) {
		keySpace = true;
		console.log('spacebar down');
	}
});

document.addEventListener('keyup'), function(e) {
	if (e.keyCode === 32) {
		keySpace = false;
		console.log('spacebar up');
	}
}

//collision detection for player
function playerEdgeDetect(){
  
    if(x <= 20){
      x = 20;
    }
  
    if(x >= (screenWidth-20)){
      x = screenWidth-20;
    }
}



function render(){
  
  if(keyLeft || motion.left){
    x -= speed;
  }
  
  if(keyRight || motion.right){
    x += speed;
  }

  playerEdgeDetect();
  
  player.style.top = y;
  player.style.left = x;
}

//run game engine
(function animloop(){
  requestAnimFrame(animloop);
  render();
})();