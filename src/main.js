import TitleScreen from './scenes/titleScreen.js'
import CountDownScreen from './scenes/countdownScreen.js'
import GameScreen from './scenes/gameScreen.js'
import ControlsScreen from './scenes/controlsScreen.js'
import EndScreen from './scenes/endScreen.js'
import { layoutObj } from "./layout.js";

const config = 
{
    width:layoutObj.fullX,
    height:layoutObj.fullY,
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

function loadFont(name, url) {
  var newFont = new FontFace(name, `url(${url})`);
  newFont.load().then(function (loaded) {
    document.fonts.add(loaded);
  }).catch(function (error) {
    return error;
  });
}

loadFont('arcade', 'static/assets/ARCADE.TTF')

const game = new Phaser.Game(config)

game.scene.add('titleScreen', TitleScreen)
game.scene.add('controlsScreen', ControlsScreen)
game.scene.add('countdownScreen', CountDownScreen)
game.scene.add('game', GameScreen)
game.scene.add('endScreen', EndScreen)


game.scene.start('titleScreen', {mobile:layoutObj.mobile, layout:layoutObj})
