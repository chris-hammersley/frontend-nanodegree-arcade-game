// Enemies our player must avoid
var Enemy = function(y) {
    this.sprite = 'images/enemy-bug.png';
    // Y position for bugs
    this.bugY = [145,228,312];
    // making horizontal start position random
    this.x = this.positionX();
    this.y = this.positionY();
    // adding speed range for bugs
    this.speed = [50,75,100,150,175,200,250];
}

// Random X position for bugs
Enemy.prototype.positionX = function() {
    var initialX = -(Math.round(Math.random()*600));
    // subtract 150 from value to keep bugs from popping onto screen
    return (initialX)-150;
}

// Random Y position for bugs
Enemy.prototype.positionY = function() {
    var initialY = this.bugY[Math.round(Math.random()*2)];
    return initialY;
}

// Reset bug's speed to ensure it is random
// Reset bug's starting position after it runs off screen right
Enemy.prototype.reset = function(x) {
    // write reset functions
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // random bug speed based on initial speed range
    this.x += this.speed[Math.round(Math.random()*5)]*dt;
    // reset bug position after it runs off screen to random row & column (x,y)
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
}

// Reset player starting position after it hits bug or reaches water
Player.prototype.reset = function() {
    // write reset functions
}

// Update player position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    this.x * dt;
    this.y * dt;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Allow user to input player movements
// Not working correctly
// add boundaries on left/right sides and bottom
// allow player to reach grass
Player.prototype.handleInput = function(key) {
    // write player movement input function
    if (key === 'left' && this.x > 0) {
        this.x -= 101;
    }
    else if (key === 'right' && this.x < 505) {
        this.x += 101;
    }
    else if (key === 'up' && this.y > 60) {
        this.y -= 83;
    }
    else if (key === 'down' && this.y < 505 && this.y !=60) {
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
var allEnemies=[bug1,bug2,bug3,bug4,bug5,bug6];

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
