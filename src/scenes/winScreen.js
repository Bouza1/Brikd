import Phaser from 'phaser'

export default class WinScreen extends Phaser.Scene{
    preload()
    {
    
    }
    create()
    {
        const congratsText = this.add.text(315, 220, 'Congratulations You Won!', {
            fontSize:50
        });
        congratsText.setOrigin(0.5,0.5)
    }

}