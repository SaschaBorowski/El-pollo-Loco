class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    collectableObjects;
    level_end_x = 3650;

    /**
     * Creates an instance of the Level class.
     * @param {Enemy[]} enemies - The array of enemy objects in the level.
     * @param {Endboss} endboss - The endboss object for the level.
     * @param {Cloud[]} clouds - The array of cloud objects in the level.
     * @param {BackgroundObject[]} backgroundObjects - The array of background objects in the level.
     * @param {CollectableObject[]} collectableObjects - The array of collectable objects in the level.
     */
    constructor(enemies, endboss, clouds, backgroundObjects, collectableObjects) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects;
    }
}