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
    this.hit = function(index){
        self.health--;
        console.log('minus health');
        if (self.health === 3) {
            self.element.style.opacity = 0.75;
        } else if (self.health === 2) {
            self.element.style.opacity = 0.5;
        } else if (self.health === 1) {
            self.element.style.opacity = 0.25;
        } else {
            rocks[index].element.remove();
            rocks.splice(index,1);
        }
    }

    this.render = function(){
        self.element.style.top = self.position.y + "px";
        //self.condition();
    }

    createRock();
}