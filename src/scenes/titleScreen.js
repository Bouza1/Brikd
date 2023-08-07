import Phaser from 'phaser'

export default class TitleScreen extends Phaser.Scene{
    preload()
    {

    }
    create()
    {
        const title = this.add.text(315, 200, 'Brick Breaker!', {
            fontSize:50
        })
        title.setOrigin(0.5, 0.5)
        const playInstructions = this.add.text(315, 250, "Press Space To Play", {
            fontSize:32
        })
        playInstructions.setOrigin(0.5, 0.5)

        this.input.keyboard.once("keydown-SPACE", () => {
            console.log("Starting Game")
            this.scene.start("game")
        })
    }

}