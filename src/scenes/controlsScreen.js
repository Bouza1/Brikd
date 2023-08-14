import Phaser from 'phaser'

export default class ControlsScreen extends Phaser.Scene{
    preload()
    {

        this.load.image('controlsBG', './assets/controlsScreen.png');
        this.load.image('closeBtnUp', './assets/closeBtnUp.png')
        this.load.image('closeBtnDown', './assets/closeBtnDown.png')
    }

    create()
    {
        //Title Banner
        this.bg = this.add.image(337.5, 270, 'controlsBG').setScale(0.5);
        this.bg.setOrigin(0.5)

        //Play Button
        this.closeBtn = this.add.image(635, 40, 'closeBtnUp').setScale(0.5);
        this.closeBtn.setOrigin(0.5)
        this.closeBtn.setInteractive();
        this.closeBtn.on('pointerdown', () => {
            this.closeBtn.setTexture('closeBtnDown');
        });
        this.closeBtn.on('pointerup', () => {
            this.closeBtn.setTexture('closeBtnUp');
            this.scene.start("titleScreen")
        });
        this.closeBtn.on('pointerout', () => {
            this.closeBtn.setTexture('closeBtnUp');
        });

    }

}