var Player = function(){

    /*
     * Game variables
     */
    var speed = 7;
    this.lives = 3;
    var maxLaser = 1;

    /*
     * Game Environment
     */
    this.lasers = [];
    this.position = {
        "x": screenWidth / 2,
        "y": screenHeight - 20
    };

    var self = this;

    // this.element = document.getElementById("player");
    this.livesElement = document.getElementsByClassName("lives");

//Create player
    var create = function () {

        self.element = document.createElement("div");
        self.element.setAttribute("id", "player");

        self.element.style.top = self.position.y + "px";
        self.element.style.left = self.position.x + "px";

        var gameBoard = document.getElementById("gameboard");
        gameBoard.appendChild(self.element);
    }

//hit tracker
    this.hit = function() {

var bankLeftHit = self.element.style.backgroundImage="url(images/playerbanklefthit.png)";
var bankRightHit = self.element.style.backgroundImage="url(images/playerbankrighthit.png)";
var playerHit = self.element.style.backgroundImage="url(images/playerhit.png)";

        gameBoard.playerexplodefx.play();
        if (self.lives >= 2){
            self.livesElement[0].remove()
            self.lives--;
                if (gameBoard.movement.left) {
                    bankLeftHit;
                    } else if (gameBoard.movement.right) {
                    bankRightHit;
                    } else {
                    playerHit;
            }
            
        } else if (self.lives === 1){
            self.lives--;
            self.livesElement[0].remove()
                    if (gameBoard.movement.left) {
                        bankLeftHit;
                        } else if (gameBoard.movement.right) {
                        bankRightHit;
                        } else {
                        playerHit;
                        }
            gameOver();
        }
    }
    
    
//Shoot laser function
    var shoot = function(){

        if(self.lasers.length >= maxLaser){
            return;
        }
        gameBoard.laserfx.play();
        self.lasers.push(new Laser(self.position.x, self.position.y, 15, "player-laser"));
    }

//Remove laser function
    this.removeLaser = function(){
        self.lasers[0].element.remove();
        self.lasers.splice(0,1);
    }

//Movement function
    function move(movement){
        if(movement.right){
            self.position.x += speed;
        }

        if(movement.left){
            self.position.x -= speed;
        }
    }

//Edge detection for movement
    function edgeDetect(){
        //Collision detection for wall
        if(self.position.x <= 25){
          self.position.x = 25;
        }
      
        if(self.position.x >= (screenWidth-25)){
          self.position.x = screenWidth-25;
        }
    }
    


    this.render = function(movement){

        //Control movement of player
        if(movement.left || movement.right){
            move(movement);
        }

        if(movement.shoot){
            shoot();
        }

        self.element.style.left = self.position.x;
        self.element.style.top = self.position.y;

        edgeDetect();

        //Remove lasers when reach the top of the screen
        self.lasers.forEach(function(el, index){
            el.render();

            if(el.position.y < 0 ){

                el.element.remove();
                self.lasers.splice(index,1);
            }
        });
    }
    create();
}