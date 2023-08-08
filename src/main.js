import Phaser from 'phaser'
import TitleScreen from './scenes/titleScreen'
import Game from './scenes/game'
import GameBackground from './scenes/gameBackground'
import WinScreen from './scenes/winScreen'
import LossScreen from './scenes/lossScreen'

const config = 
{
    width: 675,
    height:440,
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

game.scene.start('titleScreen')