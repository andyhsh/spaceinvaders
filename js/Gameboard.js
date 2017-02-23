//game states

var gameState = 'startscreen';

var startButton = document.getElementById('startbutton');
startButton.addEventListener('click', function(){
    console.log('start game!');
    gameState = 'gamestart';
    document.getElementById('start').style.zIndex = -1;
})

//set gamescreen dimensions
this.screenHeight = document.getElementById('gameboard').getClientRects()[0].height;
this.screenWidth = document.getElementById('gameboard').getClientRects()[0].width;

var GameBoard = function(){

    /*
     * Game variables
     */

    this.player = new Player();
    this.aliens = [];
    this.rocks = [];
    var score = 0;
    var lives;
    var alienSpeed = 1.5;

    var self = this;


    //music clips
    this.laserfx = new Audio('./sound/laser2.wav');
    this.explodefx = new Audio('./sound/explosion.wav');
    this.playerexplodefx = new Audio('./sound/playerexplosion.wav');

    //spawn 10 aliens    
    function spawnAliensRow(y, speed, type) {
    var x = 25;
    var y = y;
    for (var i = 0; i < 10; i++) {
        self.aliens.push(new AlienType1(x, y, speed, type));
        x += 75;
        }
    }

    //spawning aliens
    
    function spawnAliens(){

    if (self.aliens.length === 0) {
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
        self.rocks.push(new Rock(x,y));
        x += 200;
        }
    } 

    spawnRocks();
     

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
            self.rocks.forEach(function(el, index){
                if ((self.player.lasers.length != 0) && (self.rocks.length != 0)) {
                     var rockDetect = self.rocks[index].element.getClientRects()[0];
                     var laserDetect = self.player.lasers[0].element.getClientRects()[0];

                      if (rockDetect.left < laserDetect.left + laserDetect.width &&
                         rockDetect.left + rockDetect.width > laserDetect.left &&
                         rockDetect.top < laserDetect.top + laserDetect.height &&
                         rockDetect.height + rockDetect.top > laserDetect.top) {

                            console.log('hit rock #' + index);
                            //remove player lasers and register hit on rock
                            self.player.lasers[0].element.remove();
                            self.player.lasers.splice(0,1);
                            self.rocks[index].hit(index);  
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
                self.aliens.forEach(function(el, index){
                    if ((self.player.lasers.length != 0) && (self.aliens.length != 0)){
                        var alienDetect = self.aliens[index].element.getClientRects()[0];
                        var laserDetect = self.player.lasers[0].element.getClientRects()[0];

                          if (alienDetect.left < laserDetect.left + laserDetect.width &&
                             alienDetect.left + alienDetect.width > laserDetect.left &&
                             alienDetect.top < laserDetect.top + laserDetect.height &&
                             alienDetect.height + alienDetect.top > laserDetect.top) {
                                
                                
                                //remove player's lasers 
                                self.player.lasers[0].element.remove();
                                self.player.lasers.splice(0,1);
                                if (self.aliens[index].element.className === "alien1") {
                                score += 10;
                                } else if (self.aliens[index].element.className === "alien2") {
                                score += 15;
                                } else if (self.aliens[index].element.className === "alien3") {
                                score += 20;
                                } 
                                //remove alien's lasers
                                if (self.aliens[index].lasers.length != 0) {
                                    self.aliens[index].lasers[0].element.remove();     
                                }
                                //remove aliens
                                self.aliens[index].element.remove();
                                self.aliens.splice(index,1);
                                self.explodefx.play();
                                
                            }                  
                    }
           }) 

                //detection for enemy lasers with player
                self.aliens.forEach(function(el, index){
                    if (self.aliens[index].lasers.length != 0) {
                        var alienLasersDetect = self.aliens[index].lasers[0].element.getClientRects()[0];
                        var playerDetect = self.player.element.getClientRects()[0];

                          if (alienLasersDetect.left < playerDetect.left + playerDetect.width &&
                             alienLasersDetect.left + alienLasersDetect.width > playerDetect.left &&
                             alienLasersDetect.top < playerDetect.top + playerDetect.height &&
                             alienLasersDetect.height + alienLasersDetect.top > playerDetect.top) {

                            console.log('you\'ve been hit by alien #' + index);
                            self.playerexplodefx.play();
                            self.player.hit();
                           
                            console.log('you have' + self.player.lives + 'left')
                            //remove enemy lasers
                            self.aliens[index].lasers[0].element.remove(); 
                            self.aliens[index].lasers.splice(0,1);
                            }
                    }

                }) 

            //detection for enemies with player
            self.aliens.forEach(function(el, index){
                if ((self.player) && (self.aliens.length != 0)) {
                     var alienDetect = self.aliens[index].element.getClientRects()[0];
                     var playerDetect = self.player.element.getClientRects()[0];

                      if (alienDetect.left < playerDetect.left + playerDetect.width &&
                         alienDetect.left + alienDetect.width > playerDetect.left &&
                         alienDetect.top < playerDetect.top + playerDetect.height &&
                         alienDetect.height + alienDetect.top > playerDetect.top) {

                            console.log('you have been hit by alien #' + index);
                            //register hit on player and remove alien
                            self.player.hit();
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

        self.player.render(movement);

        spawnAliens();

        for (var i = 0; i < self.rocks.length; i++){
            self.rocks[i].render();
        }

        for (var i = 0; i < self.aliens.length; i++){
            self.aliens[i].render();
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


