import Phaser from 'phaser'

export default class EndScreen extends Phaser.Scene{

    init(data)
    {
        this.score = data.score || 0
        this.level = data.level || 1
    }

    preload()
    {
        this.load.image('endScreenImg', './assets/endScreenGOD.png')
        this.load.image('closeBtnUp', './assets/closeBtnUp.png')
        this.load.image('closeBtnDown', './assets/closeBtnDown.png')
        this.load.audio('win', './assets/win_loud.mp3');
    }

    create()
    {
        this.winSound = this.sound.add('win', { loop: false,  volume: 0.6 });
        this.winSound.play()
        this.bgEnd = this.add.image(337.5, 270, 'endScreenImg').setScale(0.5)

        // Close Button
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

        // Score Text
        this.scoreText = this.add.text(365, 227, this.score, {
            font: "42px Arial", 
            align: 'center',   
            origin: { x: 0.5, y: 0.5 } 
        })

        // Level Text
        this.levelText = this.add.text(365, 297, this.level, {
            font: "42px Arial", 
            align: 'center',   
            origin: { x: 0.5, y: 0.5 } 
        })

    }

}