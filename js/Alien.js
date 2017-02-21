// var Alien = function(x,y) {

//     this.position = {
//         "x": x,
//         "y": y
//     };
//     this.speed = 1;
// }
//define different Alien Types of properties
var AlienType1 = function() {

	    this.position = {
        "x": 300,
        "y": 100
    	}

    var health = 1
    var speed = 15;
    this.element = null;

    var self = this;

    var create = function () {

        self.element = document.createElement("div");
        self.element.classList.add("alien");

        self.element.style.top = self.position.y + "px";
        self.element.style.left = self.position.x + "px";

        var gameBoard = document.getElementById("gameboard");
        gameBoard.appendChild(self.element);
    }

    this.motion = {
    	left: false,
    	right: true,
    	down: false
    }

	function edgeDetect(){
	    	
	    //Right Wall: detect width - half the alien's total width
	    if (self.position.x >= (window.innerWidth-10)){
	    	self.motion.right = false;
	    	self.motion.left = true;
	    }
	    //Left wall
	    if (self.position.x <= 10){
	    	self.motion.right = true;
	    	self.motion.left = false;
	    }
	}

	function movement(){

	self.element.style.top = self.y + "px";
	self.element.style.left = self.x + "px";

		if (self.motion.right){
	    self.position.x += speed;
	    }

	    if (self.motion.left){
	    self.position.x -= speed;
	    }
	}

	    	// if (moveLeft) {
	    	// 	self.position.x -= speed;
	    	// 	self.element.style.left = self.position.x + "px";
	    	// } else if (moveRight) {
	    	// 	self.position.x += speed;
	    	// 	self.element.style.left = self.position.x + "px";
	    	// }

	    	// if (self.position.x >= window.innerWidth) {
	    	// 	console.log('hit right wall');
	    	// 	moveLeft = true;
	    	// 	moveRight = false;
	    	// } else if (self.position.x <= 0) {
	    	// 	console.log('hit left wall');
	    	// 	moveleft = false;
	    	// 	moveRight = true;
	    	// }

    this.render = function(){
        movement();
        edgeDetect();
        //coordinates tracker working
        console.log(self.position.x, self.position.y);
    }
    create();
}

/* to define other types of aliens later
var AlienType2 = function() {



}

var AlienType3 = function() {


}
*/

// assign AlienTypes prototype to inherit from Alien
// AlienType1.prototype = Object.create(Alien.prototype);

/*
AlienType2.prototype = Object.create(Alien.prototype);
AlienType3.prototype = Object.create(Alien.prototype);
*/