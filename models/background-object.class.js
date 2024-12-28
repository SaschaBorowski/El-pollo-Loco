class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates an instance of `BackgroundObject` and initializes its properties.
     * @param {string} imagePath - The path to the image file for the background object.
     * @param {number} x - The x-coordinate position of the background object.
     * @param {number} y - The y-coordinate position of the background object.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}