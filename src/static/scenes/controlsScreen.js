export default class ControlsScreen extends Phaser.Scene{
  init(data)
  {
    this.mobile = data.mobile || false
    this.layout = data.layout
    this.scale = data.layout.controlsScreen
  }
    preload()
    {

    }

    create()
    {
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
      // ------------------------------------ Controls Section --------------------------------------     
      // Controls Title
      this.controlsTitle = this.add.text(this.layout['midX'], this.layout['1row'] , "Controls", {
        fontFamily:'arcade',
        fontSize:this.scale.bigTitle,
        color:'#00aad4'
      })    
      this.controlsTitle.setOrigin(0.5)
      // Mobile Controls Title
      this.mobileControlsTitle = this.add.text(this.layout['1col'] * 2.5, this.layout['1row']*2, "Mobile", {
        fontFamily:'arcade',
        fontSize:this.scale.medTitle,
        color:'#ff6600'
      }) 
      this.mobileControlsTitle.setOrigin(0.5)
      // Desktop Controls Title
      this.desktopControlsTitle = this.add.text(this.layout['1col'] * 7.5, this.layout['1row']*2, "Desktop", {
        fontFamily:'arcade',
        fontSize:this.scale.medTitle,
        color:'#ff6600'
      }) 
      this.desktopControlsTitle.setOrigin(0.5)
      // Mobile Controls Image
      this.mobileControlsImage = this.add.image(this.layout['1col']*2.5, this.layout['1row']*4, 'mobileControls').setScale(this.scale.controlsImageSize)
      this.mobileControlsImage.setOrigin(0.5)
      // Desktop Controls Image
      this.desktopControlsImage = this.add.image(this.layout['1col']*7.5, this.layout['1row']*4, 'desktopControls').setScale(this.scale.controlsImageSize)
      this.desktopControlsImage.setOrigin(0.5)
      // Shoot Controls
      this.shootControls = this.add.text(this.layout['midX'], this.layout['1row']*5.8, "Tap/Click To Shoot", {
        fontFamily:'arcade',
        fontSize:this.scale.smTitle,
        color:'#ff6600'
      })
      this.shootControls.setOrigin(0.5)
      // ------------------------------------ Powerups Section --------------------------------------
      // Powerups Title
      this.powerupsTitle = this.add.text(this.layout['midX'], this.layout['1row']*7, "Powerups", {
        fontFamily:'arcade',
        fontSize:this.scale.bigTitle,
        color:'#00aad4'
      })
      this.powerupsTitle.setOrigin(0.5)
      // Big Ball
      this.bigBallPowerup = this.add.image(this.layout['1col']*2, this.layout['1row']*9, 'bigBall').setScale(this.scale.powerupImageSize)
      this.bigBallPowerup.setOrigin(0.5)
      this.bigBallTitle = this.add.text(this.layout['1col']*2, this.layout['1row']*8, "Big Ball", {
        fontFamily:'arcade',
        fontSize:this.scale.xsTitle,
        color:'#ff6600'
      }) 
      this.bigBallTitle.setOrigin(0.5)
      // Triple Ball
      this.tripleBallPowerup = this.add.image(this.layout['1col']*4, this.layout['1row']*9, 'tripleBallImg').setScale(this.scale.powerupImageSize)
      this.tripleBallPowerup.setOrigin(0.5)
      this.tripleBallTitle = this.add.text(this.layout['1col']*4, this.layout['1row']*8, "3xBall", {
        fontFamily:'arcade',
        fontSize:this.scale.xsTitle,
        color:'#ff6600'
      }) 
      this.tripleBallTitle.setOrigin(0.5)
      // Guns
      this.gunsPowerup = this.add.image(this.layout['1col']*6, this.layout['1row']*9, 'bullet').setScale(this.scale.powerupImageSize)
      this.gunsPowerup.setOrigin(0.5)
      this.gunsTitle = this.add.text(this.layout['1col']*6, this.layout['1row']*8, "Missile", {
        fontFamily:'arcade',
        fontSize:this.scale.xsTitle,
        color:'#ff6600'
      }) 
      this.gunsTitle.setOrigin(0.5)
      // XL Padel
      this.xlPadelPowerup = this.add.image(this.layout['1col']*8, this.layout['1row']*9, 'bigPadelImg').setScale(this.scale.powerupImageSize)
      this.xlPadelPowerup.setOrigin(0.5)
      this.xlPadelTitle = this.add.text(this.layout['1col']*8, this.layout['1row']*8, "XL Padel", {
        fontFamily:'arcade',
        fontSize:this.scale.xsTitle,
        color:'#ff6600'
      }) 
      this.xlPadelTitle.setOrigin(0.5)
    }
  
}