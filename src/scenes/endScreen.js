export default class EndScreen extends Phaser.Scene{

    init(data)
    {
      this.score = data.score || 0
      this.level = data.level || 1
      this.layout = data.layout
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
        this.thankYouTextHolder =
        [
          'Thanks For', 'Playing.'
        ]
        this.thankYouText = this.add.text(this.layout['midX'], this.layout['1row']*3, this.thankYouTextHolder, {
          fontFamily:'arcade',
          fontSize:140,
          color:'#00aad4',
          align:'center'
        })
        this.thankYouText.setOrigin(0.5)

        // Close Button
        this.closeBtn = this.add.text(this.layout['1col']*9.5,  this.layout['1row'] * 0.6, 'X', {
          fontFamily:'arcade',
          fontSize:70,
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
        `Score:${this.score}`, `Level:${this.level}`
      ]

      this.scoresText = this.add.text(this.layout['midX'], this.layout['1row']*7, this.scoresMessage, {
        fontFamily:'arcade',
        fontSize:100,
        color:'#ff6600',
        align:'center'                          
      })
      this.scoresText.setOrigin(0.5)
    }
}