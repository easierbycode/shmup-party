/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/yaScYWzi
 *
 * This source requires Phaser 2.6.2
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

    // game.load.baseURL = 'http://examples.phaser.io/'
    game.load.baseURL = 'https://dl.dropboxusercontent.com/u/2956535/evilinvaders/';
    game.load.crossOrigin = 'anonymous';

    // game.load.image('bullet', 'assets/games/invaders/bullet.png');
    // game.load.image('enemyBullet', 'assets/games/invaders/enemy-bullet.png');
    // game.load.spritesheet('invader', 'assets/games/invaders/invader32x32x4.png', 32, 32);
    // game.load.image('ship', 'assets/games/invaders/player.png');
    game.load.image('ship', 'eva.png');
    // game.load.spritesheet('kaboom', 'assets/games/invaders/explode.png', 128, 128);
    game.load.image('starfield', 'starfield.png');
    // game.load.image('starfield', 'background01.jpg');
    // game.load.image('starfield', 'background02.jpg');
    // game.load.image('starfield', 'background03.jpg');
    // game.load.image('starfield', 'background04.jpg');
    // game.load.image('starfield', 'background05.jpg');
    // game.load.image('background', 'assets/games/starstruck/background2.png');


}

function create() {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
    
    var sprite = game.add.sprite(0, 0, 'ship');
    sprite.scale.setTo( 0.1 );
    
    // Maintain aspect ratio
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    game.input.onDown.add( toggleFullScreen, this );

}


function toggleFullScreen() {
    if (game.scale.isFullScreen)
    {
        console.log( '-= stopFullScreen =-' );
        game.scale.stopFullScreen();
    }
    else
    {
        console.log( '-= startFullScreen =-' );
        game.scale.startFullScreen(false);
    }
}

function update() {
    
    //  Scroll the background
    starfield.tilePosition.y += 2;

}

function render() {

}
