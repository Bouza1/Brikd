import Phaser from 'phaser'
import TitleScreen from './scenes/titleScreen'
import Game from './scenes/game'
import GameBackground from './scenes/gameBackground'
import WinScreen from './scenes/winScreen'
import LossScreen from './scenes/lossScreen'
import CountDownScreen from './scenes/countdownScreen'

const config = 
{
    width: 675,
    height:540,
    parent: 'game-container',
    type: Phaser.AUTO,
    backgroundColor:'#000000',
    physics:{
        default:'arcade',
        arcade:
        {
            gravity:{y:0}
        }
    }
}

const game = new Phaser.Game(config)

game.scene.add('titleScreen', TitleScreen)
game.scene.add('game-background', GameBackground)
game.scene.add('game', Game)
game.scene.add('winScreen', WinScreen)
game.scene.add('lossScreen', LossScreen)
game.scene.add('countdownScreen', CountDownScreen)

// game.scene.start('countdownScreen', {level:-1, lifes:10})
game.scene.start('titleScreen')