import Phaser from 'phaser'

export default class TitleScreen extends Phaser.Scene{
    preload()
    {

        this.load.image('titleBanner', './assets/titleBanner.png');
        this.load.image('buttonUp', './assets/playButton.png')
        this.load.image('buttonDown', './assets/playButtonDown.png')
        this.load.image('controlBtnUp', './assets/controlsBtnUp.png')
        this.load.image('controlBtnDown', './assets/controlsBtnDown.png')
        this.load.image('trophyBtnUp', './assets/trophyBtnUp.png')
        this.load.image('trophyBtnDown', './assets/trophyBtnDown.png')
    }
    create()
    {
        //Title Banner
        this.titleBanner = this.add.image(337.5, 190, 'titleBanner');
        this.titleBanner.setOrigin(0.5)

        //Play Button
        this.playButton = this.add.image(337.5, 340, 'buttonUp');
        this.playButton.setOrigin(0.5)
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

        //Controls Button
        this.controlBtn = this.add.image(635, 40, 'controlBtnUp').setScale(0.5);
        this.controlBtn.setOrigin(0.5)
        this.controlBtn.setInteractive();
        this.controlBtn.on('pointerdown', () => {
            this.controlBtn.setTexture('controlBtnDown');
        });
        this.controlBtn.on('pointerup', () => {
            this.controlBtn.setTexture('controlBtnUp');
            this.scene.start("controlsScreen")
        });
        this.controlBtn.on('pointerout', () => {
            this.controlBtn.setTexture('controlBtnUp');
        });

        // Leaderboard Button
        this.leaderboardBtn = this.add.image(40, 40, 'trophyBtnUp').setScale(0.5);
        this.leaderboardBtn.setOrigin(0.5)
        this.leaderboardBtn.setInteractive();
        this.leaderboardBtn.on('pointerdown', () => {
            this.leaderboardBtn.setTexture('trophyBtnDown');
        });
        this.leaderboardBtn.on('pointerup', () => {
            this.leaderboardBtn.setTexture('trophyBtnUp');
            console.log("Working")
        });
        this.leaderboardBtn.on('pointerout', () => {
            this.leaderboardBtn.setTexture('trophyBtnUp');
        });


    }

}