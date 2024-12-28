class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    protectedUntil = 0;
    x = 120;
    y = 280;
    lastActivityTime = new Date().getTime();
    bottles = 0;
    coins = 0;
    offset = {
        top: 5,
        left: 0,
        right: 0,
        bottom: 2
    };

    /**
     * Updates the last activity timestamp to the current time.
     */
    onActivity() {
        this.lastActivityTime = new Date().getTime();
    }

    /**
     * Applies gravity to the object, causing it to fall if it is not on the ground or is moving upwards.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} - True if the object is above the ground; otherwise, false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 215;
        }
    }

    /**
     * Checks if the object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object to check for collision.
     * @returns {boolean} - True if the objects are colliding; otherwise, false.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    /**
     * Applies damage to the object and handles the object's protection period after being hit.
     */
    hit() {
        const now = new Date().getTime();
        if (now < this.protectedUntil) {
            return;
        }
        this.energy -= 20;
        hurtSound.currentTime = 0.13;
        hurtSound.play();
        if (this.energy < 0) {
            this.energy = 0;
        }
        this.protectedUntil = now + 1000;
        this.lastHit = now;
    }

    /**
     * Increases the coin count of the object.
     */
    collectCoin() {
        this.coins += 20;
    }
    
    /**
     * Increases the bottle count of the object.
     */
    collectBottle() {
        this.bottles += 20;
    }

    /**
     * Decreases the bottle count of the object.
     */
    updateBottleCount() {
        this.bottles -= 20;
    }

    /**
     * Checks if the object is currently hurt based on the time since the last hit.
     * @returns {boolean} - True if the object is currently hurt; otherwise, false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead based on its energy level.
     * @returns {boolean} - True if the object's energy is zero; otherwise, false.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Increases the object's speed and sets it to an angry state.
     */
    attack() {
        if (!this.speedIncreased) {
            this.speed += 10.0;
            this.speedIncreased = true;
            this.isAngry = true;
        }
        this.moveLeft();
    }

    /**
     * Plays the animation using the provided array of image paths.
     * @param {string[]} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 25;
    }

    /**
     * Applies damage to the object when it hits the endboss and handles the protection period.
     */
    endbossHit() {
        const now = new Date().getTime();
        if (now < this.protectedUntil) {
            return;
        }
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        }
        this.protectedUntil = now;
        this.lastHit = now;
    }
}