var AlienType1 = function(x, y, speed, type) {

	this.position = {
        "x": x,
        "y": y
	}

    var health = 1
    this.speed = speed;
    var maxLasers = 1;
    this.lasers = [];

    var self = this;

    var create = function () {

	        self.element = document.createElement("div");
	        self.element.classList.add('animated', 'fadeInDown', type);

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
	    if (self.position.x >= (screenWidth-15)){
	    	self.motion.right = false;
	    	self.motion.down = true;
	    	setTimeout(function(){self.motion.down = false; self.motion.left = true}, 400);
	    }
	    //Left wall
	    if (self.position.x <= 15){
	    	self.motion.left = false;
	    	self.motion.down = true;
	    	setTimeout(function(){self.motion.down = false; self.motion.right = true}, 400);
	    }
	}

	function movement(){

		if (self.motion.right){
	    	self.position.x += self.speed;
	    }

	    if (self.motion.left){
	    	self.position.x -= self.speed;
	    }

	    if (self.motion.down){
	    	self.position.y += self.speed;
	    }

        self.element.style.top = self.position.y + "px";
        self.element.style.left = self.position.x + "px";

	}

	//Randomly generate lasers
	function shoot(){
		if (self.lasers.length >= maxLasers) {
			return;
		} else	if (Math.random() >= 0.998) {
	        	self.lasers.push(new Laser(self.position.x, self.position.y, -3, "enemy-laser"));
			}
		
	}

	//Remove laser function
    this.removeLaser = function(){
        self.lasers[0].element.remove();
        self.lasers.splice(0,1);
    }

	//explode when hit
	this.explode = function(index){
        gameBoard.aliens[index].element.remove();
        gameBoard.aliens.splice(index,1);
        debugger;
        gameBoard.explodefx.play();
        
	}

    this.render = function(){
        movement();
        edgeDetect();
        shoot();

        //Remove lasers when reach the top of the screen
        self.lasers.forEach(function(el, index){
            el.render();

            if(el.position.y > screenHeight){

            el.element.remove();
            //console.log('remove enemy laser!');
            self.lasers.splice(index,1);
        	}
        })
    }
    create();
}