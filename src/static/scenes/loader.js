export default class Loader extends Phaser.Scene{
  init(data)
  {
    this.mobile = data.mobile
    this.layout = data.layout
  }
  
  preload()
  {
    // Images
    this.load.image('heart', './static/assets/heart2.png');
    this.load.image('qmark', './static/assets/rainbowQ.png');
    this.load.image('bullet', './static/assets/bulletPowerup.png')
    this.load.image('paddel', './static/assets/paddel.png')
    this.load.image('bigBall', './static/assets/bigball.png')
    this.load.image('tripleBallImg', './static/assets/tripleBall.png')
    this.load.image('bigPadelImg', './static/assets/XLPADEL.png')
    this.load.image('titleBanner', './static/assets/titleBanner.png');
    this.load.image('trophyBtnUp', './static/assets/trophyBtnUp.png')
    this.load.image('trophyBtnDown', './static/assets/trophyBtnDown.png')
    this.load.image('mobileControls', './static/assets/mobileControls.png');
    this.load.image('desktopControls', './static/assets/desktopControls.png')

    // Sprites
    this.load.spritesheet('explosion', './static/assets/explosion.png', {
        frameWidth: 16,
        frameHeight: 16,
        startFrame: 0,
        endFrame: 17 - 1
    });
    this.load.spritesheet('powerupBlock', "./static/assets/rainbowBlock.png", {
        frameWidth:20,
        frameHeight:20,
        startFrame:0,
        endFrame:24
    })
    
    // Sounds
    this.load.audio('brickHit', './static/assets/hit.mp3');
    this.load.audio('brickExplode', './static/assets/bomb.mp3');
    this.load.audio('powerupSound', './static/assets/bonus.mp3');
    this.load.audio('bgMusic', './static/assets/music1.mp3')
    this.load.audio('win', './static/assets/win_loud.mp3');
    this.load.audio('countdownSound', './static/assets/countdown.wav');
    this.load.audio('win', './static/assets/win_loud.mp3');
    
    // Font
    this.loadFont('arcade', 'static/assets/ARCADE.TTF')      
  }

  loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
      document.fonts.add(loaded);
    }).catch(function (error) {
      return error;
    });
  }

  
  create()
  {
    this.scene.start('titleScreen', {mobile:this.mobile, layout:this.layout})
  }
  
}