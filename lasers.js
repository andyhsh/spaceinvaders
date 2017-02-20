var Laser = function(x,y, speed = 5) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	//to add collision detection
	this.laserEdgeDetect = function(){
	  if(posY <= 7.5){
	    //delete playerLasers
	  }

	  if(posY >= (gameboard.screenHeight - 7.5)){
	    //delete alienLasers
	  }
}
};


/*
AlienLaser.prototype = new Laser(3, 3);

var al = new AlienLaser(10);
console.log(al.x);

var AlienLaser = function(x,y) {
	this.x = x;
	this.y = y;
	this.speed = 5;
};

var PlayerLaser = function(x,y) {
	this.x = x;
	this.y = y;
	this.speed = 10;
};
*/