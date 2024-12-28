class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;

    /**
     * Loads an image from the specified path and assigns it to the object's `img` property.
     * @param {string} path - The path to the image to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the canvas using the provided 2D rendering context.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('Could not load image', this.img.src);
        }
    }

    /**
     * Draws a blue rectangle around the object for debugging purposes.
     * The rectangle outlines the object's bounding box.
     * Only drawn for instances of Character, Chicken, Endboss, or Bottle.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    drawESP(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottle || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '0';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x, this.y, this.width, this.height
            );
            ctx.stroke();
        }
    }

    /**
     * Draws a red rectangle around the object's collision box for debugging purposes.
     * The rectangle outlines the object's collision detection area based on its offset values.
     * Drawn for instances of Character, Chicken, Endboss, Bottle, or ThrowableObject.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    drawESP2(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottle || this instanceof ThrowableObject || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '0';
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }

    /**
     * Loads multiple images into the image cache.
     * Each path in the array corresponds to an image that will be preloaded.
     * @param {string[]} arr - An array of image source paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}