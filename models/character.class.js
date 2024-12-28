class Character extends MovableObject {
    height = 200;
    y = 215;
    speed = 7;
    shortIdleStatus = false;
    longIdleStatus = false;
    shortIdleTime = 2000;
    longIdleTime = 5000;
    world;
    offset = {
        left: 20,
        top: 100,
        right: 30,
        bottom: 10,
    };
    
    currentAnimationState = null;
    newState = null;

    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png',
        '../img/2_character_pepe/2_walk/W-21.png',
    ];

    IMAGES_SHORT_IDLE = [
        '../img/2_character_pepe/1_idle/idle/I-1.png',
        '../img/2_character_pepe/1_idle/idle/I-2.png',
        '../img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/2_character_pepe/1_idle/idle/I-4.png',
        '../img/2_character_pepe/1_idle/idle/I-5.png',
        '../img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/2_character_pepe/1_idle/idle/I-7.png',
        '../img/2_character_pepe/1_idle/idle/I-8.png',
        '../img/2_character_pepe/1_idle/idle/I-9.png',
        '../img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        '../img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    /**
     * Creates an instance of `Character`, initializes its animations, and starts the necessary processes.
     */
    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SHORT_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.currentAnimationInterval = null;
        this.lastActivityTime = new Date().getTime();
        this.checkAfkStatus();
        this.animate();
        this.applyGravity();
    }

    /**
     * Updates the jumping animation if the character is above ground.
     */
    updateJumpAnimation() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            this.currentImage = 0;
        }
    }

    /**
     * Triggers the jump animation if the character is above ground.
     */
    triggerJumpAnimation() {
        if (this.isAboveGround()) {
            this.currentImage = 0;
            this.playAnimation(this.IMAGES_JUMPING);
            const now = new Date().getTime();
            this.protectedUntil = now + 500;
        }
    }

    /**
     * Makes the character jump if it is not above ground.
     */
    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 25;
            this.currentImage = 0;
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }

    /**
     * Clears the current animation interval, stopping the animation.
     */
    clearCurrentAnimation() {
        if (this.currentAnimationInterval) {
            clearInterval(this.currentAnimationInterval);
            this.currentAnimationInterval = null;
        }
    }

    /**
     * Plays the dead animation and triggers game over actions.
     */
    playDeadAnimation() {
        this.clearCurrentAnimation();
        this.currentAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 100);
        youLost();
        stopGame();
    }

    /**
     * Plays the hurt animation.
     */
    playHurtAnimation() {
        this.clearCurrentAnimation();
        this.currentAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
        }, 100);
    }

    /**
     * Plays the jump animation.
     */
    playJumpAnimation() {
        this.clearCurrentAnimation();
        this.onActivity();
        this.currentAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_JUMPING);
        }, 105);
    }

    /**
     * Plays the walking animation.
     */
    playMovementAnimation() {
        this.clearCurrentAnimation();
        this.onActivity();
        this.currentAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }

    /**
     * Resets the idle status when the character throws an object.
     */
    resetIdleStatusOnThrow() {
        this.onActivity();
    }

    /**
     * Plays the short idle animation.
     */
    playShortIdleAnimation() {
        this.clearCurrentAnimation();
        this.currentAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SHORT_IDLE);
        }, 100);
    }

    /**
     * Plays the long idle animation.
     */
    playLongIdleAnimation() {
        this.clearCurrentAnimation();
        this.currentAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        }, 100);
    }

    /**
     * Updates the last activity time and resets idle statuses.
     */
    onActivity() {
        this.lastActivityTime = new Date().getTime();
        this.shortIdleStatus = false;
        this.longIdleStatus = false;
    }

    /**
     * Checks the idle status of the character and updates accordingly.
     */
    checkAfkStatus() {
        setInterval(() => {
            let timeNow = new Date().getTime();
            let idleDuration = timeNow - this.lastActivityTime;
            if (idleDuration >= this.longIdleTime) {
                this.longIdleStatus = true;
                this.shortIdleStatus = false;
            } else if (idleDuration >= this.shortIdleTime) {
                this.shortIdleStatus = true;
                this.longIdleStatus = false;
            } else {
                this.longIdleStatus = false;
                this.shortIdleStatus = false;
            }
        }, 100);
    }

    /**
 * Starts the animation loop for the object. This function repeatedly updates the
 * object's state, switches its current state, and checks for movement in various directions.
 * It also adjusts the camera's position based on the object's x-coordinate.
 * The loop runs at 60 frames per second (1000ms / 60).
 */
    animate() {
        setInterval(() => {
            this.setState()
            this.switchState();
            this.checkMovementRight();
            this.checkMovementLeft();
            this.checkMovementJump();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
 * Checks if the left movement key is pressed and if the character can move left.
 * If so, moves the character to the left and toggles the `otherDirection` flag.
 * Pauses or plays the walking sound based on whether the character is above ground.
 */
    checkMovementLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            if (this.isAboveGround()) {
                walking_sound.pause()
            } else {
                walking_sound.play();
            }
        }
    }

    /**
 * Checks if the right movement key is pressed and if the character can move right.
 * If so, moves the character to the right and toggles the `otherDirection` flag.
 * Pauses or plays the walking sound based on whether the character is above ground.
 */
    checkMovementRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            if (this.isAboveGround()) {
                walking_sound.pause()
            }
            else {
                walking_sound.play();
            }
        }
    }

    /**
 * Checks if the jump key is pressed (either UP or SPACE) and if the character is on the ground.
 * If so, initiates the jump and plays the jump sound.
 */
    checkMovementJump() {
        if ((this.world.keyboard.UP && !this.isAboveGround()) || (this.world.keyboard.SPACE && !this.isAboveGround())) {
            this.jump();
            jumping_sound.currentTime = 0;
            jumping_sound.play();
        }
    }

    /**
 * Updates the current state of the character based on its conditions, such as being dead, hurt, jumping,
 * walking, or idle. Sets the appropriate state for further animations.
 */
    setState() {
        if (this.isDead()) {
            this.newState = 'dead';
        } else if (this.isHurt()) {
            this.newState = 'hurt';
        } else if (this.isAboveGround()) {
            this.newState = 'jump';
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.newState = 'walk';
        } else if (this.world.keyboard.F) {
            this.newState = 'throw';
        } else if (this.shortIdleStatus) {
            this.newState = 'short_idle';
        } else if (this.longIdleStatus) {
            this.newState = 'long_idle';
        }
        else {
            this.newState = 'idle';
        }
    }

    /**
 * Switches the current animation state of the character if it has changed.
 * Clears the current animation and calls the appropriate method to handle the new state.
 */
    switchState() {
        if (this.newState !== this.currentAnimationState) {
            this.currentAnimationState = this.newState;
            this.clearCurrentAnimation();
            this.caseDead();
            this.caseHurt();
            this.caseJump();
            this.caseWalk();
            this.caseShortIdle();
            this.caseLongIdle();
            this.caseThrow();
            this.caseIdle();
        }
    }

    /**
 * Handles the case when the character is dead and plays the dead animation.
 */
    caseDead() {
        switch (this.newState) {
            case 'dead':
                this.playDeadAnimation();
                break;
        }
    }

    /**
 * Handles the case when the character is hurt and plays the hurt animation.
 */
    caseHurt() {
        switch (this.newState) {
            case 'hurt':
                this.playHurtAnimation();
                break;
        }
    }

    /**
 * Handles the case when the character is jumping and plays the jump animation.
 */
    caseJump() {
        switch (this.newState) {
            case 'jump':
                this.playJumpAnimation();
                break;
        }
    }

    /**
 * Handles the case when the character is walking and plays the walking animation.
 */
    caseWalk() {
        switch (this.newState) {
            case 'walk':
                this.playMovementAnimation();
                break;
        }
    }

    /**
 * Handles the case when the character is in a short idle state and plays the corresponding animation.
 */
    caseShortIdle() {
        switch (this.newState) {
            case 'short_idle':
                this.playShortIdleAnimation();
                break;
        }
    }

    /**
 * Handles the case when the character is in a long idle state and plays the corresponding animation.
 */
    caseLongIdle() {
        switch (this.newState) {
            case 'long_idle':
                this.playLongIdleAnimation();
                break;
        }
    }

    /**
 * Handles the case when the character is throwing an object. Resets idle status on throw.
 */
    caseThrow() {
        switch (this.newState) {
            case 'throw':
                this.resetIdleStatusOnThrow();
                break;
        }
    }

    /**
 * Handles the case when the character is idle and loads the default idle image.
 */
    caseIdle() {
        switch (this.newState) {
            case 'idle':
            default:
                this.loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
                break;
        }
    }
}