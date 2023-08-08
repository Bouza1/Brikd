import Phaser from 'phaser'

export default class TitleScreen extends Phaser.Scene{
    preload()
    {

        this.load.image('titleScreen', './assets/titleScreen3.png');
        
        // this.load.font('arcadeFont', './assets/fonts/ARCADE.ttf');
    }
    create()
    {
        const bg = this.add.image(337.5, 220, 'titleScreen');
        bg.setOrigin(0.5,0.5)
        this.input.keyboard.once("keydown-SPACE", () => {
            console.log("Starting Game")
            this.scene.start("game")
        })
    }

}