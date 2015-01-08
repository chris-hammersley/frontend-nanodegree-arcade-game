// Enemies our player must avoid
var Enemy = function(y) {
    this.sprite = 'images/enemy-bug.png';
    // Starting column position for bugs
    this.startColumn = [63,145,228,312];
    // making horizontal start position random
    this.x = this.positionX();
    this.y = this.positionY();
    // adding speed array for bugs
    this.speed = [50,250,75,300,125,175,350,500];
}

// Random X position for bugs
Enemy.prototype.positionX = function() {
    var initialX = -(Math.round(Math.random()*600));
    // subtract 150 from initial value to keep bugs from popping onto screen
    return (initialX)-150;
}

// Random Y position for bugs
Enemy.prototype.positionY = function() {
    var initialY = this.startColumn[Math.round(Math.random()*4)];
    return initialY;
}

// Reset bug's starting position after it runs off screen right
Enemy.prototype.reset = function() {
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Added random bug speed based on initial speed array
// Reset bug position to random row & column (x,y) after it runs off screen 
Enemy.prototype.update = function(dt) {
    this.x += this.speed[Math.round(Math.random()*4)]*dt;
    if (this.x > 505) {
        this.x = this.positionX();
        this.y = this.positionY();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Set random speed for the different bugs
Enemy.prototype.speed = function() {
    // write random speed function
}

// Collision detection attempt 1
function checkCollisions(enemy,player) {
    for(var i in enemy) {
        if((player.x - enemy[i].x < 50 && player.y - enemy[i].y < 50) && (player.x - enemy[i].x > -50 && player.y - enemy[i].y > -50 )) {
            player.reset();
        }
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
}

// Reset player starting position after it hits bug
// Need to call reset function when player reaches water
Player.prototype.reset = function() {
    this.x = 203;
    this.y = 407;
}

// Update player position
// Parameter: dt, a time delta between ticks
// Added collision check
Player.prototype.update = function(dt) {
    checkCollisions();
    this.x * dt;
    this.y * dt;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Allow user to input player movements
Player.prototype.handleInput = function(key) {
    // write player movement input function
    if (key === 'left' && this.x > 15) {
        this.x -= 101;
    }
    else if (key === 'right' && this.x < 400) {
        this.x += 101;
    }
    else if (key === 'up' && this.y > 30) {
        this.y -= 83;
    }
    else if (key === 'down' && this.y < 400) {
        this.y += 83;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// ENEMIES
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var bug4 = new Enemy();
var bug5 = new Enemy();
var bug6 = new Enemy();
var bug7 = new Enemy();
var bug8 = new Enemy();
var allEnemies=[bug1,bug2,bug3,bug4,bug5,bug6,bug7,bug8];

// PLAYER
var player = new Player(203, 407);

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
