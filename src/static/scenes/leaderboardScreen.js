export default class LeaderboardScreen extends Phaser.Scene{
    init(data)
    {
      this.layout = data.layout
      this.scale = data.layout.controlsScreen
      this.mobile = data.mobile || false
      this.topScorers = this.getScores()
    }
  
    preload()
    {

    }

    create()
    {
      // // DELETE FOR TESTIMG ONLY
      // localStorage.setItem('username', "Josh Bousfield")
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
      // Leaderboard Title
      this.leaderboardTitle = this.add.text(this.layout['midX'], this.layout['1row'] , "Leaderboard", {
        fontFamily:'arcade',
        fontSize:this.scale.bigTitle,
        color:'#00aad4'
      })    
      this.leaderboardTitle.setOrigin(0.5)
      const board = this
      board.username = localStorage.getItem('username');
      
      if (board.username) {
        board.usernameflag = true;
      } else {
        board.usernameflag = false;
      }

      board.usernameTop15 = false
      
      const xhttp = new XMLHttpRequest()
      xhttp.open("GET", "/return_scores", true);
      xhttp.onreadystatechange = function() {
          if(xhttp.status == 200 && xhttp.readyState == 4 ) {
            this.rep = JSON.parse(xhttp.responseText);
            this.topScorers = this.rep['scores']
            this.holder = 1.7
            for(let i = 0; i < 15; i++){
              this.number = board.add.text(board.layout['1col'],  board.layout['1row']*(this.holder), i+1, {
                fontFamily:'arcade',
                fontSize:board.scale.xsTitle,
                color:'#ff6600',
                align:'right'          
              })
              
              this.leaderScore = board.add.text(board.layout['1col']*2.2,  board.layout['1row']*(this.holder), this.topScorers[i].score, {
                fontFamily:'arcade',
                fontSize:board.scale.xsTitle,
                color:'#ff6600',
                align:'right'          
              })
              
              this.leaderName = board.add.text(board.layout['1col']*4,  board.layout['1row']*(this.holder), this.topScorers[i].username, {
                fontFamily:'arcade',
                fontSize:board.scale.xsTitle,
                color:'#ff6600',
                align:'right'          
              })
              if(this.topScorers[i].username == board.username){
                this.number.setColor('#00aad4')
                this.leaderScore.setColor('#00aad4')
                this.leaderName.setColor('#00aad4')
                board.usernameTop15 = true;
              }
              this.holder += 0.5
            }
            if(board.usernameflag && !board.usernameTop15){
               for (let i = 0; i < this.topScorers.length; i++) {
                  if (this.topScorers[i].username === board.username) {
                    this.number = board.add.text(board.layout['1col'],  board.layout['1row']*(this.holder), i+1, {
                      fontFamily:'arcade',
                      fontSize:board.scale.xsTitle,
                      color:'#00aad4',
                      align:'right'          
                    })
                    this.leaderScore = board.add.text(board.layout['1col']*2.2,  board.layout['1row']*(this.holder), this.topScorers[i].score, {
                      fontFamily:'arcade',
                      fontSize:board.scale.xsTitle,
                      color:'#00aad4',
                      align:'right'          
                    })
                    this.leaderName = board.add.text(board.layout['1col']*4,  board.layout['1row']*(this.holder), this.topScorers[i].username, {
                      fontFamily:'arcade',
                      fontSize:board.scale.xsTitle,
                      color:'#00aad4',
                      align:'right'          
                    })
                  }
                }
            }
            console.log(this.topScorers)
          }
      }
      xhttp.send();

      
    }


    update()
    {

    }
  
    getScores() {
      let xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function() {
          if(xhttp.status == 200 && xhttp.readyState == 4 ) {
            let topScorers = JSON.parse(xhttp.response);
            return topScorers['scores']
          }
      }
      xhttp.open("GET", "/return_scores", true);
      xhttp.send();
    }    
}