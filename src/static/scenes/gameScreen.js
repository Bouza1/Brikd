import { letters1, letters2, letters3, returnALevel } from "./levels.js";

export default class GameScreen extends Phaser.Scene{
    //--------------------------------------------------------  Load Section --------------------------------------------------------
    init(data)
    {
      this.lives = data.lifes || 10;
      this.level = data.level || 0
      this.score = data.score || 0
      this.mobile = data.mobile || false
      this.layout = data.layout
      this.scale = data.layout.gameScreen
      this.okayToShoot = 0
      this.bulletsLeft = 0
    }  
    
    preload()
    {
      this.scene.stop('countdownScreen');
    }

    loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
      document.fonts.add(loaded);
    }).catch(function (error) {
      return error;
      });
    }
    // Coloumn Math For Letters And Spacing
    doTheMath()
    {
      let colWidth = this.physics.world.bounds.width/12
      let oneColInCol = colWidth/5.52
      return [colWidth, oneColInCol]
    }
    // Place Bricks When Scene Loads
    initBricks(level)
    {
      const bricks = this.add.group();
      let letters = ""
      if(level <= 2)
      {
        let levelObj = [letters1, letters2, letters3]
        letters = levelObj[level]
      }
      else
      {
        letters = returnALevel()
      }
      let colMath = this.doTheMath()
      let start_x = colMath[0]
      let start_y = this.layout['1row']*1.15
      for(let k = 0; k < letters.length; k++)
      {
        let letter = letters[k]
        for(let i = 0; i < letter.length; i++)
        {
          let col = letter[i]
          for(let j = 0; j < col.length; j++)
          {
            let color = col[10]
            if(col[j] === 1)
            {
              const littleBrick = this.add.rectangle(start_x, start_y, this.scale.brickSize, this.scale.brickSize, color)
              this.physics.add.existing(littleBrick, true)
              const randomNumber = Math.random();
              if (randomNumber < 0.5) 
              {
                  littleBrick.strength = 1;
              } 
              else 
              {
                littleBrick.strength =  2;
              }
              bricks.add(littleBrick);
            }
              start_y = start_y + this.scale.brickY;
          }
          start_x = start_x + this.scale.brickX
          start_y = this.layout['1row']*1.15
        }
        start_x = start_x + colMath[0]
      }
      return bricks
    }
    // Place Heart For Each Life
    initLives()
    {
      const hearts = this.add.group();
      let startX = 20
      for(let i = 0; i < this.lives; i++)
      {
        const life = this.add.image(startX, 20, 'heart');
        life.setOrigin(0.5,0.5)
        hearts.add(life);
        startX = startX + 10
      }
      return hearts
    }
    // Place Ball
    initBall(x, y, color)
    {
      let ball = this.add.circle(x, y, 10, color);
      ball.strength = 1;
      this.physics.add.existing(ball);
      ball.body.setBounce(1);
      ball.body.setCollideWorldBounds(true);
      let vel = this.genRandomVel();
      ball.body.setVelocity(vel[0], vel[1]);
      return ball
    }

    create()
    {
      // -------------------------------------------------------- Groups --------------------------------------------------------  
      this.bullets = this.add.group();
      this.balls = this.add.group();
      this.powerupGroup = this.add.group();
      this.powerupImageGroup = this.add.group();
      this.qmarks = this.add.group();
      // -------------------------------------------------------- Game Objects -------------------------------------------------------- 
      //Bricks
      this.bricks = this.initBricks(this.level);
      this.brickCount = this.bricks.children.entries.length;
      //Padel
      this.paddle = this.add.image(this.layout['midX'], this.layout['1row']*7.7, 'paddel');
      this.paddle.setOrigin(0.5);
      this.physics.add.existing(this.paddle, true);
      //Ball
      this.ball = this.initBall(this.layout['midX'], this.layout['1col']*5, '0xffe680');
      this.ball.trueball = true;
      this.balls.add(this.ball);
      //Lives
      this.hearts = this.initLives()
      //Explosion Animation
      this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion'),
        frameRate: 40,
        repeat: 0,
        hideOnComplete: true
      });
      // Powerup Animation
      this.anims.create({
        key: 'powerupBrick',
        frames: this.anims.generateFrameNumbers('powerupBlock'),
        frameRate: 20,
        repeat: -1,
        hideOnComplete: true
      });   
      // Sounds
      this.brickHitSound = this.sound.add('brickHit', { loop: false,  volume: 0.6 });
      this.powerupSound = this.sound.add('powerupSound', { loop: false,  volume: 0.4 });
      this.brickExplodeSound = this.sound.add('brickExplode', { loop: false,  volume: 0.6 });
      this.winSound = this.sound.add('win', { loop: false,  volume: 0.4 });
      this.music = this.sound.add('bgMusic', { loop: true,  volume: 0.7 }); 
      this.music.play();
      // Powerups
      this.powerupPadelFlag = 0;
      this.powerupBallFlag = 0;
      this.powerUpTripleFlag = 0;
      this.powerUpGunsFlag = 0;
      this.okayToShoot = 1;
      // -------------------------------------------------------- Bottom Bar -------------------------------------------------------- 
      // Bottom Bar Collider
      this.bottombar = this.add.line(0, this.layout['1row']*8, 0, 0, this.physics.world.bounds.width*2, 0, 0x6666ff);
      this.bottombar.setOrigin(0.5)
      this.physics.add.existing(this.bottombar, true)
      // Level Title 
      this.levelTitleLabel = this.add.text(this.layout['1col']*1.5, this.layout['1row']*8.6, "Level", {
        fontSize:this.scale.bigTitle,
        fontFamily:'arcade',
        color:'#00aad4'
      })
      this.levelTitleLabel.setOrigin(0.5)
      // Actual Level
      this.levelLabel = this.add.text(this.layout['1col']*1.5, this.layout['1row']*9.4, Number(this.level)+1, {
      fontSize:this.scale.medTitle,
      fontFamily:'arcade',
      color:'#00aad4'
      })
      this.levelLabel.setOrigin(0.5)
      // Score Title
      this.scoreTitleLabel = this.add.text(this.layout['1col']*8.5, this.layout['1row']*8.6, "Score", {
        fontSize:this.scale.bigTitle,
        fontFamily:'arcade',
        color:'#00aad4'
      })
      this.scoreTitleLabel.setOrigin(0.5)
      // Actual Score
      this.scoreLabel = this.add.text(this.layout['1col']*8.5, this.layout['1row']*9.4, this.score,{
        fontSize:this.scale.medTitle,
        fontFamily:'arcade',
        color:'#00aad4'
      })
      this.scoreLabel.setOrigin(0.5)
      // Powerup Section
      // Powerup Title
      this.powerupTitle = this.add.text(this.layout['midX'], this.layout['1row']*8.6, "Powerups", {
        fontSize:this.scale.bigTitle,
        fontFamily:'arcade',
        color:'#ff6600'
      })
      this.powerupTitle.setOrigin(0.5)
      // Big Ball Image
      this.bigBallPowerupImg = this.add.image(this.layout['1col']*3, this.layout['1row']*9.4, 'bigBall').setScale(this.scale.powerupImageBig)
      this.bigBallPowerupImg.setAlpha(0.4)
      this.bigBallPowerupImg.setOrigin(0.5)
      //Bullet Image
      this.bulletPowerUpImage = this.add.image(this.layout['1col']*4.3, this.layout['1row']*9.4, 'bullet').setScale(this.scale.powerupImageBig)
      this.bulletPowerUpImage.setAlpha(0.4)
      this.bulletPowerUpImage.setOrigin(0.5)
      this.bulletsLeftText = this.add.text(this.layout['1col']*4.3, this.layout['1row']*9.4, '', {
        fontFamily:'arcade',
        fontSize:this.scale.xsTitle,
        color:'#00aad4'
      })
      // XL Padel Image
      this.bigPadelImage = this.add.image(this.layout['1col']*5.6, this.layout['1row']*9.4, 'bigPadelImg').setScale(this.scale.xlPadelImage)
      this.bigPadelImage.setOrigin(0.5)
      this.bigPadelImage.setAlpha(0.4)
      // Triple Ball Image
      this.tripleBallPowerupImage = this.add.image(this.layout['1col']*6.9, this.layout['1row']*9.4, 'tripleBallImg').setScale(this.scale.powerupImageBig)
      this.tripleBallPowerupImage.setAlpha(0.4)
      this.tripleBallPowerupImage.setOrigin(0.5)
      // -------------------------------------------------------- Phyics and Controls --------------------------------------------------------
      //Colliders
      /** @type  {Phaser.Physics.Arcade.Body}*/
      this.physics.add.collider(this.balls, this.paddle, this.handlePaddleCollision, null, this);
      this.physics.add.collider(this.balls, this.bricks, this.brickIsHit, null, this);
      this.physics.add.overlap(this.bricks, this.bullets, this.brickIsHitByBullet, null, this)
      this.physics.add.overlap(this.paddle, this.powerupGroup, this.handlePowerUp, null, this)
      this.physics.add.collider(this.bottombar, this.powerupGroup, this.destroyPowerup, null, this)
      this.physics.add.overlap(this.paddle, this.qmarks, this.destroyPowerup, null, this)
      this.physics.add.collider(this.bottombar, this.qmarks, this.destroyPowerup, null, this)
      this.physics.add.collider(this.bottombar, this.balls, this.handleDeadBall, null, this)
      // Controls
      this.cursors = this.input.keyboard.createCursorKeys();
      this.input.addPointer(3);
      // Not Sure If Needed
      this.physics.world.setBounds(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height)
    }

    update()
    {   
      // -------------------------------------------------------- Phyics and Controls -------------------------------------------------------- 
      //Controls
      /** @type {Phaser.Physics.Arcade.StaticBody} */
      const body = this.paddle.body;
      // Keyboard
      if (this.cursors.left.isDown) 
      {
        this.movePadel(-1); 
        body.updateFromGameObject()
      } 
      else if (this.cursors.right.isDown) 
      {
        this.movePadel(1);
        body.updateFromGameObject()
      }
      this.input.keyboard.on('keyup-SPACE', this.returnBullet, this);
      // Mouse & TouchScreen
      this.input.on('pointermove', function (pointer) {
        let tapX = pointer.x;
        this.paddle.setPosition(pointer.x, this.paddle.y)
        this.paddle.body.updateFromGameObject()
      }, this);
      if(this.mobile)
      {
        if(this.input.pointer2.isDown)
        {
          this.returnBullet()
        }
      }
      else
      {
        this.input.on('pointerdown', function()
        {
          this.returnBullet()
        }, this)
      }
    }
    // -------------------------------------------------------- Game Objects -------------------------------------------------------- 
    // ---------------------------- Padel ---------------------------- 
    movePadel(direction)
    {
      let speed = 8;
      this.paddle.x += speed * direction;
      this.stopPaddleExitingWorld(this);
    }
  
    stopPaddleExitingWorld() {
        this.paddle.x = Phaser.Math.Clamp(this.paddle.x, this.paddle.width/2 , this.layout['1col']*10 - this.paddle.width/2);
    }
    // ---------------------------- Ball ---------------------------- 
    handleDeadBall(bottomBar, ball)
    {
      this.explodeAnimation(ball.x, ball.y, 2)
      if(ball.trueball === true)
      {
        if(ball.strength === 2)
        {
          this.bigBallPowerupImg.setAlpha(0.4)
          this.ball.setRadius(10)
          this.ball.body.setCircle(10);
          this.ball.strength = 1
          this.powerupBallFlag = 0
        }
          this.resetBall()
          this.minusLife()
      }
      else
      {
        this.powerUpTripleFlag -= 1
        if(this.powerUpTripleFlag <= 0)
        {
            this.tripleBallPowerupImage.setAlpha(0.4)
        }
        ball.destroy()
      }
    }
    // Paddel - Ball Collider
    handlePaddleCollision(ball, paddle) 
    {
      ball.body.velocity.x = -5 * (paddle.x - ball.x)
    }

    resetBall()
    {
        this.ball.setPosition(this.layout.midX, this.layout['1row']*4)
        let vel = this.genRandomVel()
        this.ball.body.setVelocity(vel[0], vel[1]);
    }

    genRandomVel()
    {
        const minAngle = Math.atan(440 / 600);
        const maxAngle = Math.PI - minAngle;
        const angleRad = Phaser.Math.FloatBetween(minAngle, maxAngle);
        const speed = 180;
        const velocityX = speed * Math.cos(angleRad);
        const velocityY = speed * Math.sin(angleRad);
        return [velocityX, velocityY]
    }
    // ---------------------------- Animations ---------------------------- 
    //Explode Animation
    explodeAnimation(x, y, scale)
    {
        const explosion = this.add.sprite(x, y, 'explosion').setScale(scale);
        explosion.anims.play('explode');
        explosion.once('animationcomplete', () => {
            explosion.destroy();
        });
    }
    // ---------------------------- Bricks ---------------------------- 
    // Ball - Brick Collider
    brickIsHit(ball, brick)
    {   
      brick.strength -= ball.strength;
      this.generatePowerup(brick)
      if(brick.strength >= 1)
      {
        this.brickHitSound.play();
        brick.setAlpha(0.5)
      }
      else if(brick.strength <= 0)
      {
        brick.destroy();
        this.brickExplodeSound.play();
        this.explodeAnimation(brick.x, brick.y, 2)
        this.updateScore(1)
        this.brickCount --;
        if(this.brickCount <= 0)
        {
          this.goToNextLevel()
        }
      } 
    }  
    // Brick - Bullet Collider
    brickIsHitByBullet(brick, bullet)
    {
      brick.destroy();
      this.brickExplodeSound.play();
      this.explodeAnimation(brick.x, brick.y, 2)
      this.updateScore(1)
      this.brickCount --;
      if(this.brickCount <= 0)
      {
        this.goToNextLevel()
      }
    }
    // ---------------------------- Powerup Section ---------------------------- 
    // Powerup Luck
    generatePowerup(brick)
    {
      let rand = Math.floor(Math.random() * 20)
      let x = brick.x
      let y = brick.y
      if(rand === 7 && this.powerupPadelFlag === 0)
      {
        this.dropPowerup(x, y, "padel")
        this.powerupPadelFlag = 1;
      }
      else if(rand === 2 && this.powerupBallFlag === 0)
      {
        this.dropPowerup(x, y, "ball")
        this.powerupBallFlag = 1;
      }
      else if(rand === 11 && this.powerUpTripleFlag === 0)
      {
        this.dropPowerup(x, y, "tripleBall") 
        this.powerUpTripleFlag = 2;
      }
      else if(rand === 17 && this.powerUpGunsFlag === 0)
      {
        this.dropPowerup(x, y, "missile") 
        this.powerUpGunsFlag = 1;
      }
    }
    // Create Powerup
    dropPowerup(x, y, type) 
    {
      /** @type  {Phaser.Physics.Arcade.Sprite}*/
      const powerup = this.add.sprite(x, y, 'powerupBlock').setScale(1);
      powerup.setOrigin(0.5,0.5)
      this.physics.add.existing(powerup);
      powerup.body.setVelocity(0,70);
      powerup.powerupType = type

      const qMark = this.add.image(x,y, 'qmark')
      qMark.setOrigin(0.5,0.5)
      this.physics.add.existing(qMark);
      qMark.body.setVelocity(0,70);

      powerup.anims.play('powerupBrick');

      this.powerupGroup.add(powerup)
      this.qmarks.add(qMark)
      
      return powerup;
    }
    // Powerup - Paddle Collision
    handlePowerUp(bottombar, powerup)
    {
      const powerupActions = 
      {
        ball: this.biggerBall,
        padel: this.biggerPadel,
        tripleBall: this.tripleBall,
        missile: this.missile
      };
      if (powerup.type === "Sprite" && powerup.powerupType in powerupActions) 
      {
        powerupActions[powerup.powerupType].call(this);
        powerup.destroy();
      }
    }
    // Powerup - Bottombar - Paddel Collision
    destroyPowerup(bottombar, powerup,)
    {
      console.log(powerup)
      powerup.destroy()
    }
    // XL Ball Powerup
    biggerBall()
    {
      this.powerupSound.play();
      this.bigBallPowerupImg.setAlpha(1)
      this.ball.setRadius(20)
      this.ball.body.setCircle(20);
      this.ball.strength = 2
    }
    // XL Padel Powerup
    biggerPadel()
    {
      this.powerupSound.play();
      this.paddle.setScale(2, 1)
      this.bigPadelImage.setAlpha(1)
      setTimeout(() => {
        this.paddle.setScale(1, 1)
        this.powerupPadelFlag = 0
        this.bigPadelImage.setAlpha(0.4)
      }, 15000);   
    }
    // 3x Ball Powerup
    tripleBall()
    {
      this.powerupSound.play();
      const ball1 = this.initBall(this.layout['1col']*3.5, this.layout['1row'], '0xde8787')
      const ball2 = this.initBall(this.layout['1col']*7, this.layout['1row'], '0xde8787')
      ball1.trueball = false
      ball2.trueball = false
      this.balls.add(ball1)
      this.balls.add(ball2)
      this.tripleBallPowerupImage.setAlpha(1)
    }
    // Missile Powerup
    missile(powerup)
    {
      this.powerupSound.play();
      this.bulletPowerUpImage.setAlpha(1)
      this.okayToShoot = 1
      this.bulletsLeft = 20
      this.bulletsLeftText.setText(this.bulletsLeft)
    }
    // Create Bullet & Shoot
    returnBullet()
    {
      if(this.powerUpGunsFlag === 1 && this.okayToShoot === 1 && this.bulletsLeft > 0)
      {
        this.okayToShoot = 0;
        this.bulletsLeft -= 1
        this.bulletsLeftText.setText(this.bulletsLeft)
        const bullet = this.add.image(this.paddle.x, this.paddle.y, 'bullet').setScale(0.3);
        this.physics.add.existing(bullet);
        bullet.body.setVelocity(0,-300);
        this.bullets.add(bullet)
        setTimeout(() => {
          this.okayToShoot = 1
          if(this.bulletsLeft <= 0)
          {
            this.powerUpGunsFlag = 0
            this.bulletsLeftText.setText('')
            this.bulletPowerUpImage.setAlpha(0.4)
          }
        }, 1000)
      }

    }
    // -------------------------------------------------------- Gameplay -------------------------------------------------------- 
    // Update Score
    updateScore(toAdd)
    {
        this.score += toAdd
        this.scoreLabel.setText(this.score)
    }
    // Lose A Life
    minusLife() 
    {
      this.lives -= 1
      if(this.lives <= 0)
      {
        this.endGame()
      }
      else
      {
       this.hearts.children.entries[(this.hearts.children.entries.length)-1].destroy() 
      } 
    }
    // Next Level
    goToNextLevel()
    {    
        this.destroyAllObjects()
        this.winSound.play()
        const congratsText = this.add.text(this.layout['midX'], (this.layout['1row']*8)/2, "Congratulations", {
          fontSize:this.scale.bigTitle,
          color:'#ff6600',
          fontFamily:'arcade'
        })
        congratsText.setOrigin(0.5)
        setTimeout(() => {
            this.scene.start('countdownScreen', {level:this.level, lifes:this.lives, score:this.score, layout:this.layout})
        }, 4000)
    }
    // Destroy All Game Objects
    destroyAllObjects()
    {
        this.music.stop()
        while (this.bricks.getLength() > 0) {
            let brick = this.bricks.getFirstAlive();
            brick.destroy();
        }
        while (this.bullets.getLength() > 0) {
            let bullet = this.bullets.getFirstAlive();
            bullet.destroy();
        }
        while (this.balls.getLength() > 0) {
            let ball = this.balls.getFirstAlive();
            ball.destroy();
        }
        while (this.powerupImageGroup.getLength() > 0) {
            let powerupImg = this.powerupImageGroup.getFirstAlive();
            powerupImg.destroy();
        }
        this.explodeAnimation(this.layout['midX'], this.layout['1row']*5, 20)
        this.brickExplodeSound.play();
        this.paddle.visible = false;
    }
    // Game Over
    endGame()
    {
         this.destroyAllObjects();
         setTimeout(() => {
            this.scene.start("endScreen", {score:this.score, level:this.level, layout:this.layout});
         },500)
         
     }

}


