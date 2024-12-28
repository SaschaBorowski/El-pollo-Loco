class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    /**
     * Creates an instance of `Cloud`, initializes its image, and sets its initial position.
     */
    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 4200;
        this.animate();
    }

    /**
     * Starts the animation for the cloud, making it move left continuously.
     * This method sets up an interval that moves the cloud to the left at a regular interval.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}