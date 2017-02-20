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

// Initial position of player
var posX = document.getElementById('gameboard').clientHeight / 2;
var posY = document.getElementById('gameboard').clientWidth / 2;

// Set player position
player.playerElement.style.top = posY;
player.playerElement.style.left = posX;

// Viewport
var screenHeight = document.getElementById('gameboard').clientHeight;
var screenWidth = document.getElementById('gameboard').clientWidth;


//collision detection for player


function render(){

  //player controls
  if(player.keyLeft){
    player.posX -= player.speed;
  }
  
  if(player.keyRight){
    player.posX += player.speed;
  }

/*
  if(player.keySpace) {
    //generate playerLaser objects based on x,y coordinates of player
    var playerLaser = new PlayerLaser(posX, posY);
    console.log(playerLaser.posX);
    //ensure delay of generation of lasers i.e once every second
  }
*/


  player.playerEdgeDetect();
  laserEdgeDetect();
  
  player.playerElement.style.top = posY;
  player.playerElement.style.left = posX;

}

//run game engine
(function animloop(){
  requestAnimFrame(animloop);
  render();
})();