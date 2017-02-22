var Player = function(){

    /*
     * Game variables
     */
    var speed = 8;
    var health = 100;
    var maxLaser = 1;

    /*
     * Game Environment
     */
    var lasers = [];
    var position = {
        "x": window.innerWidth / 2,
        "y": window.innerHeight - 50
    };

    var element = document.getElementById("player");
    
//Shoot laser function
    var shoot = function(){

        if(lasers.length >= maxLaser){
            return;
        }

        lasers.push(new Laser(position.x, position.y));
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
      
        if(position.x >= (window.innerWidth-20)){
          position.x = window.innerWidth-20;
        }
    }
    

    this.render = function(movement){

        //Track coordinates
        //console.log('Coordinates ' + position.x, position.y);

        //Control movement of player
        if(movement.left || movement.right){
            move(movement);
        }

        if(movement.shoot){
            shoot();
        }

        element.style.left = position.x;
        element.style.top = position.y;

        edgeDetect();

        //Remove lasers when reach the top of the screen
        lasers.forEach(function(el, index){
            el.render();

            if(el.position.y < 0 ){


                el.element.remove();
                lasers.splice(index,1);
            }
        });
    }
}