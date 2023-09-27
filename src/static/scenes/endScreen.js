export default class EndScreen extends Phaser.Scene{

    init(data)
    {
      this.score = data.score || 0
      this.level = data.level || 0
      this.layout = data.layout
      this.scale = data.layout.endScreen
    }

    preload()
    {
      this.load.scenePlugin({
      	key: 'rexuiplugin',
      	url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      	sceneKey: 'rexUI'
      })
      	
      this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true)
      this.load.html('nameform', '/static/assets/nameform.html');
    }

    create()
    {
        this.winSound = this.sound.add('win', { loop: false,  volume: 0.6 });
        this.winSound.play()
        // Thank You Text
        this.thankYouText = this.add.text(this.layout['midX'], this.layout['1row']*1.5, "Thanks For Playing", {
          fontFamily:'arcade',
          fontSize:this.scale.medTitle,
          color:'#00aad4',
          align:'center'
        })
        this.thankYouText.setOrigin(0.5)
        // Close Button
        this.closeBtn = this.add.text(this.layout['1col']*9.7,  this.layout['1row'] * 0.8, '*', {
          fontFamily:'arcade',
          fontSize:this.scale.closeButton,
          color:'#ff6600',
          align:'right'          
        });
        this.closeBtn.setOrigin(0.5)
        this.closeBtn.setInteractive();
        this.closeBtn.on('pointerdown', () => {
            this.closeBtn.setColor('#b3b3b3');
        });
        this.closeBtn.on('pointerup', () => {
            this.closeBtn.setColor('#ff6600');
            this.scene.start("titleScreen")
        });
        this.closeBtn.on('pointerout', () => {
            this.closeBtn.setColor('#ff6600');
        });
  
      // Score & Level
      this.scoresMessage = 
      [
        `SCORE: ${this.score}`, `LEVEL: ${this.level+1}`
      ]
      this.scoresText = this.add.text(this.layout['midX'], this.layout['1row']*3.3, this.scoresMessage, {
        fontFamily:'arcade',
        fontSize:this.scale.medTitle,
        color:'#ff6600',
        align:'center'                          
      })
      this.scoresText.setOrigin(0.5)
      // Divider
      this.divider = this.add.line(0,0, this.layout['1col']*3,this.layout['1row']*4.5, this.layout['1col']*7, this.layout['1row']*4.5,  0xffffff).setOrigin(0);
      this.divider.setLineWidth(3);
      this.divider.setAlpha(0.3)
      // Big Score 
      this.bigScore = this.add.text(this.layout['midX'], this.layout['1row']*5.4, (this.score * (this.level+1)), {
        fontFamily:'arcade',
        fontSize:this.scale.bigTitle,
        color:'#ff6600',
        align:'center'                          
      })
      this.bigScore.setOrigin(0.5)
      // Designed By Text
      this.designedByText = this.add.text(this.layout['midX'], this.layout['1row']*9.4, "Designed & Developed By B.", {
        fontSize:18,
        color:'#d8d8d8'
      })
      this.designedByText.setOrigin(0.5)

      // Text Input
      this.leaderText = this.add.text(this.layout['midX'], this.layout['1row']*7, "Join The Leaderboard", {
          fontFamily:'arcade',
          fontSize:this.scale.medTitle,
          color:'#00aad4',
          align:'center'
        })
      this.leaderText.setOrigin(0.5)
      


      const whole = this;
      whole.username = localStorage.getItem('username');
      if(whole.username)
      {
        whole.leaderText.setText("Leaderboard Position")
        const data = { "username": whole.username, "score":(this.score * (this.level+1))};
        fetch('/update_score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(responseText => {
          this.leaderboard = this.add.text(whole.layout['midX'], this.layout['1row']*8.2, `${responseText.pos}. ${responseText.username} ${responseText.score}`, {
          fontFamily:'arcade',
          fontSize:this.scale.medTitle,
          color:'#ff6600',
          align:'center'
        })
          this.leaderboard.setOrigin(0.5)
        })
        .catch(error => {
            console.error('Error:', error);
        });
      }
      else
      {
        this.element = this.add.dom(this.layout['1col'], this.layout['1row']*7.8).createFromCache('nameform');
        this.element.node.style.width = `${(this.layout['fullX'])-(this.layout['1col']*2)}px`;
        this.element.setOrigin(0)
        this.element.addListener('click');
        const xhttp = new XMLHttpRequest()
        xhttp.open("GET", "/return_usernames", true);
        xhttp.onreadystatechange = function() {
            if(xhttp.status == 200 && xhttp.readyState == 4 ) {
              whole.rep = JSON.parse(xhttp.responseText);
              console.log(whole.rep)
            }
        }
        xhttp.send();

      
        this.element.on('click', (event) => {
          if (event.target.name === 'leaderboardBtn')
          {
              this.inputText = this.element.getChildByName('nameField');
              if (this.inputText.value !== '')
              {
                if(!whole.rep.includes(this.inputText.value))
                {
                  const data = { "username": this.inputText.value, "score":(this.score * (this.level+1))};
                  fetch('/add_score', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(data),
                  })
                  .then(response => response.text())
                  .then(responseText => {
                    console.log(responseText['message']);
                    localStorage.setItem('username', this.inputText.value);
                  })
                  .catch(error => {
                      console.error('Error:', error);
                  });
                }
                else
                {
                  alert("Username Already Exist")
                }
              }
       
          }
        });
      }
    }
}

