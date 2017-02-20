var Player = function(){

    /*
     * Game variables
     */
    var speed = 20;
    var heath = 100;
    var maxLaser = 20;

    /*
     * Game Environment
     */
    var lasers = [];
    var position = {
        "x": window.innerWidth / 2,
        "y": window.innerHeight - 25
    };

    var element = document.getElementById("player");
    var shoot = function(){

        if(lasers.length >= maxLaser){
            return;
        }

        lasers.push(new Laser(position.x, position.y));
    }


    function move(movement){
        if(movement.right){
            position.x += speed;
        }

        if(movement.left){
            position.x -= speed;
        }
    }

    this.render = function(movement){

        if(movement.left || movement.right){
            move(movement);
        }

        if(movement.shoot){
            shoot();
        }

        element.style.left = position.x;
        element.style.top = position.y;

        lasers.forEach(function(el, index){
            el.render();

            if(el.position.y < 0 ){


                el.element.remove();
                lasers.splice(index,1);
            }
        });
    }
}