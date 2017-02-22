var player = new Player();
var aliens = [];
var rocks =  [];
var laserfx = new Audio('./sound/laser.mp3');

var GameBoard = function(){

    /*
     * Game variables
     */
    player = new Player();
    aliens = [];
    rocks = [];



    //spawn 10 aliens    
    function spawnAliens(y) {
    var x = 100;
    var y = y;
    for (var i = 0; i < 10; i++) {
        aliens.push(new AlienType1(x,y));
        x +=75;
        }
    }

    spawnAliens(100);
    spawnAliens(150);
    spawnAliens(200);
    spawnAliens(250);
    spawnAliens(300);

    function spawnRocks() {
    var y = window.innerHeight - 200;
    var x = 300;
    for (var i = 0; i < 3; i++) {    
        rocks.push(new Rock(x,y));
        x += 200;
        }
    } 

    spawnRocks();  

    /*
     * Game Environment
     */

    var height = window.innerHeight;
    var width = window.innerWidth;


    var movement = {
        "left":false,
        "right":false,
        "shoot":false
    };

    //Collision detection
        

        function collisionDetection(){

            //detection for rocks with player lasers
            rocks.forEach(function(el, index){
                if ((player.lasers.length != 0) && (rocks.length != 0)) {
                     var rockDetect = rocks[index].element.getClientRects()[0];
                     var laserDetect = player.lasers[0].element.getClientRects()[0];

                      if (rockDetect.left < laserDetect.left + laserDetect.width &&
                         rockDetect.left + rockDetect.width > laserDetect.left &&
                         rockDetect.top < laserDetect.top + laserDetect.height &&
                         rockDetect.height + rockDetect.top > laserDetect.top) {

                            console.log('hit rock #' + index);
                            player.lasers[0].element.remove();
                            player.lasers.splice(0,1);
                            rocks[index].hit(index);  
                        }
                }
            })

                //detection for aliens with lasers
                aliens.forEach(function(el, index){
                    if ((player.lasers.length != 0) && (aliens.length != 0)){
                        var alienDetect = aliens[index].element.getClientRects()[0];
                        var laserDetect = player.lasers[0].element.getClientRects()[0];

                          if (alienDetect.left < laserDetect.left + laserDetect.width &&
                             alienDetect.left + alienDetect.width > laserDetect.left &&
                             alienDetect.top < laserDetect.top + laserDetect.height &&
                             alienDetect.height + alienDetect.top > laserDetect.top) {
                                
                                
                                //remove player's lasers 
                                player.lasers[0].element.remove();
                                player.lasers.splice(0,1);
                                //remove alien's lasers
                                if (aliens[index].lasers.length != 0) {
                                    aliens[index].lasers[0].element.remove();     
                                }
                                //remove aliens
                                aliens[index].element.remove();
                                aliens.splice(index,1);
                                
                            }                  
                    }
           }) 
/*
                //detection for enemy lasers with player
                aliens.forEach(function(el, index){
                    if (aliens[index].lasers != 0) {
                        var alienLasersDetect = aliens[index].lasers.element.getClientRects()[0];
                        var playerDetect = player.element.getClientRects()[0];

                          if (alienLasersDetect.left < playerDetect.left + playerDetect.width &&
                             alienLasersDetect.left + alienLasersDetect.width > playerDetect.left &&
                             alienLasersDetect.top < playerDetect.top + playerDetect.height &&
                             alienLasersDetect.height + alienLasersDetect.top > playerDetect.top) {

                            console.log('you\'ve been hit by alien #' + aliens[index]);
                            }
                    }

                }) */
        }   


    /*
     * Event listeners
     */
    document.addEventListener('keydown', function(e) {

        switch(e.keyCode){
            case 37:
                movement.left = true;
                break;
            case 39:
                movement.right = true;
                break;
            case 32:
                movement.shoot = true;
                break;
            default:
        }
    });

    document.addEventListener('keyup', function(e) {
        switch(e.keyCode){
            case 37:
                movement.left = false;
                break;
            case 39:
                movement.right = false;
                break;
            case 32:
                movement.shoot = false;
                break;
            default:
        }
    });

    //rendering

    function render(){
 
        player.render(movement);

        for (var i = 0; i < rocks.length; i++){
            rocks[i].render();
        }

        for (var i = 0; i < aliens.length; i++){
            aliens[i].render();
        }

        collisionDetection();
    }



    function animloop(){
        requestAnimFrame(animloop);
        render();
    }
    animloop();

}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var gameBoard = new GameBoard();