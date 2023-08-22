export default class CountDownScreen extends Phaser.Scene{
    init(data)
    {
      this.level = data.level || 0
      this.lives = data.lifes || 10
      this.score = data.score || 0
      this.layout = data.layout
      this.scale = data.layout.countdownScreen
      this.mobile = data.mobile || false
      this.countdownValue = 4
    }
    preload()
    {
        this.load.audio('countdownSound', './static/assets/countdown.wav');
        this.loadFont('arcade', 'static/assets/ARCADE.TTF')
    }

    create()
    {
      // ---------------------------- Bottom Bar Section ---------------------------- 
      // Bottom Bar Collider
      this.bottombar = this.add.line(0, this.layout['1row']*8, 0, 0, this.physics.world.bounds.width*2, 0, 0x6666ff);
      this.bottombar.setOrigin(0.5)
      this.physics.add.existing(this.bottombar, true)
      // Level Title 
      this.levelTitleLabel = this.add.text(this.layout['1col']*1.5, this.layout['1row']*8.6, "Level", {
        fontSize:this.scale.bigTitle,
        fontFamily:'arcade',
        color:'#00aad4'
      })
      this.levelTitleLabel.setOrigin(0.5)
      // Actual Level
      this.levelLabel = this.add.text(this.layout['1col']*1.5, this.layout['1row']*9.4, Number(this.level)+2, {
        fontSize:this.scale.xsTitle,
        color:'#00aad4'
      })
      this.levelLabel.setOrigin(0.5)
      // Score Title
      this.scoreTitleLabel = this.add.text(this.layout['1col']*8.5, this.layout['1row']*8.6, "Score", {
        fontSize:this.scale.bigTitle,
        fontFamily:'arcade',
        color:'#00aad4'
      })
      this.scoreTitleLabel.setOrigin(0.5)
      // Actual Score
      this.scoreLabel = this.add.text(this.layout['1col']*8.5, this.layout['1row']*9.4, this.score,{
        fontSize:this.scale.xsTitle,
        color:'#00aad4'
      })
      this.scoreLabel.setOrigin(0.5)
      // Powerup Section
      // Powerup Title
      this.powerupTitle = this.add.text(this.layout['midX'], this.layout['1row']*8.6, "Powerups", {
        fontSize:this.scale.bigTitle,
        fontFamily:'arcade',
        color:'#ff6600'
      })
      this.powerupTitle.setOrigin(0.5)
      // ---------------------------- Count Down Section ---------------------------- 
      this.countdownSound = this.sound.add('countdownSound', { loop: false,  volume: 0.6 })
      this.countdown()
    }

    update()
    {

    }

    loadFont(name, url) {
    let newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
      });
    }
  
    countdown()
    {
        this.number = this.add.text(this.layout['midX'], (this.layout['1row']*8)/2, '3', {
          fontFamily:'arcade',
          fontSize:this.scale.countdownText,
          color:'#00aad4'
        })
        this.number.setOrigin(0.5)
        this.countdownValue -= 1
        this.countdownSound.play()
        setTimeout(() =>
        {
            this.countdownValue -= 1
            this.number.setText("2")
        }, 1000)
        setTimeout(() =>
        {
            this.countdownValue -= 1
            this.number.setText("1")
        }, 2000)
        setTimeout(() =>
        {
            this.countdownValue = "Go"
            this.number.setText("Go")
            this.number.setColor('#ff6600')
        }, 3000)
        setTimeout(() =>{
            this.scene.start("game", {level:this.level+1, lifes:this.lives, score:this.score, mobile:this.mobile, layout:this.layout})
        }, 4000)

    }
}