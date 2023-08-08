import Phaser from 'phaser'

export default class LossScreen extends Phaser.Scene{
    preload()
    {
    
    }
    create()
    {
        const congratsText = this.add.text(315, 220, 'Better Luck Next Time!', {
            fontSize:36
        });
        congratsText.setOrigin(0.5,0.5)
    }

}