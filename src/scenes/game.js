import Phaser from "phaser";
import { letters1, letters2, letters3, letters4, randGeneratedLevel } from "./levels";

export default class Game extends Phaser.Scene{
    
    // Add powerup images to a group so can be destoryed as one when scene ends
    // Add powerup padel and 10 bullet images, every shot minus a bullet image
    init(data)
    {
        this.lives = data.lifes || 10;
        this.level = data.level || 0
        this.score = data.score || 0
        this.okayToShoot = 0
        this.bulletsLeft = 0
    }  
    
    preload()
    {
        this.load.image('heart', './assets/heart2.png');
        this.load.image('qmark', './assets/rainbowQ.png');
        this.load.image('laser', './assets/bullet3.png')
        this.load.image('paddel', './assets/paddel.png')
        this.load.image('bottomBar', './assets/bottombar.png')
        this.load.image('bigBall', './assets/bigball.png')
        this.load.image('tripleBallImg', './assets/tripleBall.png')
        this.load.image('bigPadelImg', './assets/bigPadel.png')
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 0,
            endFrame: 17 - 1
        });
        this.load.spritesheet('powerupBlock', "./assets/rainbowBlock.png", {
            frameWidth:20,
            frameHeight:20,
            startFrame:0,
            endFrame:24
        })

        this.load.audio('brickHit', './assets/hit.mp3');
        this.load.audio('brickExplode', './assets/bomb.mp3');
        this.load.audio('powerupSound', './assets/bonus.mp3');
        this.load.audio('bgMusic', './assets/music.mp3')
        this.load.audio('win', './assets/win_loud.mp3');
        this.scene.stop('countdownScreen');
    }


    initBricks(level)
    {
        const bricks = this.add.group();
        let letters = ""
        if(level <= 1)
        {
            let levelObj = [letters1, letters2, letters3, letters4]
            letters = levelObj[level]
        }
        else
        {
            letters = randGeneratedLevel()
        }

        let start_x = 60
        for(let k = 0; k < letters.length; k++)
        {
            let letter = letters[k]
            
            let start_y = 45
            for(let i = 0; i < letter.length; i++)
            {
                let col = letter[i]
                for(let j = 0; j < col.length; j++)
                {
    
                    let color = col[10]
                    if(col[j] === 1)
                    {
                        const littleBrick = this.add.rectangle(start_x, start_y, 10, 10, color)
                        this.physics.add.existing(littleBrick, true)
                        const randomNumber = Math.random();
                        if (randomNumber < 0.5) {
                            littleBrick.strength = 1;
                        } else {
                            littleBrick.strength =  2;
                        }
                        bricks.add(littleBrick);

                    }
                    start_y = start_y+15;
                }
                start_x = start_x + 15
                start_y = 45
            }
            start_x = start_x + 15
        }

        return bricks
    }

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

    initBall(x, y)
    {

        let ball = this.add.image(x, y, 'bigBall').setScale(0.4)
        ball.strength = 1
        this.physics.add.existing(ball)
        ball.body.setBounce(1)
        ball.body.setCollideWorldBounds(true)
        let vel = this.genRandomVel()
        ball.body.setVelocity(vel[0], vel[1]);
        return ball
    }

    create()
    { 
        //Bottom Bar
        this.bottombar = this.add.image(337.5, 490, 'bottomBar').setScale(0.5)
        this.bottombar.setOrigin(0.5)
        this.physics.add.existing(this.bottombar, true)
    
        this.scoreLabel = this.add.text(580, 515, this.score,{
            fontSize:50
        })
        this.scoreLabel.setOrigin(0.5)

        this.levelLabel = this.add.text(95, 515, Number(this.level)+1, {
            fontSize:50
        })
        this.levelLabel.setOrigin(0.5)


        this.physics.world.setBounds(0, 0, 680, 500)
        
        //Bricks
        this.bricks = this.initBricks(this.level)
        this.brickCount = this.bricks.children.entries.length

        //Lives
        this.hearts = this.initLives()

        //Padel
        this.paddle = this.add.image(337.5, 400, 'paddel');
        this.paddle.setOrigin(0.5)
        this.physics.add.existing(this.paddle, true)

        //Balls & Ball
        this.balls = this.add.group();
        this.ball = this.initBall(337.5, 220)
        // // this.ball = this.add.image(260, 250, 'bigBall').setScale(0.4)
        // // this.ball = this.add.circle(260, 250, 6, 0xffffff, 1)
        // this.ball.strength = 1
        this.ball.trueball = true
        // this.physics.add.existing(this.ball)
        // this.ball.body.setBounce(1)
        // this.ball.body.setCollideWorldBounds(true)
        // this.resetBall()
        // this.ball.checkWorldBounds = true;
        this.balls.add(this.ball)
        //Explosion Animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion'),
            frameRate: 40,
            repeat: 0,
            hideOnComplete: true
        });

        // Sounds
        this.brickHitSound = this.sound.add('brickHit', { loop: false,  volume: 0.6 });
        this.powerupSound = this.sound.add('powerupSound', { loop: false,  volume: 0.6 });
        this.brickExplodeSound = this.sound.add('brickExplode', { loop: false,  volume: 0.7 });
        this.winSound = this.sound.add('win', { loop: false,  volume: 0.6 });
        this.music = this.sound.add('bgMusic', { loop: true,  volume: 0.5 }); 
        this.music.play();

        // Powerups
        this.powerupPadelFlag = 0;
        this.powerupBallFlag = 0;
        this.powerUpTripleFlag = 0;
        this.powerUpGunsFlag = 0;
        this.okayToShoot = 1;
        this.anims.create({
            key: 'powerupBrick',
            frames: this.anims.generateFrameNumbers('powerupBlock'),
            frameRate: 20,
            repeat: -1,
            hideOnComplete: true
        });
        
        // Groups
        this.bullets = this.add.group()
        this.powerupGroup = this.add.group()
        this.bulletImgGroup = this.add.group()
        this.powerupImageGroup = this.add.group()

        //Colliders
        /** @type  {Phaser.Physics.Arcade.Body}*/
        this.physics.add.collider(this.balls, this.paddle, this.handlePaddleCollision, null, this);
        this.physics.add.collider(this.balls, this.bricks, this.brickIsHit, null, this);
        this.physics.add.overlap(this.bricks, this.bullets, this.brickIsHitByBullet, null, this)
        this.physics.add.overlap(this.paddle, this.powerupGroup, this.handlePowerUp, null, this)
        this.physics.add.collider(this.bottombar, this.powerupGroup, this.destroyPowerup, null, this)
        this.physics.add.collider(this.bottombar, this.balls, this.handleDeadBall, null, this)

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update()
    {   
        //Controls
        /** @type {Phaser.Physics.Arcade.StaticBody} */
        const body = this.paddle.body;
        if(this.cursors.left.isDown)
        {
            this.paddle.x -= 10
            this.paddle.setPosition()
            body.updateFromGameObject()
        }
        else if(this.cursors.right.isDown)
        {
            this.paddle.x += 10
            body.updateFromGameObject()
        }

        this.input.keyboard.on('keyup-SPACE', this.return_bullet, this);

        this.bullets.getChildren().forEach(bullet => {
            if (bullet.y === 0) 
            {
                bullet.destroy()
            }
        })

        this.stopPaddleExitingWorld.call(this);
    }

    stopPaddleExitingWorld() {
        this.paddle.x = Phaser.Math.Clamp(this.paddle.x, this.paddle.width/2 , 675 - this.paddle.width/2);
    }

    initBulletImgs()
    {
        let startX = 308
        for(let i = 0; i < 10; i++)
        {
            let bulletImage = this.add.image(startX, 500, 'laser').setScale(0.05)
            bulletImage.rotation = Phaser.Math.DegToRad(-90)
            startX += 7.2
            bulletImage.value = i
            this.bulletImgGroup.add(bulletImage)
        }
    }

    handleDeadBall(bottomBar, ball)
    {
        this.explodeAnimation(ball.x, ball.y, 2)
        if(ball.trueball === true)
        {
            this.resetBall()
            this.minusLife()
        }
        else
        {
            this.powerUpTripleFlag -= 1
            if(this.powerUpTripleFlag <= 0)
            {
                this.tripleBallImg.destroy()
            }
            ball.destroy()
        }
    }

    updateCountdown() {
        this.countdownValue--;
        this.countdownText.setText(this.countdownValue);
    
        if (this.countdownValue === 0) {
            this.countdownText.setText("Go!");
        }
    }
    
    handlePaddleCollision(ball, paddle) {
        const relativeX = ball.x - paddle.x;
        const normalizedRelativeX = (relativeX / paddle.width); 
        const easierCheck = normalizedRelativeX * 100
        //rightside of paddle is positive number leftside of paddle is negative
        if (easierCheck >= 0) 
        {
            if(easierCheck > 20) 
            {
                ball.body.setVelocityX(160)
            }
            else
            {
                ball.body.setVelocityX(60)
            }
        }
        else if(easierCheck < 0) 
        {
            if(easierCheck > -20) 
            {
                ball.body.setVelocityX(-60)
            }
            else
            {
                ball.body.setVelocityX(-160)
            }
        }
}

    resetBall()
    {
        this.ball.setPosition(300, 240)
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

    destroyPowerup(bottombar, powerup)
    {
        powerup.destroy()
    }

    handlePowerUp(bottombar, powerup)
    {
        // console.log(powerup)
        if(powerup.type === "Sprite")
        {
          if(powerup.powerupType === "ball")
          {
            this.biggerBall();
          }
          else if(powerup.powerupType === "padel")
          {
              this.biggerPadel();
          }
          else if(powerup.powerupType === "tripleBall")
          {
              this.tripleBall();
          }
          else if(powerup.powerupType === "guns")
          {
              this.guns();
          }
        }
        powerup.destroy()
    }

    biggerBall()
    {
        this.powerupSound.play();
        this.ball.setScale(0.6)
        this.ball.strength = 2
        this.bigBall = this.add.image(410, 490, 'bigBall');
        this.bigBall.setOrigin(0.5)
        this.powerupImageGroup.add(this.bigBall)
        setTimeout(() => {
            this.bigBall.destroy()
            this.ball.setScale(0.4)
            this.ball.strength = 1
            this.powerupBallFlag = 0
          }, 15000);
    }

    biggerPadel()
    {
        this.powerupSound.play();
        this.paddle.setScale(2, 1)
        this.bigPadelImage = this.add.image(341, 475, 'bigPadelImg');
        this.bigPadelImage.setOrigin(0.5)
        this.powerupImageGroup.add(this.bigPadelImage)
        setTimeout(() => {
            this.paddle.setScale(1, 1)
            this.powerupPadelFlag = 0
            this.bigPadelImage.destroy()
          }, 15000);
          
    }


    tripleBall()
    {
        this.powerupSound.play();

        this.tripleBallImg = this.add.image(270, 490, 'tripleBallImg');
        this.tripleBallImg.setOrigin(0.5)
        this.powerupImageGroup.add(this.tripleBallImg)
        const ball1 = this.initBall(320, 50)
        const ball2 = this.initBall(420, 50)
        ball1.trueball = false
        ball2.trueball = false
        this.balls.add(ball1)
        this.balls.add(ball2)

    }

    guns(powerup)
    {
        this.initBulletImgs()
        this.powerupSound.play();
        this.okayToShoot = 1
        this.bulletsLeft = 10
    }

    return_bullet()
    {
        if(this.powerUpGunsFlag === 1 && this.okayToShoot === 1 && this.bulletsLeft > 0)
        {
            this.okayToShoot = 0;
            this.bulletsLeft -= 1
            let bulletImgDestory = this.bulletImgGroup.children.entries[this.bulletsLeft]
            bulletImgDestory.destroy()
            // console.log(this.okayToShoot)
            const laserBullet = this.add.image(this.paddle.x, this.paddle.y, 'laser').setScale(0.7);
            laserBullet.rotation = Phaser.Math.DegToRad(-90)
            this.physics.add.existing(laserBullet);
            laserBullet.body.setVelocity(0,-300);
            this.bullets.add(laserBullet)
            setTimeout(() => {
                this.okayToShoot = 1
                if(this.bulletsLeft <= 0)
                {
                    this.powerUpGunsFlag = 0
                }
            }, 1000)
        }

    }

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
            this.dropPowerup(x, y, "guns") 
            this.powerUpGunsFlag = 1;
        }

    }

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
        this.powerupGroup.add(qMark)

        return powerup;

    }


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

    brickIsHitByBullet(brick, bullet)
    {
        brick.destroy();
        this.brickExplodeSound.play();
        this.explodeAnimation(brick.x, brick.y, 2)
        this.updateScore(1)
        this.brickCount --;
        if(this.brickCount <= 0)
        {
            this.goToNextLevel()// this.scene.restart({level:this.level += 1, lifes:this.lives})
        }
    }

   goToNextLevel()
   {    
        this.destroyAllObjects()
        this.winSound.play()
        const congratsText = this.add.text(337, 220, "Congratulations!", {
            fontSize:48
        })
        congratsText.setOrigin(0.5)
        setTimeout(() => {
            this.scene.start('countdownScreen', {level:this.level, lifes:this.lives, score:this.score})
        }, 6000)
   }

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
        while (this.bulletImgGroup.getLength() > 0) {
            let bulletImg = this.bulletImgGroup.getFirstAlive();
            bulletImg.destroy();
        }
        while (this.powerupImageGroup.getLength() > 0) {
            let powerupImg = this.powerupImageGroup.getFirstAlive();
            powerupImg.destroy();
        }

        this.explodeAnimation(337, 220, 20)
        this.brickExplodeSound.play();
        this.paddle.visible = false;
    }

    endGame()
    {
         this.destroyAllObjects();
         setTimeout(() => {
            this.scene.start("endScreen", {score:this.score, level:this.level});
         },500)
         
     }

    updateScore(toAdd)
    {
        this.score += toAdd
        this.scoreLabel.setText(this.score)
    }

    explodeAnimation(x, y, scale)
    {
        const explosion = this.add.sprite(x, y, 'explosion').setScale(scale);
        explosion.anims.play('explode');
        explosion.once('animationcomplete', () => {
            explosion.destroy();
        });
    }
}


