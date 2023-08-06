import Phaser from 'phaser'
import TitleScreen from './scenes/titleScreen'
import Game from './scenes/game'
import GameBackground from './scenes/gameBackground'

const config = 
{
    width: 630,
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


// game.scene.start('titleScreen')
game.scene.start('game')