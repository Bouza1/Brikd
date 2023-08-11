import Phaser from 'phaser'

export default class CountDownScreen extends Phaser.Scene{
    init(data)
    {
        this.level = data.level || 0
        this.lives = data.lifes || 10
        // this.levelString = "Level " + Number(this.level+2)
        this.score = data.score || 0
        this.countdownValue = 4
    }
    preload()
    {
        this.load.audio('win', './assets/win_loud.mp3');
        this.load.audio('beep', './assets/beep.mp3');
        this.load.image('bottomBar', './assets/bottombar.png')
        this.load.image("3", "./assets/3.png")
        this.load.image("2", "./assets/2.png")
        this.load.image("1", "./assets/1.png")
        this.load.image("go", "./assets/go.png")
    }

    create()
    {
        this.beepSound = this.sound.add('beep')

        this.bottombar = this.add.image(337.5, 490, 'bottomBar').setScale(0.5)
        this.bottombar.setOrigin(0.5)
    
        this.scoreLabel = this.add.text(580, 515, this.score,{
            fontSize:50
        })
        this.scoreLabel.setOrigin(0.5)

        this.levelLabel = this.add.text(95, 515, Number(this.level)+2, {
            fontSize:50
        })
        this.levelLabel.setOrigin(0.5)

        this.countdown()
    }

    upload()
    {

    }

    countdown()
    {
        this.number3 = this.add.image(337.5, 220, '3').setScale(0.5)
        this.number3.setOrigin(0.5)
        this.countdownValue -= 1
        this.beepSound.play()
        setTimeout(() =>
        {
            this.countdownValue -= 1
            this.number3.destroy()
            this.number2 = this.add.image(337.5, 220, '2').setScale(0.5)
            this.number2.setOrigin(0.5)
            this.beepSound.play()
        }, 1000)
        setTimeout(() =>
        {
            this.countdownValue -= 1
            this.number2.destroy()
            this.number1 = this.add.image(337.5, 220, '1').setScale(0.5)
            this.number1.setOrigin(0.5)
            this.beepSound.play()
        }, 2000)
        setTimeout(() =>
        {
            this.countdownValue = "Go!"
            this.number1.destroy()
            this.goText = this.add.image(337.5, 220, 'go').setScale(0.5)
            this.goText.setOrigin(0.5)
            this.beepSound.play()
        }, 3000)
        setTimeout(() =>{
            this.scene.start("game", {level:this.level+1, lifes:this.lives, score:this.score})
        }, 4000)

    }
}