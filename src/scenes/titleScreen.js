import Phaser from 'phaser'

export default class TitleScreen extends Phaser.Scene{
    preload()
    {

        this.load.image('titleBanner', './assets/titleBanner.png');
        this.load.image('buttonUp', './assets/playButton.png')
        this.load.image('buttonDown', './assets/playButtonDown.png')
        // this.load.font('arcadeFont', './assets/fonts/ARCADE.ttf');
    }
    create()
    {
        this.titleBanner = this.add.image(337.5, 210, 'titleBanner');
        this.titleBanner.setOrigin(0.5)
        // this.playButton = this.add.image(337.5, 380, 'playButton')
        // this.playButton.setOrigin(0.5)

        this.playButton = this.add.image(337.5, 380, 'buttonUp');
        
        this.playButton.setInteractive();
    
        this.playButton.on('pointerdown', () => {
            this.playButton.setTexture('buttonDown');
        });
    
        this.playButton.on('pointerup', () => {
            this.playButton.setTexture('buttonUp');
            this.scene.start('countdownScreen', {level:-1, lifes:10, score:0})
        });
    
        this.playButton.on('pointerout', () => {
            this.playButton.setTexture('buttonUp');
        });

        // this.input.keyboard.once("keydown-SPACE", () => {
        //     console.log("Starting Game")
        //     
        // })
    }

}