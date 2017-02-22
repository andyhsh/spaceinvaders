var Rock = function(x,y) {

    this.health = 4;

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

//rock collision detection
    function blowUp(){
        self.health -= 1;

    }

    this.render = function(){
    	// Coordinates tracker

        self.element.style.top = self.position.y + "px";
        // rockCondition();
    }

    createRock();
}