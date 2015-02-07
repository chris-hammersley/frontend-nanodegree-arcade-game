// Enemies our player must avoid
var Enemy = function(y) {
    this.sprite = 'images/enemy-bug.png';
    // CH - starting row position for bugs
    this.startRow = [63,145,228,312];
    // CH - make horizontal start position random
    this.x = this.positionX();
    this.y = this.positionY();
    // CH - adding speedrange array for bugs
    this.speedRange = [75, 500];
    this.reset();
}

// CH - random X position for bugs
Enemy.prototype.positionX = function() {
    var initialX = -(Math.round(Math.random()*600));
    // CH - subtract 150 from initial value to keep bugs from popping onto screen
    return (initialX)-150;
}

// CH - random Y position for bugs
Enemy.prototype.positionY = function() {
    var initialY = this.startRow[Math.round(Math.random()*4)];
    return initialY;
}

// Reset bug's starting position after it runs off screen right
// CH - also reset the bug speed
Enemy.prototype.reset = function() {
    this.x = this.positionX();
    this.y = this.positionY();
    this.speed = this.randomSpeed();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// CH - reset bug position to random row & column (x,y) after it runs off screen 
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.reset();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Set random speed for the different bugs
// CH - added random bug speed based on difference between initial speed array
Enemy.prototype.randomSpeed = function() {
    var minSpeed = this.speedRange[0],
        maxSpeed = this.speedRange[1];
    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
}

// CH - collision detection attempt 1; it allows 'close calls' with the bugs!
function checkCollisions(enemy,player) {
    for(var i in enemy) {
        if((player.x - enemy[i].x < 50 && player.y - enemy[i].y < 50) && (player.x - enemy[i].x > -50 && player.y - enemy[i].y > -50 )) {
            // CH - player loses some booty when hit by bugs
            treasure--;
            // CH - player gets reset to beginning position
            player.reset();
        }
    }
}

// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
    this.reset();
}

// Reset player starting position
Player.prototype.reset = function() {
    this.x = 203;
    this.y = 407;
}

// Update player position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // CH - added a game over check if treasure count dips below zero
    if(treasure <= -1) {
        return gameOver();
    }
    // CH - added collision check
    checkCollisions();
    this.x * dt;
    this.y * dt;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// CH - added Random Objects for player to collect
var Booty = function() {
    this.bootyImages = ['images/Key.png', 'images/Star.png', 'images/Heart.png','images/Gem%20Blue.png', 'images/Gem%20Orange.png','images/Gem%20Green.png'];
    this.bootyPosX = [1, 101, 202, 303, 404];
    this.bootyPosY = [63, 145, 228, 312, 396];
    this.bootyImage = this.bootyImages[Math.floor(Math.random() * 6)];
    this.x = this.bootyPosX[Math.floor(Math.random() * 5)];
    this.y = this.bootyPosY[Math.floor(Math.random() * 5)];
}

Booty.prototype.update = function() {
    // CH - added scoring to the collection of booty
    document.getElementById("treasure").innerHTML = 'Treasures Collected: ' + treasure;
    // CH - added the collection of booty
    if(player.y <= this.y + 30 && player.y >= this.y - 30 && player.x <= this.x + 30 && player.x >= this.x -30) {
        treasure++;
        this.bootyImage = this.bootyImages[Math.floor(Math.random() * 6)];
        this.x = this.bootyPosX[Math.floor(Math.random() * 5)];
        this.y = this.bootyPosY[Math.floor(Math.random() * 5)];
    }
}

// CH - draw the booty on the screen
Booty.prototype.render = function() {
    ctx.drawImage(Resources.get(this.bootyImage), this.x, this.y);
}

// CH - created a variable to hold the treasure with initial value zero
var treasure = 0;

// CH - Game Over if player score dips below 0
function gameOver() {
    var finalScore = document.getElementById("treasure");
        finalScore.parentNode.removeChild(finalScore);
        // CH - let's hide the game board
        ctx.clearRect(0, 0, 909, 606);
        // CH - then add a game over message
        ctx.font = '20px Arial';
        ctx.fillstyle = 'black';
        ctx.fillText('Those Alien Cockroaches Took All Your Treasure!', 40, 100);
        ctx.fillText('Your Game is Over.', 180, 130);
        ctx.fillText('Click Your Browser Refresh Button to Play Again.', 40, 160);
        keyEnabled = false;
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
var player = new Player();

// TREASURE
var booty = new Booty();

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

// CH - disable the arrow keys from affecting scroll bar 
document.addEventListener('keydown', function(e) {
    if([37,38,39,40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
