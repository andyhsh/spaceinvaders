var Rock = function(x,y) {

    this.position = {
        "x": x,
        "y": y
    }

    //this.element = null;

    var self = this;

    var createRock = function () {

            self.element = document.createElement("div");
            self.element.classList.add("rock");

            self.element.style.top = self.position.y + "px";
            self.element.style.left = self.position.x + "px";

            var gameBoard = document.getElementById("gameboard");
            gameBoard.appendChild(self.element);
    	
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

/*
//Change state depending on health remaining
    var health = 4;
    function rockCondition() {
        switch (health){
            case 4:
            //full health image
            break;
            case 3:
            //3/4 health image
            break;
            case 2:
            //half health image
            break;
            case 1:
            //single hangle image
        }

    }
*/

    this.render = function(){
    	// Coordinates tracker

        self.element.style.top = self.position.y + "px";
        // rockCondition();
    }

    createRock();
}