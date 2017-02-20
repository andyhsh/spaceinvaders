//Character constructor
var Char = function(posX, posY, speed = 1) {
	this.posX = posX; //set coordinates
	this.posY = posY;
	this.speed = speed;
	//get X and Y coordinates
	this.position = function() {
		this.posX = getX();
		this.posY = getY();
		console.log('X:  '+ this.posX + ' Y: ' + this.posY);
	};
	//retrieve X
	this.getX = function() {
		 return this.style.left;
	};
	//retrieve Y
	this.getY = function() {	
		return this.style.top;
	};
};



//create Spaceship prototype
var Spaceship = new Char();
//create player under Spaceship prototype
var player = new Spaceship();
player.speed = 5;
player.playerPosition = document.getElementById("player");

//set player movement
player.keyLeft = false;
player.keyRight = false;
player.keySpace = false;

//Assign Spaceship with controls
Spaceship.prototype.control = function() {
	document.addEventListener('keydown', function(e) {  
	  
	  switch(e.keyCode){
	    case 37:
	      this.keyLeft = true;
	      console.log('keydown');
	      break;
	    case 39:
	      this.keyRight = true;
	      console.log('keydown');
	      break;
	    case 32:
	      this.keySpace = true;
	      console.log('keydown');
	  }
	});

	document.addEventListener('keyup', function(e) {  
	  
	  switch(e.keyCode){
	    case 37:
	      this.keyLeft = false;
	      console.log('keyup');
	      break;
	    case 39:
	      this.keyRight = false;
	      console.log('keyup');
	      break;
	    case 32:
	      this.keySpace = false;
	      console.log('keyup');
	  }
	  
	});
}

//Assign collision detection with gameboard
Spaceship.prototype.playerEdgeDetect = function(){
  
    if(this.posX <= 20){
      this.posX = 20;
    }
  
    if(this.posX >= (gameboard.screenWidth - 20)){
      this.posX = gameboard.screenWidth - 20;
    }
}

//Assign blowUp function (to invoke when detect collision with laser or alien)

//Assign shootLaser function


/*

//Alien
Alien.prototype = new Char(alien.x, alien.y, alien.speed);

//movement for aliens
Alien.prototype.movement = function () {
//move alien across X-axis until collide with wall, then move down Y-axis and set X-axis movement

};

//generate alien lasers
Alien.prototype.alienShoot = function () {
	var shoot = Math.random() >= 0.95 ? true : false
//if shoot = true, then generate alienLaser object and set shoot = false
};


//Rock
Rock.prototype = new Char(rock.x, rock.y, 0);

//UFO
Ufo.prototype = new Char(ufo.x, ufo.y, ufo.speed);

*/

