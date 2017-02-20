//Alien constructor
var Alien = function(x, y) {
	this.x = x; //set coordinates
	this.y = y;
	this.speed = 10;
};

//movement for aliens
Alien.prototype.movement = function () {
//move alien across X-axis until collide with wall, then move down Y-axis and set X-axis movement

};

//generate alien lasers
Alien.prototype.alienShoot = function () {
	var shoot = Math.random() >= 0.95 ? true : false
//if shoot = true, then generate alienLaser object and set shoot = false
}