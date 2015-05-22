// Enemies our player must avoid
var Enemy = function() {
    // all enemies start off the screen
    this.x = -101;
    // randomly decide on which row the enemy runs
    this.y = 219 + getRandomArbitrary(0, 2) * -83;
    // count and startingTime are used to determine when this enemy begins his journey
    this.count = 1;
    this.startingTime = getRandomArbitrary(1, 500);
    this.started = false;
    // enemy have 4 different speed levels
    this.speed = getRandomArbitrary(1, 4);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// create a random Integer within the given bounds, both are inclusive
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min +1) + min);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // an enemy's position is only updated if it is about to start or has already started
    if(this.count == this.startingTime || this.started){
        this.x += (Math.round(101 * dt * this.speed));
        this.started = true;
    }
    this.count++;
    // if an enemy leaves the playing area it is automatically reset and made ready to start again
    if(this.x > 505){
        this.x = -101;
        this.started = false;
        this.count = 1;
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
    // player starting position
    this.x = 202;
    this.y = 385;
    this.sprite = 'images/char-boy.png';
    //  nextMove holds the user input command until it is updated
    this.nextMove = null;
};

// compute player's new position if user put in a command
Player.prototype.update = function(){
    if(this.nextMove !== null){
        var newX = this.x + this.nextMove.x;
        var newY = this.y + this.nextMove.y;
        // make sure that user's input would not make the player leave the playing field
        if(newX >= 0 && newX <= 404){
            this.x = newX;
        }
        if(newY <= 385 && newY >= -30){
            this.y = newY;
        }
        this.nextMove = null;
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// assign positional values to user's input
Player.prototype.handleInput = function(key){
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

// 10 enemies are created and kept in an array.
var allEnemies = [];
var createEnemies = function(){
    for(var i=0; i<10; i++){
        var e = new Enemy();
        allEnemies.push(e);
    }
};
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
