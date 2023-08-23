export default class EndScreen extends Phaser.Scene{

  init(data)
  {
    this.score = data.score || 0
    this.level = data.level || 1
    this.layout = data.layout
    this.scale = data.layout.endScreen
  }

  loadFont(name, url) {
    let newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
      });
  }

  preload()
  {
    this.load.audio('win', './static/assets/win_loud.mp3');
    this.loadFont('arcade', 'static/assets/ARCADE.TTF')
  }

  create()
  {
      this.winSound = this.sound.add('win', { loop: false,  volume: 0.6 });
      this.winSound.play()
      // Thank You Text
      this.thankYouText = this.add.text(this.layout['midX'], this.layout['1row']*2.8, "Thanks For", {
        fontFamily:'arcade',
        fontSize:this.scale.bigTitle,
        color:'#00aad4',
        align:'center'
      })
      this.thankYouText.setOrigin(0.5)
      this.playinText = this.add.text(this.layout['midX'], this.layout['1row']*4.2, "Playing", {
        fontFamily:'arcade',
        fontSize:this.scale.bigTitle,
        color:'#00aad4',
        align:'center'
      })
      this.playinText.setOrigin(0.5)
    

      // Close Button
      this.closeBtn = this.add.text(this.layout['1col']*9.7,  this.layout['1row'] * 0.8, '*', {
        fontFamily:'arcade',
        fontSize:this.scale.closeButton,
        color:'#ff6600',
        align:'right'          
      });
      this.closeBtn.setOrigin(0.5)
      this.closeBtn.setInteractive();
      this.closeBtn.on('pointerdown', () => {
          this.closeBtn.setColor('#b3b3b3');
      });
      this.closeBtn.on('pointerup', () => {
          this.closeBtn.setColor('#ff6600');
          this.scene.start("titleScreen")
      });
      this.closeBtn.on('pointerout', () => {
          this.closeBtn.setColor('#ff6600');
      });

    // Score & Level
    this.scoresMessage = 
    [
      `SCORE: ${this.score}`, `LEVEL: ${this.level}`
    ]
    this.scoresText = this.add.text(this.layout['midX'], this.layout['1row']*7, this.scoresMessage, {
      fontFamily:'arcade',
      fontSize:this.scale.medTitle,
      color:'#ff6600',
      align:'center'                          
    })
    this.scoresText.setOrigin(0.5)
    // Designed By Text
    this.designedByText = this.add.text(this.layout['midX'], this.layout['1row']*9, "Designed & Developed By B.", {
      fontSize:18,
      color:'#d8d8d8'
    })
    this.designedByText.setOrigin(0.5)

  }
}