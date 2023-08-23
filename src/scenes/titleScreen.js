export default class TitleScreen extends Phaser.Scene
{
  init(data)
  {
    this.mobile = data.mobile;
    this.layout = data.layout;
    this.scale = data.layout.titleScreen;
  }
  preload()
  {
    this.load.image('titleBanner', './static/assets/titleBanner.png');
    this.load.image('trophyBtnUp', './static/assets/trophyBtnUp.png');
    this.load.image('trophyBtnDown', './static/assets/trophyBtnDown.png');
    // this.loadFont('arcade', 'static/assets/ARCADE.TTF');
  }
  
  create()
  {
    // ---------------- Title Banner ----------------
    this.titleBanner = this.add.image(this.layout['midX'], this.layout['1row'] * 4, 'titleBanner').setScale(this.scale['titleBanner']);
    this.titleBanner.setOrigin(0.5);
    // ---------------- Play Button ----------------
    this.playButton = this.add.text(this.layout['midX'], this.layout['1row'] * 7, 'PLAY', {
      fontFamily:'arcade',
      fontSize:this.scale['playButton'],
      color:'#ff6600'
    });
    this.playButton.setOrigin(0.5);
    this.playButton.setInteractive();
    this.playButton.on('pointerdown', () => {
        this.playButton.setColor('#b3b3b3');
    });
    this.playButton.on('pointerup', () => {
        this.playButton.setColor('#ff6600');
        this.scene.start('countdownScreen', {level:-1, lifes:10, score:0, mobile:this.mobile, layout:this.layout})
    });
    this.playButton.on('pointerout', () => {
        this.playButton.setColor('#ff6600');
    });
    // ---------------- Controls Button ----------------
    this.controlBtn = this.add.text(this.layout['1col']*9.5,  this.layout['1row'] * 1, '?', {
      fontFamily:'arcade',
      fontSize:this.scale['controlButton'],
      color:'#00aad4',
      align:'right'      
    });
    this.controlBtn.setOrigin(0.5);
    this.controlBtn.setInteractive();
    this.controlBtn.on('pointerdown', () => {
        this.controlBtn.setColor('#b3b3b3');
    });
    this.controlBtn.on('pointerup', () => {
        this.controlBtn.setColor('#00aad4');
        this.scene.start("controlsScreen", {mobile:this.mobile, layout:this.layout})
    });
    this.controlBtn.on('pointerout', () => {
        this.controlBtn.setColor('#00aad4');
    });
    // ---------------- Leaderboard Button - Does Nothing Yet ----------------
    this.leaderboardBtn = this.add.text(this.layout['1col']*0.7,  this.layout['1row'] * 1, '*', {
      fontFamily:'arcade',
      fontSize:this.scale['leaderButton'],
      color:'#00aad4',
      align:'right'      
    });
    this.leaderboardBtn.setOrigin(0.5)
    this.leaderboardBtn.setInteractive();
    this.leaderboardBtn.on('pointerdown', () => {
        this.leaderboardBtn.setColor('#b3b3b3');
    });
    this.leaderboardBtn.on('pointerup', () => {
        this.leaderboardBtn.setColor('#00aad4');
        console.log("Load Leaderboard")
    });
    this.leaderboardBtn.on('pointerout', () => {
        this.leaderboardBtn.setColor('#00aad4');
    });
    // ---------------- Designed Logo ----------------
    this.designedByText = this.add.text(this.layout['midX'], this.layout['1row']*9, "Designed & Developed By B.", {
      fontSize:18,
      color:'#d8d8d8'
    });
    this.designedByText.setOrigin(0.5);
  }
  
    // loadFont(name, url) {
    // let newFont = new FontFace(name, `url(${url})`);
    // newFont.load().then(function (loaded) {
    //     document.fonts.add(loaded);
    // }).catch(function (error) {
    //     return error;
    //   });
    // }
  
}
