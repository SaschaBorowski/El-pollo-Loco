let level1;
let chickens = [];

/**
 * Represents the level 1 of the game, initializing the level with various elements including
 * chickens, an end boss, clouds, background objects, and collectible items.
 */
function initLevel1() {
level1 = new Level(
    [
        new Chicken(chickens),
        new Chicken(chickens),
        new Chicken(chickens),
        new Chicken(chickens),
        new Chicken(chickens),
        new Chicken(chickens),
        new Chicken(chickens),
    ],
    [
        new Endboss()
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],
    [
        new BackgroundObject('../img/5_background/layers/air.png', -719, 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', -719, 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', -719, 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', -719, 0),
        new BackgroundObject('../img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0, 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0, 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0, 0),
        new BackgroundObject('../img/5_background/layers/air.png', 719, 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719, 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719, 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719, 0),
        new BackgroundObject('../img/5_background/layers/air.png', 719 * 2, 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 719 * 2, 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 719 * 2, 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 719 * 2, 0),
        new BackgroundObject('../img/5_background/layers/air.png', 719 * 3, 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719 * 3, 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719 * 3, 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719 * 3, 0),
        new BackgroundObject('../img/5_background/layers/air.png', 719 * 4, 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 719 * 4, 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 719 * 4, 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 719 * 4, 0),
        new BackgroundObject('../img/5_background/layers/air.png', 719 * 5, 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719 * 5, 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719 * 5, 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719 * 5, 0),
    ],
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ],
);
};
