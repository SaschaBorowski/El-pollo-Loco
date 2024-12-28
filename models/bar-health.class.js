class StatusBar extends DrawableObject {
    IMAGES = [
        '../img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ];
    
    percentage = 100;

    /**
     * Creates an instance of `StatusBar` and initializes its properties.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 0;
        this.y = -15;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Updates the status bar's percentage and the displayed image based on the current percentage.
     * @param {number} percentage - The new percentage value to set for the health status bar.
     */
    setPercentage(percentage) {
        this.percentage = percentage
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image that corresponds to the current percentage of the health.
     * @returns {number} The index of the image in the `IMAGES` array based on the current percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}