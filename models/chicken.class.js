class Chicken extends MovableObject {
    y = 340;
    height = 75;
    width = 50;
    isDead = false;
    offset = {
        left: 4,
        top: 4,
        right: 4,
        bottom: 4,
    };

    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Creates an instance of `Chicken`, initializes its animations, and sets its position.
     * @param {Chicken[]} existingChickens - Array of existing chickens to avoid collisions.
     */
    constructor(existingChickens) {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.setPosition(existingChickens);
        this.speed = 0.5 + Math.random() * 1.5;
        this.animate();
    }

    /**
     * Sets the position of the chicken while avoiding collisions with existing chickens.
     * @param {Chicken[]} existingChickens - Array of existing chickens to avoid collisions.
     */
    setPosition(existingChickens) {
        let validPosition = false;
        while (!validPosition) {
            this.x = 350 + Math.random() * 3300;
            validPosition = true;
            for (let i = 0; i < existingChickens.length; i++) {
                let otherChicken = existingChickens[i];
                if (this.isColliding(otherChicken)) {
                    validPosition = false;
                    break;
                }
            }
        }
    }

    /**
     * Checks if this chicken is colliding with another chicken.
     * @param {Chicken} otherChicken - The other chicken to check for collision.
     * @returns {boolean} True if colliding, otherwise false.
     */
    isColliding(otherChicken) {
        return this.x < otherChicken.x + otherChicken.width &&
            this.x + this.width > otherChicken.x &&
            this.y < otherChicken.y + otherChicken.height &&
            this.y + this.height > otherChicken.y;
    }

    /**
     * Starts the animation for the chicken, including movement and image changes.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);
        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }
}