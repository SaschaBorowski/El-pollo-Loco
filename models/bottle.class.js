class Bottle extends MovableObject {
    y = 350;
    height = 70;
    width = 70;
    x = 200;

    offset = {
        left: 25,
        top: 15,
        right: 20,
        bottom: 11,
    };

    IMAGES = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Creates an instance of `Bottle`, initializes its properties, and starts the animation.
     */
    constructor() {
        super().loadImage('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 2500;
        this.animate();
    }

    /**
     * Starts the animation for the bottle by cycling through its images.
     * The animation updates every 200 milliseconds.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
}