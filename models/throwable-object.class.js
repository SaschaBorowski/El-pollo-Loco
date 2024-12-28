class ThrowableObject extends MovableObject {
    BOTTLE_IMAGES = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    SPLASH_IMAGES = [
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    offset = {
        top: 10,
        left: 25,
        right: 25,
        bottom: 5,
    }

    /**
     * Creates an instance of a throwable object.
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     */
    constructor(x, y) {
        super().loadImage('../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.BOTTLE_IMAGES);
        this.loadImages(this.SPLASH_IMAGES);
        this.x = x + 25;
        this.y = y + 50;
        this.height = 60;
        this.width = 70;
        this.speedY = 40;
        this.acceleration = 4;
        this.gravityInterval = null;
        this.throwInterval = null;
        this.animationInterval = null;
        this.isSPLASH = false;
        this.keyboard = keyboard;
        this.throw();
    }

    /**
     * Applies gravity to the throwable object. The object falls and eventually triggers the splash effect when reaching the ground.
     */
    applyGravity() {
        if (this.gravityInterval) clearInterval(this.gravityInterval);
        this.gravityInterval = setInterval(() => {
            if (this.isSPLASH) {
                this.y += 2;
                if (this.y > 600) {
                    clearInterval(this.gravityInterval);
                }
            } else {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.y >= 375) {
                    this.y = 375;
                    this.splash();
                    bottleSplash.pause();
                    bottleSplash.currentTime = 0.6;
                    bottleSplash.play();
                }
            }
        }, 1000 / 25);
    }

    /**
     * Starts the throw action of the throwable object, including applying gravity and rotating the bottle animation.
     */
    throw() {
        this.applyGravity();
        if (this.throwInterval) clearInterval(this.throwInterval);
        this.throwInterval = setInterval(() => {
            this.x += 15;
        }, 1000 / 30);

        if (this.animationInterval) clearInterval(this.animationInterval);
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.BOTTLE_IMAGES);
        }, 1000 / 15);
    }

    /**
     * Triggers the splash effect when the bottle hits the ground. Stops the throw and rotation animations, and starts the splash animation.
     */
    splash() {
        clearInterval(this.throwInterval);
        clearInterval(this.animationInterval);
        clearInterval(this.gravityInterval);
        this.speedY = 0;
        this.playAnimation(this.SPLASH_IMAGES);
        this.y = 375;
        this.isSPLASH = true;
        this.applyGravity();
    }
}