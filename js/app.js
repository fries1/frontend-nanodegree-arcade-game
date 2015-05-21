// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -101;
    this.y = 219 + Math.floor(getRandomArbitrary(0, 3)) * -83;
    this.count = 1;
    this.startingTime = Math.floor(getRandomArbitrary(1, 500));
    this.started = false;
    this.speed = Math.floor(getRandomArbitrary(1, 4));
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.count == this.startingTime || this.started){
        console.log('found an enemy to start');
        this.x += 101 * dt * this.speed;
        this.started = true;
    }
    this.count++;
    if(this.x > 505){
        this.x = -101;
        this.startingTime * 3;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 505/2 - 101/2;
    this.y = 606 - 171 - 50;
    this.sprite = 'images/char-boy.png';
    this.nextMove = null;
};

Player.prototype.update = function(){
    if(this.nextMove != null){
        var newX = this.x + this.nextMove.x;
        var newY = this.y + this.nextMove.y;
        if(newX >= 0 && newX <= 404){
            this.x = newX;
        }
        if(newY <= 385 && newY >= -30){
            this.y = newY;
        }

        console.log('x ' + this.x + ' y ' + this.y);
        this.nextMove = null;
    }
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key){
    console.log(key);
    switch (key){
        case 'up':
            this.nextMove = {
                x: 0,
                y: -83
            };
            break;
        case 'left':
            this.nextMove = {
                x: -101,
                y: 0
            };
            break;
        case 'right':
            this.nextMove = {
                x: 101,
                y: 0
            };
            break;
        case 'down':
            this.nextMove = {
                x: 0,
                y: 83
            };
            break;
        default:
            this.nextMove = null;
            console.log('invalid move');
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var createEnemies = function(){
    for(var i=0; i<10; i++){
        var e = new Enemy();
        allEnemies.push(e);
    }
}
createEnemies();
// Place the player object in a variable called player

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
