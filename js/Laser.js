var Laser = function(x,y) {

    this.position = {
        "x": x,
        "y": y
    }

    var speed = 50;
    //this.element = null;

    var self = this;

    var create = function () {

        self.element = document.createElement("div");
        self.element.classList.add("player-laser");

        self.element.style.top = self.position.y + "px";
        self.element.style.left = self.position.x + "px";

        var gameBoard = document.getElementById("gameboard");
        gameBoard.appendChild(self.element);
    }




    this.render = function(){
        self.position.y -= speed;
        self.element.style.top = self.position.y + "px";
    }

    create();
}