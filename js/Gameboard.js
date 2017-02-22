var GameBoard = function(){

    /*
     * Game variables
     */
    var player = new Player();
    var aliens = [];
    var rocks = [];

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
        

        // function collisionDetection(){



        //          var rockDetect = document.querySelector('.rock').getClientRects()[0];
        //          var laserDetect = document.querySelector('.player-laser').getClientRects()[0];

        //           if (rockDetect.left < laserDetect.left + laserDetect.width &&
        //              rockDetect.left + rockDetect.width > laserDetect.left &&
        //              rockDetect.top < laserDetect.top + laserDetect.height &&
        //              rockDetect.height + rockDetect.top > laserDetect.top) {
        //               console.log('ok!');
        //           };
                
        //     }



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

        // collisionDetection();
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