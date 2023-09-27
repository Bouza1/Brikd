import TitleScreen from './scenes/titleScreen.js'
import LeaderboardScreen from './scenes/leaderboardScreen.js'
import CountDownScreen from './scenes/countdownScreen.js'
import GameScreen from './scenes/gameScreen.js'
import ControlsScreen from './scenes/controlsScreen.js'
import EndScreen from './scenes/endScreen.js'
import Loader from './scenes/loader.js'
import { layoutObj } from "./layout.js";

const config = 
{
    width:layoutObj.fullX,
    height:layoutObj.fullY,
    parent: 'game-container',
  	dom: {
        createContainer: true
    },
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
game.scene.add('controlsScreen', ControlsScreen)
game.scene.add('countdownScreen', CountDownScreen)
game.scene.add('game', GameScreen)
game.scene.add('endScreen', EndScreen)
game.scene.add('loader', Loader)
game.scene.add('leaderboardScreen', LeaderboardScreen)

game.scene.start('loader', {mobile:layoutObj.mobile, layout:layoutObj})
