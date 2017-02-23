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

//Lives tracker
    this.hit = function() {
        if (self.lives >= 2){
            self.livesElement[0].remove()
            self.lives--;
            
        } else if (self.lives === 1){
            self.lives--;
            self.livesElement[0].remove()
            console.log('GAMEOVER');
            gameOver();
        }
    }
    
    
//Shoot laser function
    var shoot = function(){

        if(self.lasers.length >= maxLaser){
            return;
        }
        gameBoard.laserfx.play();
        self.lasers.push(new Laser(self.position.x, self.position.y));
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
        if(self.position.x <= 20){
          self.position.x = 20;
        }
      
        if(self.position.x >= (screenWidth-20)){
          self.position.x = screenWidth-20;
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