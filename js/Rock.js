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


//Change state depending on health remaining
    this.hit = function(index){
        self.health--;
        console.log('minus health');
        switch (self.health){
            case 3:
            self.element.style.opacity = 0.75;
            break;
            case 2:
            self.element.style.opacity = 0.50;
            break;
            case 1:
            self.element.style.opacity = 0.25;
            default:
            gameBoard.rocks[index].element.remove();
            gameBoard.rocks.splice(index,1);
        }

    }

    this.render = function(){
        self.element.style.top = self.position.y + "px";
       
    }

    createRock();
}