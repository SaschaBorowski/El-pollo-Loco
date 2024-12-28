class Coin extends MovableObject {
    y = 185;
    height = 110;
    width = 110;
    offset = {
        left: 45,
        top: 45,
        right: 45,
        bottom: 45,
    };

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates an instance of `Coin`, initializes its image, sets its position, and starts the animation.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 3000;
        this.animate();
    }

    /**
     * Starts the animation for the coin, making it alternate between images.
     * This method sets up an interval that switches the coin's image at a regular interval to create a flashing effect.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200); 
    }   
}