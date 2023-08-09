import Phaser from "phaser";

export default class Game extends Phaser.Scene{
    
    init()
    {
        this.lives = 10;
    }

    initBricks()
    {
        const bricks = this.add.group();

        const letters = 
        [
            [
                //B
                [1,1,1,1,1,1,1,1,1,1, "0x0088aa"],
                [1,1,1,1,1,1,1,1,1,1, "0x0088aa"],
                [1,1,0,0,1,1,0,0,1,1, "0x0088aa"],
                [1,1,0,0,1,1,0,0,1,1, "0x0088aa"],
                [1,1,0,0,1,1,0,0,1,1, "0x0088aa"],
                [1,1,1,1,1,1,1,1,1,1, "0x0088aa"],
                [0,1,1,1,0,0,1,1,1,0, "0x0088aa"]
            ],
            [
                //O
                [0,1,1,1,1,1,1,1,1,0, "0xff7f2a"],
                [1,1,1,1,1,1,1,1,1,1, "0xff7f2a"],
                [1,1,0,0,0,0,0,0,1,1, "0xff7f2a"],
                [1,1,0,0,0,0,0,0,1,1, "0xff7f2a"],
                [1,1,0,0,0,0,0,0,1,1, "0xff7f2a"],
                [1,1,1,1,1,1,1,1,1,1, "0xff7f2a"],
                [0,1,1,1,1,1,1,1,1,0, "0xff7f2a"]
            ],    
            [
                //U
                [1,1,1,1,1,1,1,1,1,0, "0x0088aa"],
                [1,1,1,1,1,1,1,1,1,1, "0x0088aa"],
                [0,0,0,0,0,0,0,0,1,1, "0x0088aa"],
                [0,0,0,0,0,0,0,0,1,1, "0x0088aa"],
                [0,0,0,0,0,0,0,0,1,1, "0x0088aa"],
                [1,1,1,1,1,1,1,1,1,1, "0x0088aa"],
                [1,1,1,1,1,1,1,1,1,0, "0x0088aa"]              
            ],
            [
                //Z
                [1,1,0,0,0,0,0,1,1,1, "0xff7f2a"],
                [1,1,0,0,0,0,1,1,1,1, "0xff7f2a"],
                [1,1,0,0,0,1,1,0,1,1, "0xff7f2a"],
                [1,1,0,0,1,1,0,0,1,1, "0xff7f2a"],
                [1,1,0,1,1,0,0,0,1,1, "0xff7f2a"],
                [1,1,1,1,0,0,0,0,1,1, "0xff7f2a"],
                [1,1,1,0,0,0,0,0,1,1, "0xff7f2a"]
            ],
            [
                //A
                [0,0,1,1,1,1,1,1,1,1, "0x0088aa"],
                [0,1,1,1,1,1,1,1,1,1, "0x0088aa"],
                [1,1,0,0,0,1,1,0,0,0, "0x0088aa"],
                [1,1,0,0,0,1,1,0,0,0, "0x0088aa"],
                [0,1,1,1,1,1,1,1,1,1, "0x0088aa"],
                [0,0,1,1,1,1,1,1,1,1, "0x0088aa"],

            ]
            
            
        ]

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
        this.lives = 10
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

    preload()
    {
        this.load.image('heart', './assets/heart2.png');
        this.load.image('powerupPadel', './assets/powerup_padel.png');
        this.load.image('powerupBall', './assets/powerup_ball.png');
        this.load.image('laser', './assets/bullet3.png')
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
    }

    create()
    { 
        this.physics.world.setBounds(0, 0, 680, 440)
        
        //Bricks
        this.bricks = this.initBricks()
        this.brickCount = this.bricks.children.entries.length

        //Lives
        this.hearts = this.initLives()

        //Padel
        this.paddle = this.add.rectangle(315, 400, 80, 20, 0xffffff, 1)
        this.paddle.setOrigin(0.5)
        this.physics.add.existing(this.paddle, true)

        //Balls & Ball
        this.balls = this.add.group();
        this.ball = this.add.circle(260, 250, 6, 0xffffff, 1)
        this.ball.strength = 1
        this.ball.trueball = true
        this.physics.add.existing(this.ball)
        this.ball.body.setBounce(1)
        this.ball.body.setCollideWorldBounds(true)
        this.resetBall()
        this.ball.checkWorldBounds = true;
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
        this.brickHitSound = this.sound.add('brickHit');
        this.powerupSound = this.sound.add('powerupSound');
        this.brickExplodeSound = this.sound.add('brickExplode');
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
        
        // Bullets
        this.bullets = this.add.group()
        //Colliders
        /** @type  {Phaser.Physics.Arcade.Body}*/
        this.physics.add.collider(this.ball, this.paddle, this.handlePaddleCollision, null, this);
        this.physics.add.collider(this.ball, this.bricks, this.brickIsHit, null, this);
        this.physics.add.overlap(this.bricks, this.bullets, this.brickIsHitByBullet, null, this)
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

        this.balls.getChildren().forEach(ball => {
            if (ball.y >= 430) 
            {
                this.explodeAnimation(ball.x, ball.y)
                if(ball.trueball === true)
                {
                    this.resetBall()
                    this.minusLife()
                }
                else
                {
                    this.powerUpTripleFlag -= 1
                    ball.destroy()
                }
                
            }
        });
        this.stopPaddleExitingWorld.call(this);
    }

    stopPaddleExitingWorld() {
        this.paddle.x = Phaser.Math.Clamp(this.paddle.x, 40, 680 - 40);
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
        const minAngle = Math.atan(440 / 600);
        const maxAngle = Math.PI - minAngle;
        const angleRad = Phaser.Math.FloatBetween(minAngle, maxAngle);
        const speed = 180;
        const velocityX = speed * Math.cos(angleRad);
        const velocityY = speed * Math.sin(angleRad);
        this.ball.body.setVelocity(velocityX, velocityY);
    }

    minusLife() 
    {
        this.lives -= 1
        if(this.lives <= 0)
        {
            this.restartGame("loss")
        }
        else
        {
           this.hearts.children.entries[(this.hearts.children.entries.length)-1].destroy() 
        }
        
    }

    biggerBall(powerup)
    {
        this.powerupSound.play();
        powerup.destroy()
        this.ball.setRadius(10)
        this.ball.strength = 2
        // console.log(this.ball.strength)
        setTimeout(() => {
            this.ball.setRadius(6)
            this.ball.strength = 1
            this.powerupBallFlag = 0
          }, 15000);
    }

    biggerPadel(powerup)
    {
        this.powerupSound.play();
        powerup.destroy()
        this.paddle.setSize(160, 20)
        setTimeout(() => {
            this.paddle.setSize(80, 20)
            this.powerupPadelFlag = 0
          }, 15000);
          
    }

    tripleBall(powerup)
    {
        this.powerupSound.play();
        powerup.destroy()

        const ball1 = this.add.circle(320, 50, 6, 0xffffff, 1)
        ball1.strength = 1
        this.physics.add.existing(ball1)
        ball1.body.setBounce(1)
        ball1.body.setCollideWorldBounds(true)
        ball1.body.setVelocity(50, 160)
        const ball2 = this.add.circle(420, 50, 6, 0xffffff, 1)
        ball2.strength = 1
        this.physics.add.existing(ball2)
        ball2.body.setBounce(1)
        ball2.body.setCollideWorldBounds(true)
        ball2.body.setVelocity(-50, 160)
        
        ball1.trueball = false
        ball2.trueball = false

        this.balls.add(ball1)
        this.balls.add(ball2)
        // console.log(this.balls)
        this.physics.add.collider(ball1, this.paddle, this.handlePaddleCollision, null, this);
        this.physics.add.collider(ball1, this.bricks, this.brickIsHit, null, this)
        this.physics.add.collider(ball2, this.paddle, this.handlePaddleCollision, null, this);
        this.physics.add.collider(ball2, this.bricks, this.brickIsHit, null, this)
    }

    return_bullet()
    {
        if(this.powerUpGunsFlag === 0 && this.okayToShoot === 1)
        {
            this.okayToShoot = 0;
            console.log(this.okayToShoot)
            const laserBullet = this.add.image(this.paddle.x, this.paddle.y, 'laser').setScale(0.05);
            laserBullet.rotation = Phaser.Math.DegToRad(-90)
            this.physics.add.existing(laserBullet);
            laserBullet.body.setVelocity(0,-300);
            this.bullets.add(laserBullet)
        }
        setTimeout(() => {
            this.okayToShoot = 1;
          }, 300);
    }

    guns(powerup)
    {
        this.powerupSound.play();
        powerup.destroy()
    }


    dropPowerup(x, y, type) 
    {
        /** @type  {Phaser.Physics.Arcade.Sprite}*/
        const powerup = this.add.sprite(x, y, 'powerupBlock').setScale(1);
        this.physics.add.existing(powerup);
        powerup.body.setVelocity(0,70);
        powerup.anims.play('powerupBrick');
        if(type === "ball")
        {
            this.physics.add.collider(this.paddle, powerup, () => this.biggerBall(powerup), null, this);
        }
        else if(type === "padel")
        {
            this.physics.add.collider(this.paddle, powerup, () => this.biggerPadel(powerup), null, this);
        }
        else if(type === "tripleBall")
        {
            this.physics.add.collider(this.paddle, powerup, () => this.tripleBall(powerup), null, this);
        }
        else if(type === "guns")
        {
            this.physics.add.collider(this.paddle, powerup, () => this.guns(powerup), null, this);
        }

    return powerup;
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
            // this.powerUpGunsFlag = 1;
        }

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
            this.explodeAnimation(brick.x, brick.y)
            this.brickCount --;
            if(this.brickCount <= 0)
            {
                this.restartGame("win")
            }
        } 
    }

    brickIsHitByBullet(brick, bullet)
    {
        brick.destroy();
        this.brickExplodeSound.play();
        this.explodeAnimation(brick.x, brick.y)
        this.brickCount --;
        if(this.brickCount <= 0)
        {
            this.restartGame("win")
        }
    }

   restartGame(type)
   {  
    this.scene.stop('game');
    this.scene.restart('game')
    if(type === "loss")
    {
        this.scene.start('lossScreen');
    }
    else if(type === "win")
    {
        this.scene.start('winScreen');
    }
    
   }

    explodeAnimation(x, y)
    {
        const explosion = this.add.sprite(x, y, 'explosion').setScale(2);
        explosion.anims.play('explode');
        explosion.once('animationcomplete', () => {
            explosion.destroy();
        });
    }
}


