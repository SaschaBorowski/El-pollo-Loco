let canvas;
let world;
let allSounds = [];
let chickenHurt = new Audio('./audio/jump_on_enemy.mp3');
let walking_sound = new Audio('./audio/walking.mp3');
let jumping_sound = new Audio('./audio/character_jump.mp3');
let bottle_sound = new Audio('./audio/collectBottle.mp3');
let throwBottle = new Audio('./audio/throwBottle.mp3');
let bottleSplash = new Audio('./audio/bottleSplash.mp3');
let collectCoin = new Audio('./audio/collectCoin.mp3');
let bossHit = new Audio('./audio/bossHit.mp3');
let angryEndboss = new Audio('./audio/angryEndboss.mp3');
let gameMusic = new Audio('./audio/gameMusic.mp3');
let hurtSound = new Audio('./audio/hurtSound.mp3')
let youWinSound = new Audio('./audio/youWin.mp3');
let youLostSound = new Audio('./audio/youLost.mp3');

allSounds.push(chickenHurt, walking_sound, jumping_sound, bottle_sound, throwBottle, bottleSplash, collectCoin, bossHit, angryEndboss, hurtSound);

gameMusic.loop = true;
angryEndboss.volume = 0.3;
gameMusic.volume = 0.3;
soundOn = true;

let keyboard = new Keyboard();
let keyPressed = false;

/**
 * Initializes the game environment and starts the game.
 */
function init() {
    canvas = document.getElementById('canvas');
    initLevel1();
    world = new World(canvas, keyboard);
    activateMobileButtons();
}

/**
 * Toggles the music on or off and updates the speaker icon accordingly.
 */
function toggleMusic() {
    let img = document.getElementById('speaker');
    let soundOffIcon = "img/icons/sound_mute.svg";
    let soundOnIcon = "img/icons/sound_on.svg";
    soundOn = !soundOn;
    img.src = soundOn ? soundOnIcon : soundOffIcon;
    allSounds.forEach(sound => {
        sound.currentTime = 0;
        sound.volume = soundOn ? 1 : 0;
    });
    gameMusic.volume = soundOn ? 0.3 : 0;
    gameMusic[soundOn ? 'play' : 'pause']();
    angryEndboss.volume = soundOn ? 0.3 : 0;
    youLostSound.volume = soundOn ? 1 : 0;
    youWinSound.volume = soundOn ? 1 : 0;
}

/**
 * Starts the game by showing the game elements and initializing the game world.
 */
function startGame() {
    document.getElementById('speaker').classList.remove('d-none');
    document.getElementById('canvasContainer').classList.remove('d-none');
    document.getElementById('startscreen').classList.add('d-none');
    document.querySelector('.directions').classList.add('d-none');
    if (soundOn) {
        gameMusic.play();
        allSounds.forEach(sound => sound.volume = 1);
        gameMusic.volume = 0.3;
        angryEndboss.volume = 0.3;
    }
    init();
}

/**
 * Handles the logic for winning the game, including playing the win sound and updating the UI.
 */
function youWin() {
    let winScreen = document.getElementById('youWin');
    youWinSound.play();
    setTimeout(() => {
        stopGame();
        canvas.classList.add('grey');
        allSounds.forEach(sound => {
            sound.pause();
            sound.volume = 0;
        });
        winScreen.classList.remove('d-none');
        gameMusic.pause();
    }, 1500);
}

/**
 * Handles the logic for losing the game, including playing the loss sound and updating the UI.
 */
function youLost() {
    let gameOver = document.getElementById('youLost');
    canvas.classList.add('grey');
    gameOver.classList.remove('d-none');
    stopGame();
    gameMusic.pause();
    youLostSound.play();
}

/**
 * Restarts the game by hiding the win/loss screens, resetting the canvas state, and starting a new game.
 */
function restart() {
    document.getElementById('youLost').classList.add('d-none');
    document.getElementById('youWin').classList.add('d-none');
    canvas.classList.remove('grey');
    let img = document.getElementById('speaker');
    img.src = soundOn ? "./img/icons/sound_on.svg" : "./img/icons/sound_mute.svg";
    allSounds.forEach(sound => sound.pause());
    if (soundOn) {
        gameMusic.currentTime = 0;
        gameMusic.play();
    }
    stopGame();
    startGame();
}

/**
 * Stops the game by clearing all intervals.
 */
function stopGame() {
    clearAllIntervals();
}

/**
 * Clears all intervals by iterating through possible interval IDs.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Handles keyboard events for movement and actions.
 * @param {KeyboardEvent} event - The keyboard event.
 */
document.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 37: case 65: keyboard.LEFT = true; break;     // Move Left
        case 39: case 68: keyboard.RIGHT = true; break;    // Move Right
        case 38: case 32: case 87: keyboard.UP = true; break;  // Jump
        case 40: case 83: keyboard.DOWN = true; break;     // Move Down
        case 17: case 70:
            if (!keyPressed) {
                keyboard.F = true;
                keyPressed = true;  // Prevent re-throwing until key is released
            }
            break;
    }
});

/**
 * Handles keyboard key releases for movement and actions.
 * @param {KeyboardEvent} event - The keyboard event.
 */
document.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 37: case 65: keyboard.LEFT = false; break;    // Move Left
        case 39: case 68: keyboard.RIGHT = false; break;   // Move Right
        case 38: case 32: case 87: keyboard.UP = false; break;  // Jump
        case 40: case 83: keyboard.DOWN = false; break;    // Move Down
        case 17: case 70:
            keyPressed = false;   // Allow throwing again after key is released
            keyboard.F = false;
            break;
    }
});

/**
 * Activates mobile control buttons for user interaction.
 */
function activateMobileButtons() {
    const buttons = [
        { id: 'btnLeft', key: 'LEFT' },
        { id: 'btnRight', key: 'RIGHT' },
        { id: 'btnUp', key: 'UP' },
        { id: 'btnThrow', key: 'F' }
    ];
    const setKeyboardState = (key, state) => keyboard[key] = state;
    buttons.forEach(({ id, key }) => {
        const element = document.getElementById(id);
        const handleTouch = (event, state) => {
            if (event.cancelable) event.preventDefault();
            setKeyboardState(key, state);
        };
        element.addEventListener('mousedown', () => setKeyboardState(key, true));
        element.addEventListener('mouseup', () => setKeyboardState(key, false));
        element.addEventListener('mouseleave', () => setKeyboardState(key, false));
        element.addEventListener('touchstart', (event) => handleTouch(event, true));
        element.addEventListener('touchend', (event) => handleTouch(event, false));
    });
}

/**
 * Toggles fullscreen mode on or off.
 */
function toggleFullscreen() {
    let canvasFullscreen = document.getElementById('applyFullscreen');
    let canvasContainer = document.getElementById('canvasContainer');
    let startscreen = document.getElementById('startscreen');
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        exitFullscreen();
        canvasFullscreen.classList.remove('fullscreen');
        canvasContainer.style.scale = '1';
        startscreen.style.scale = '1';
        
    } else {
        enterFullscreen(canvasFullscreen);
        canvasFullscreen.classList.add('fullscreen');
        canvasContainer.style.scale = '1.3';
        startscreen.style.scale = '1.3';
    }
}

/**
 * Enters fullscreen mode for a specified element.
 * @param {Element} element - The element to be made fullscreen.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {        // for IE11 (remove June 15, 2022)
        document.msExitFullscreen();
    } else if (document.webkitExitFullscreen) {    // iOS Safari
        document.webkitExitFullscreen();
    }
}