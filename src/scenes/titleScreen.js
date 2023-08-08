import Phaser from 'phaser'

export default class TitleScreen extends Phaser.Scene{
    preload()
    {

        this.load.image('titleScreen', './assets/titleScreen2.png');
        
        // this.load.font('arcadeFont', './assets/fonts/ARCADE.ttf');
    }
    create()
    {
        const bg = this.add.image(315, 220, 'titleScreen');
        bg.setOrigin(0.5,0.5)
        this.input.keyboard.once("keydown-SPACE", () => {
            console.log("Starting Game")
            this.scene.start("game")
        })
    }

}