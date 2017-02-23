//game states

var gameState = 'startscreen';

var startButton = document.getElementById('startbutton');
startButton.addEventListener('click', function(){
    console.log('start game!');
    gameState = 'gamestart';
    document.getElementById('start').style.zIndex = -1;
})





//global scope variables
var player = new Player();
var aliens = [];
var rocks =  [];

//music clips
var laserfx = new Audio('./sound/laser2.wav');
var explodefx = new Audio('./sound/explosion.wav');
var playerexplodefx = new Audio('./sound/playerexplosion.wav');

//set gamescreen dimensions
var screenHeight = document.getElementById('gameboard').getClientRects()[0].height;
var screenWidth = document.getElementById('gameboard').getClientRects()[0].width;

var GameBoard = function(){

    /*
     * Game variables
     */

    player = new Player();
    aliens = [];
    rocks = [];
    var score = 0;
    var lives;
    var alienSpeed = 1.5;

    //spawn 10 aliens    
    function spawnAliensRow(y, speed, type) {
    var x = 100;
    var y = y;
    for (var i = 0; i < 10; i++) {
        aliens.push(new AlienType1(x, y, speed, type));
        x += 75;
        }
    }

    //spawning aliens
    
    function spawnAliens(){

    if (aliens.length === 0) {
        spawnAliensRow(100, alienSpeed, 'alien3');
        spawnAliensRow(150, alienSpeed, 'alien2');
        spawnAliensRow(200, alienSpeed, 'alien2');
        spawnAliensRow(250, alienSpeed, 'alien1');
        spawnAliensRow(300, alienSpeed, 'alien1');
        alienSpeed += 0.2;
        }
    }

    //spawn rocks
    function spawnRocks() {
    var y = screenHeight - 150;
    var x = 150;
    for (var i = 0; i < 3; i++) {    
        rocks.push(new Rock(x,y));
        x += 200;
        }
    } 

     

    /*
     * Game Environment
     */




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
                            //remove player lasers and register hit on rock
                            player.lasers[0].element.remove();
                            player.lasers.splice(0,1);
                            rocks[index].hit(index);  
                        }
                }
            })
/*
//detection for enemy lasers and rocks
            aliens.forEach(function(el, index){                
                if ((aliens[index].lasers.length != 0) && (rocks.length != 0)) {
                    for (var i = 0; i < rocks.length; i++) {
                     var rockDetect = rocks[i].element.getClientRects()[0];
                     var laserDetect = aliens[index].lasers[0].element.getClientRects()[0];
                     
                      if (rockDetect.left < laserDetect.left + laserDetect.width &&
                         rockDetect.left + rockDetect.width > laserDetect.left &&
                         rockDetect.top < laserDetect.top + laserDetect.height &&
                         rockDetect.height + rockDetect.top > laserDetect.top) {
                            
                            console.log('enemy #' + index + ' hit rock #' + i);
                            //remove player lasers and register hit on rock
                            aliens[index].lasers[0].element.remove();
                            //aliens[index].lasers.splice(0,1);
                            rocks[i].hit(i);  
                        }
                    }
                }
            })
*/
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
                                if (aliens[index].element.className === "alien1") {
                                score += 10;
                                } else if (aliens[index].element.className === "alien2") {
                                score += 15;
                                } else if (aliens[index].element.className === "alien3") {
                                score += 20;
                                } 
                                //remove alien's lasers
                                if (aliens[index].lasers.length != 0) {
                                    aliens[index].lasers[0].element.remove();     
                                }
                                //remove aliens
                                aliens[index].element.remove();
                                aliens.splice(index,1);
                                explodefx.play();
                                
                            }                  
                    }
           }) 

                //detection for enemy lasers with player
                aliens.forEach(function(el, index){
                    if (aliens[index].lasers.length != 0) {
                        var alienLasersDetect = aliens[index].lasers[0].element.getClientRects()[0];
                        var playerDetect = player.element.getClientRects()[0];

                          if (alienLasersDetect.left < playerDetect.left + playerDetect.width &&
                             alienLasersDetect.left + alienLasersDetect.width > playerDetect.left &&
                             alienLasersDetect.top < playerDetect.top + playerDetect.height &&
                             alienLasersDetect.height + alienLasersDetect.top > playerDetect.top) {

                            console.log('you\'ve been hit by alien #' + index);
                            playerexplodefx.play();
                            player.hit();
                           
                            console.log('you have' + player.lives + 'left')
                            //remove enemy lasers
                            aliens[index].lasers[0].element.remove(); 
                            aliens[index].lasers.splice(0,1);
                            }
                    }

                }) 

            //detection for enemies with player
            aliens.forEach(function(el, index){
                if ((player) && (aliens.length != 0)) {
                     var alienDetect = aliens[index].element.getClientRects()[0];
                     var playerDetect = player.element.getClientRects()[0];

                      if (alienDetect.left < playerDetect.left + playerDetect.width &&
                         alienDetect.left + alienDetect.width > playerDetect.left &&
                         alienDetect.top < playerDetect.top + playerDetect.height &&
                         alienDetect.height + alienDetect.top > playerDetect.top) {

                            console.log('you have been hit by alien #' + index);
                            //register hit on player and remove alien
                            player.hit();
                        }
                }
            })


        }   

    //scoreboard
    function scoreBoard () {
    var scoreElement = document.getElementById('score');
    var livesElement = document.getElementById('lives');
    scoreElement.textContent = score;
    //livesElement.textContent = player.health;
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
 
        if (gameState === 'gamestart') {

        player.render(movement);

        spawnAliens();

        for (var i = 0; i < rocks.length; i++){
            rocks[i].render();
        }

        for (var i = 0; i < aliens.length; i++){
            aliens[i].render();
        }

        collisionDetection();
        scoreBoard();

        }
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
