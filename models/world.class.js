class World {
    character = new Character(keyboard);
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar;
    bottleBar = new BottleBar;
    coinBar = new CoinBar;
    endbossStatusBar = new EndbossStatusBar();
    showEndbossStatusBar = false;
    throwableObjects = [];
    lastThrowTime = 0;

    /**
     * Creates an instance of the World.
     * @param {HTMLCanvasElement} canvas - The canvas element used for drawing the game world.
     * @param {Keyboard} keyboard - The keyboard input object.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    };

    /**
     * Associates the world with the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the game loop, which updates the game state at regular intervals.
     */
    run() {
        setInterval(() => {
            this.checkCollisions()
            this.checkThrowObjects();
            this.checkCollectBottles();
            this.checkCollisionBottleThrow();
            this.checkCollectCoins();
            this.checkEndbossDistance();
            this.checkCollisionEndboss();
            this.checkCollisionEndbossThrow();
        }, 10);
    }

    /**
     * Checks the distance between the character and the endboss. If within range, alerts the endboss.
     */
    checkEndbossDistance() {
        let endboss = this.level.endboss[0];
        let distance = endboss.x - this.character.x;
        if (distance < 500) {
            this.level.endboss[0].isAlert = true;
            this.showEndbossStatusBar = true;
            angryEndboss.play();
        }
    }

    /**
     * Checks if the character collects any coins and updates the coin bar accordingly.
     */
    checkCollectCoins() {
        this.level.collectableObjects.forEach((object, index) => {
            if (this.character.isColliding(object) && object instanceof Coin) {
                collectCoin.currentTime = 0;
                collectCoin.play();
                this.level.collectableObjects.splice(index, 1);
                this.character.collectCoin();
                this.coinBar.setPercentage(this.character.coins);
            }
        });
    }

    /**
     * Checks if the character collects any bottles and updates the bottle bar accordingly.
     */
    checkCollectBottles() {
        this.level.collectableObjects.forEach((object, index) => {
            if (this.character.isColliding(object) && object instanceof Bottle) {
                if (this.character.bottles <= 80) {
                    bottle_sound.currentTime = 0;
                    bottle_sound.play();
                    this.level.collectableObjects.splice(index, 1);
                    this.character.collectBottle();
                    this.bottleBar.setPercentage(this.character.bottles);
                }
            }
        });
    }

    /**
     * Handles the throwing of bottles. Checks if the character has enough bottles and updates the bottle bar.
     */
    checkThrowObjects() {
        let now = new Date().getTime();
        if (this.keyboard.F && now - this.lastThrowTime > 1500) {
            if (this.character.bottles >= 20 && this.character.otherDirection == false) {
                let bottle = new ThrowableObject(this.character.x, this.character.y)
                this.throwableObjects.push(bottle)
                throwBottle.play();
                this.character.updateBottleCount();
                this.bottleBar.setPercentage(this.character.bottles);
                this.lastThrowTime = now;
                this.keyboard.F = false;
            }
        }
    }

    /**
     * Checks for collisions between the character and enemies, and handles them accordingly.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && !enemy.isDead) {
                this.handleCollision(enemy, index);
            }
        });
    }

    /**
     * Handles a collision between the character and an enemy. Determines whether the enemy is defeated or the character is hit.
     * @param {Enemy} enemy - The enemy involved in the collision.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    handleCollision(enemy, index) {
        if (this.character.isAboveGround() && this.character.speedY < 0) {
            this.handleEnemyDefeat(enemy, index);
        } else {
            this.handleCharacterHit();
        }
    }

    /**
     * Handles the defeat of an enemy by the character, including updating the enemy's state and playing sound effects.
     * @param {Enemy} enemy - The defeated enemy.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    handleEnemyDefeat(enemy, index) {
        this.character.speedY = 20;
        this.character.x += 2;
        enemy.isDead = true;
        this.character.triggerJumpAnimation();
        this.playHurtSound();
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 200);
    }

    /**
     * Handles the scenario where the character is hit by an enemy.
     */
    handleCharacterHit() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    /**
     * Plays the sound effect for an enemy being hurt.
     */
    playHurtSound() {
        chickenHurt.pause();
        chickenHurt.currentTime = 0;
        chickenHurt.play();
    }

    /**
     * Checks for collisions between throwable objects and enemies, and handles them accordingly.
     */
    checkCollisionBottleThrow() {
        this.throwableObjects.forEach((throwableObject, throwableIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (throwableObject.isColliding(enemy) && !enemy.isDead) {
                    this.handleEnemyCollision(enemy);
                    this.removeThrowableObject(throwableIndex);
                    this.scheduleEnemyRemoval(enemyIndex);
                }
            });
        });
    }

    /**
     * Handles the collision between a throwable object and an enemy, including updating the enemy's state and playing sound effects.
     * @param {Enemy} enemy - The enemy involved in the collision.
     */
    handleEnemyCollision(enemy) {
        enemy.isDead = true;
        setTimeout(() => {
            chickenHurt.play();
            bottleSplash.currentTime = 0.6;
            bottleSplash.play();
        }, 100);
    }

    /**
     * Removes a throwable object from the world.
     * @param {number} index - The index of the throwable object in the throwableObjects array.
     */
    removeThrowableObject(index) {
        this.throwableObjects.splice(index, 1);
    }

    /**
     * Schedules the removal of an enemy from the level.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    scheduleEnemyRemoval(index) {
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 250);
    }

    /**
     * Checks for collisions between throwable objects and the endboss, and handles them accordingly.
     */
    checkCollisionEndbossThrow() {
        this.throwableObjects.forEach((throwableObject, throwableIndex) => {
            this.level.endboss.forEach((endboss) => {
                if (throwableObject.isColliding(endboss)) {
                    endboss.endbossHit();
                    this.endbossStatusBar.setPercentage(endboss.energy);
                    bossHit.play();
                    if (endboss.energy <= 0) {
                        endboss.isDead = true;
                    }
                    this.throwableObjects.splice(throwableIndex, 1);
                }
            });
        });
    }

    /**
     * Checks for collisions between the character and the endboss, and handles them accordingly.
     */
    checkCollisionEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.endbossHit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Draws the game world, including background, game objects, and status bars.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();
        this.drawGameObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusBars();
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Draws the background of the level.
     */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
    };

    /**
     * Draws the status bars, including the endboss status bar if it should be shown.
     */
    drawStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        if (this.showEndbossStatusBar) {
            this.addToMap(this.endbossStatusBar);
        }
    };

    /**
     * Draws all game objects, including the character, clouds, enemies, endboss, and throwable objects.
     */
    drawGameObjects() {
        this.addObjectsToMap(this.level.collectableObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
    };

    /**
     * Adds a collection of objects to the canvas.
     * @param {MovableObject[]} objects - The array of objects to add to the canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    };

    /**
     * Draws a single movable object on the canvas.
     * @param {MovableObject} mo - The movable object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawESP(this.ctx);
        // mo.drawESP2(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    };

    /**
     * Flips the image of a movable object horizontally.
     * @param {MovableObject} mo - The movable object whose image should be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Reverts the horizontal flip of a movable object's image.
     * @param {MovableObject} mo - The movable object whose image flip should be reverted.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
};