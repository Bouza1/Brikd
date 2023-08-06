import Phaser from "phaser";

export default class GameBackground extends Phaser.Scene
{
    preload()
    {
        this.load.image('backgroundKey', './assets/background_stars.png');

    }

    create()
    {
        const backgroundImage = this.add.image(300, 220, 'backgroundKey');
        backgroundImage.setOrigin(0.5,0.5)
        console.log("Working")
        
        
    }
}