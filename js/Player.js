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
    var position = {
        "x": screenWidth / 2,
        "y": screenHeight - 20
    };

    this.element = document.getElementById("player");
    this.livesElement = document.getElementsByClassName("lives");

    var self = this;

//Lives tracker
    this.hit = function() {
        if (self.lives >= 2){
            self.livesElement[0].remove()
            self.lives--;
            
        } else if (self.lives === 1){
            self.lives--;
            self.livesElement[0].remove()
            console.log('GAMEOVER');
        }

    }
    
    
//Shoot laser function
    var shoot = function(){

        if(self.lasers.length >= maxLaser){
            return;
        }
        laserfx.play();
        self.lasers.push(new Laser(position.x, position.y));
    }

//Movement function
    function move(movement){
        if(movement.right){
            position.x += speed;
        }

        if(movement.left){
            position.x -= speed;
        }
    }

//Edge detection for movement
    function edgeDetect(){
        //Collision detection for wall
        if(position.x <= 20){
          position.x = 20;
        }
      
        if(position.x >= (screenWidth-20)){
          position.x = screenWidth-20;
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

        self.element.style.left = position.x;
        self.element.style.top = position.y;

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
}