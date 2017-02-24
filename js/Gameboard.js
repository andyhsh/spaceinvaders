//game states
var gameState = 'startscreen';

var gameoverElement = document.getElementById('gameover');

//start button
var startButton = document.getElementById('startbutton');
startButton.addEventListener('click', function(){
    gameState = 'gamestart';
    document.getElementById('start').style.zIndex = -1;
    document.getElementById('player').style.zIndex = 0;
    document.getElementById('score-tracker').style.zIndex = 1;
    document.getElementById('life-tracker').style.zIndex = 1;
})

//retry button
var retryButton = document.getElementById('retrybutton');
retryButton.addEventListener('click', function(){
    //reset player lives
    gameBoard.player.lives = 3;
    gameState = 'gamestart';
    gameoverElement.style.zIndex = -1;
})

//gameover function
function gameOver() {
    gameState = 'gameover';
    gameoverElement.style.zIndex = 1;
    gameoverElement.classList.add('animated', 'slideInUp');
}

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
    this.score = 0;
    var lives;
    var alienSpeed = 1;

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

                if (self.rocks.length === 0) {
                    var y = screenHeight - 150;
                    var x = 100;
                    for (var i = 0; i < 5; i++) {    
                    self.rocks.push(new Rock(x,y));
                    x += 150;
                    } 
                }
            }
        
    }

    /*
     * Game Environment
     */

    this.movement = {
        "left":false,
        "right":false,
        "shoot":false
    };

    //Collision detection
        
        this.collision = function(objA, objB){
            if (objA.left < objB.left + objB.width &&
            objA.left + objA.width > objB.left &&
            objA.top < objB.top + objB.height &&
            objA.height + objA.top > objB.top) {
                return true;
            } else {
                return false;
            }
        }

        function collisionDetection(){

            //detection for rocks with player lasers
            self.rocks.forEach(function(el, index){
                if ((self.player.lasers.length !== 0) && (self.rocks.length !== 0)) {
                     var rockDetect = self.rocks[index].element.getClientRects()[0];
                     var laserDetect = self.player.lasers[0].element.getClientRects()[0];
                        if (self.collision(rockDetect, laserDetect)){
                            //remove player lasers and register hit on rock
                            self.player.removeLaser();
                            self.rocks[index].hit(index);  
                        }
                }
            })

            //detection for enemy lasers and rocks
            self.aliens.forEach(function(el, index){                
                if ((self.aliens[index].lasers.length !== 0) && (self.rocks.length !== 0)) {
                    for (var i = 0; i < self.rocks.length; i++) {
                     var rockDetect = self.rocks[i].element.getClientRects()[0];
                     var laserDetect = self.aliens[index].lasers[0].element.getClientRects()[0];
                     
                      if (self.collision(rockDetect, laserDetect)) {
                            //remove enemy lasers and register hit on rock
                            self.aliens[index].removeLaser();
                            self.rocks[i].hit(i);  
                        }
                    }
                }
            })

                //detection for aliens with lasers
                self.aliens.forEach(function(el, index){
                    if ((self.player.lasers.length !== 0) && (self.aliens.length !== 0)){
                        var alienDetect = self.aliens[index].element.getClientRects()[0];
                        var laserDetect = self.player.lasers[0].element.getClientRects()[0];

                          if (self.collision(alienDetect, laserDetect)) {
                                
                                //calculate points based on alien type
                                if (self.aliens[index].element.className.includes("alien1")) {
                                self.score += 10;
                                } else if (self.aliens[index].element.className.includes("alien2")) {
                                self.score += 15;
                                } else if (self.aliens[index].element.className.includes("alien3")) {
                                self.score += 20;
                                } 

                                //remove aliens
                                if (self.aliens[index].lasers.length !== 0) {
                                    self.aliens[index].lasers[0].element.remove(); 
                                }
                                self.aliens[index].explode(index); 
    
                                //remove player's lasers 
                                self.player.removeLaser();                             
                            }                  
                    }
           }) 

                //detection for enemy lasers with player
                self.aliens.forEach(function(el, index){
                    if (self.aliens[index].lasers.length !== 0) {
                        var alienLasersDetect = self.aliens[index].lasers[0].element.getClientRects()[0];
                        var playerDetect = self.player.element.getClientRects()[0];

                          if (self.collision(alienLasersDetect, playerDetect)) {
                            //register hidt on player
                            self.player.hit();
                           
                            //remove enemy lasers
                            self.aliens[index].removeLaser();
                            }
                    }

                }) 

            //detection for enemies with player
            self.aliens.forEach(function(el, index){
                if ((self.player) && (self.aliens.length !== 0)) {
                     var alienDetect = self.aliens[index].element.getClientRects()[0];
                     var playerDetect = self.player.element.getClientRects()[0];

                      if (self.collision(alienDetect, playerDetect)) {
                            //register hit on player and remove alien
                            self.player.hit();
                        }
                }
            })
        }   

    //scoreboard
    function scoreBoard () {
    var scoreElement = document.getElementById('score');
    scoreElement.textContent = self.score;
    }

    /*
     * Event listeners
     */
    document.addEventListener('keydown', function(e) {

        switch(e.keyCode){
            case 37:
                self.movement.left = true;
                self.player.element.style.backgroundImage="url(images/playerbankleft.png)";
                break;
            case 39:
                self.movement.right = true;
                self.player.element.style.backgroundImage="url(images/playerbankright.png)";
                break;
            case 32:
                self.movement.shoot = true;
                break;
            default:
        }
    });

    document.addEventListener('keyup', function(e) {
        switch(e.keyCode){
            case 37:
                self.movement.left = false;
                self.player.element.style.backgroundImage="url(images/player.png)";
                break;
            case 39:
                self.movement.right = false;
                self.player.element.style.backgroundImage="url(images/player.png)";
                break;
            case 32:
                self.movement.shoot = false;
                break;
            default:
        }
    });

    //rendering

    function render(){
 
        if (gameState !== 'startscreen' && gameState !== 'gameover') {

        self.player.render(self.movement);

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




