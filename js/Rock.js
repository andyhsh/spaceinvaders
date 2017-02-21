var Rock = function() {

    this.position = {
        "x": 300,
        "y": window.innerHeight - 200
    }

    var speed = 0;
    //this.element = null;

    var self = this;

    var createRock = function () {

    	var positionSpacer = 0

    	for (var i = 0; i < 3; i++) {
        self.element = document.createElement("div");
        self.element.classList.add("rock");

        self.element.style.top = self.position.y + "px";
        self.element.style.left = self.position.x + positionSpacer + "px";

        var gameBoard = document.getElementById("gameboard");
        gameBoard.appendChild(self.element);
        positionSpacer += 200;
    	};
    }

//Collision detection for lasers
		// function edgeDetect(){
		// 	if (rect1.x < rect2.x + rect2.width &&
		// 	   rect1.x + rect1.width > rect2.x &&
		// 	   rect1.y < rect2.y + rect2.height &&
		// 	   rect1.height + rect1.y > rect2.y) {
		// 	    console.log('ok!');
		// 	};
		// }


    this.render = function(){
    	// Coordinates tracker

        self.element.style.top = self.position.y + "px";
        // edgeDetect();
    }

    createRock();
}