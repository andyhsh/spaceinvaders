// var Alien = function(x,y) {

//     this.position = {
//         "x": x,
//         "y": y
//     };
//     this.speed = 1;
// }
//define different Alien Types of properties



var AlienType1 = function(x,y) {

	this.position = {
        "x": x,
        "y": y
	}

    var health = 1
    var speed = 2;
    var lasers = [];
    //this.element = null;

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

		if (self.motion.right){
	    	self.position.x += speed;
	    }

	    if (self.motion.left){
	    	self.position.x -= speed;
	    }

        self.element.style.top = self.position.y + "px";
        self.element.style.left = self.position.x + "px";

	}

	//Randomly generate lasers
	function shoot(){
		if (Math.random() >= 0.999) {
        	lasers.push(new Enemylaser(self.position.x, self.position.y));
		}

	}

    this.render = function(){
        movement();
        edgeDetect();
        shoot();

        //Remove lasers when reach the top of the screen
        lasers.forEach(function(el, index){
            el.render();

            if(el.position.y > window.innerHeight){

            el.element.remove();
            console.log('remove enemy laser!');
            lasers.splice(index,1);
        	}
        })
        
        //coordinates tracker working
        ///console.log(self.position.x, self.position.y);
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