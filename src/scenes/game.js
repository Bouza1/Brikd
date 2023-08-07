import Phaser from "phaser";

export default class Game extends Phaser.Scene{
    
    init()
    {
        this.lives = 5;
    }

    init_bricks()
    {
        const bricks = this.add.group();
        //B
        const rectangle1 = this.add.rectangle(70, 60, 20, 40, 0xff5733, 1)
        const rectangle2 = this.add.rectangle(70, 110, 20, 40, 0xff5733, 1)
        const rectangle3 = this.add.rectangle(70, 160, 20, 40, 0xff5733, 1)   
        const rectangle4 = this.add.rectangle(100, 55, 20, 30, 0xff5733, 1)
        const rectangle5 = this.add.rectangle(100, 110, 20, 20, 0xff5733, 1)
        const rectangle6 = this.add.rectangle(100, 165, 20, 30, 0xff5733, 1)
        const rectangle7 = this.add.rectangle(125, 80, 10, 40, 0xff5733, 1)
        const rectangle8 = this.add.rectangle(125, 145, 10, 40, 0xff5733, 1)
        // O
        const rectangle9 = this.add.rectangle(170, 50, 20, 40, 0xf5f4de, 1)
        const rectangle10 = this.add.rectangle(170, 90, 20, 20, 0xf5f4de, 1)
        const rectangle11 = this.add.rectangle(170, 130, 20, 40, 0xf5f4de, 1)
        const rectangle12 = this.add.rectangle(200, 35, 20, 30, 0xf5f4de, 1)
        const rectangle13 = this.add.rectangle(200, 145, 20, 30, 0xf5f4de, 1)
        const rectangle14 = this.add.rectangle(230, 50, 20, 40, 0xf5f4de, 1)
        const rectangle15 = this.add.rectangle(230, 90, 20, 20, 0xf5f4de, 1)
        const rectangle16 = this.add.rectangle(230, 130, 20, 40, 0xf5f4de, 1)
        // U
        const rectangle17 = this.add.rectangle(280, 60, 20, 40, 0xfef771, 1)
        const rectangle18 = this.add.rectangle(280, 105, 20, 30, 0xfef771, 1)
        const rectangle19 = this.add.rectangle(280, 150, 20, 40, 0xfef771, 1)
        const rectangle20 = this.add.rectangle(310, 165, 20, 30, 0xfef771, 1)
        const rectangle21 = this.add.rectangle(340, 60, 20, 40, 0xfef771, 1)
        const rectangle22 = this.add.rectangle(340, 105, 20, 30, 0xfef771, 1)
        const rectangle23 = this.add.rectangle(340, 150, 20, 40, 0xfef771, 1)
        // Z
        const rectangle24 = this.add.rectangle(395, 30, 35, 20, 0x71c2fe, 1)
        const rectangle25 = this.add.rectangle(440, 30, 40, 20, 0x71c2fe, 1)
        const rectangle26 = this.add.rectangle(395, 150, 40, 20, 0x71c2fe, 1)
        const rectangle27 = this.add.rectangle(440, 150, 35, 20, 0x71c2fe, 1)
        const rectangle28 = this.add.rectangle(435, 60, 40, 20, 0x71c2fe, 1)
        const rectangle29 = this.add.rectangle(420, 90, 30, 20, 0x71c2fe, 1)
        const rectangle30 = this.add.rectangle(405, 120, 40, 20, 0x71c2fe, 1)
        //A
        const rectangle31 = this.add.rectangle(495, 70, 20, 40, 0x98ff93, 1)
        const rectangle32 = this.add.rectangle(495, 115, 20, 30, 0x98ff93, 1)
        const rectangle33 = this.add.rectangle(495, 160, 20, 40, 0x98ff93, 1)
        const rectangle34 = this.add.rectangle(525, 55, 20, 30, 0x98ff93, 1)
        const rectangle35 = this.add.rectangle(525, 110, 20, 20, 0x98ff93, 1)
        const rectangle36 = this.add.rectangle(555, 70, 20, 40, 0x98ff93, 1)
        const rectangle37 = this.add.rectangle(555, 115, 20, 30, 0x98ff93, 1)
        const rectangle38 = this.add.rectangle(555, 160, 20, 40, 0x98ff93, 1)

        const brick_array = [
            rectangle1, rectangle2, rectangle3, rectangle4, rectangle5, rectangle6, rectangle7, rectangle8, rectangle9, rectangle10, rectangle11, 
            rectangle12, rectangle13, rectangle14, rectangle15, rectangle16, rectangle17, rectangle18, rectangle19, rectangle20, rectangle21, rectangle22, 
            rectangle23,rectangle24, rectangle25, rectangle26, rectangle27, rectangle28, rectangle29, rectangle30, rectangle31, rectangle32, rectangle33, rectangle34,
            rectangle35, rectangle36, rectangle37, rectangle38
        ]

        for(let i = 0; i < brick_array.length; i++)
        {   
            this.physics.add.existing(brick_array[i], true)
            brick_array[i].hitCount = 0;
            bricks.add(brick_array[i]);

        }

        return bricks
    }

    init_lives()
    {
        const hearts = this.add.group();
        const life1 = this.add.image(20, 20, 'heart');
        life1.setOrigin(0.5,0.5)
        const life2 = this.add.image(30, 20, 'heart');
        life2.setOrigin(0.5,0.5)
        const life3 = this.add.image(40, 20, 'heart');
        life3.setOrigin(0.5,0.5)
        const life4 = this.add.image(50, 20, 'heart');
        life4.setOrigin(0.5,0.5)
        const life5 = this.add.image(60, 20, 'heart');
        life5.setOrigin(0.5,0.5)
        hearts.add(life1);
        hearts.add(life2);
        hearts.add(life3);
        hearts.add(life4);
        hearts.add(life5);
        return hearts
    }

    preload()
    {
        this.load.image('heart', './assets/heart2.png');
        this.load.image('powerup_padel', './assets/powerup_padel.png');
        this.load.image('powerup_ball', './assets/powerup_ball.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 16,
            frameHeight: 16,
            startFrame: 0,
            endFrame: 17 - 1
        });
        this.load.audio('brickHit', './assets/hit.mp3');
        this.load.audio('brickExplode', './assets/bomb.mp3');
        this.load.audio('powerupSound', './assets/bonus.mp3');
        this.load.audio('bgMusic', './assets/music.mp3')
    }

    create()
    { 
        this.physics.world.setBounds(0, 0, 630, 440)
        //Bricks
        this.bricks = this.init_bricks()
        this.brick_count = 38
        //Lives
        this.hearts = this.init_lives()


        //Padel
        this.paddle = this.add.rectangle(315, 400, 80, 20, 0xffffff, 1)
        this.paddle.setOrigin(0.5)
        this.physics.add.existing(this.paddle, true)

        //Ball
        this.ball = this.add.circle(260, 250, 6, 0xffffff, 1)
        this.physics.add.existing(this.ball)
        this.ball.body.setBounce(1, 1)
        this.ball.body.setCollideWorldBounds(true)
        this.reset_ball()
        this.ball.checkWorldBounds = true;

        //Explosion Animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion'),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
        // Soounds
        this.brickHitSound = this.sound.add('brickHit');
        this.powerupSound = this.sound.add('powerupSound');
        this.brickExplodeSound = this.sound.add('brickExplode');
        this.music = this.sound.add('bgMusic', { loop: true,  volume: 0.5 }); 
        this.music.play();
        // Powerups
        this.powerup_padel_flag = 0
        this.powerup_ball_flag = 0

        //Colliders
        /** @type  {Phaser.Physics.Arcade.Body}*/
        this.physics.add.collider(this.ball, this.paddle, this.handlePaddleCollision, null, this);
        this.physics.add.collider(this.ball, this.bricks, this.brickIsHit, null, this)

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys()

    }

    update()
    {   
        //Controls
        /** @type {Phaser.Physics.Arcade.StaticBody} */
        const body = this.paddle.body
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
        if(this.ball.y >= 430)
        {
            this.reset_ball()
            this.minus_life()
        }
        this.stopPaddleExitingWorld.call(this);
    }

    stopPaddleExitingWorld() {
        this.paddle.x = Phaser.Math.Clamp(this.paddle.x, 40, 630 - 40);
    }

    handlePaddleCollision(ball, paddle) {
        const relativeX = ball.x - paddle.x;
        const normalizedRelativeX = relativeX / paddle.width; 
        if (normalizedRelativeX < 0.33) {
            ball.body.setVelocityX(-160); 
        } else if (normalizedRelativeX < 0.66) {
           ball.body.setVelocityX(160);
        }
}

    reset_ball()
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

    minus_life() 
    {
        this.lives -=
        this.hearts.children.entries[(this.hearts.children.entries.length)-1].destroy()
    }

    biggerBall(powerup)
    {
        this.powerupSound.play();
        powerup.destroy()
        this.ball.setRadius(10)
        setTimeout(() => {
            this.ball.setRadius(6)
            this.powerup_padel_ball = 0
          }, 10000);
    }

    biggerPadel(powerup)
    {
        this.powerupSound.play();
        powerup.destroy()
        this.paddle.setSize(160, 20)
        setTimeout(() => {
            this.paddle.setSize(80, 20)
            this.powerup_padel_flag = 0
          }, 10000);
          
    }

    drop_powerup(x, y, type) 
    {
        if(type === "ball")
        {
            const powerup = this.add.image(x, y, 'powerup_ball');
            this.physics.add.existing(powerup);
            powerup.body.setVelocity(0, 70);
            this.physics.add.collider(this.paddle, powerup, () => this.biggerBall(powerup), null, this);
            return powerup;
        }
        else if(type === "padel")
        {
            const powerup = this.add.image(x, y, 'powerup_padel');
            this.physics.add.existing(powerup);
            powerup.body.setVelocity(0, 70);
            this.physics.add.collider(this.paddle, powerup, () => this.biggerPadel(powerup), null, this);
            return powerup;
        }
        
    }

    generate_powerup(brick)
    {
        let rand = Math.floor(Math.random() * 10)
        let x = brick.x
        let y = brick.y
        if(rand === 7 && this.powerup_padel_flag === 0)
        {
            this.drop_powerup(x, y, "padel")
            this.powerup_padel_flag = 1;
        }
        else if(rand === 2 && this.powerup_ball_flag === 0)
        {
            this.drop_powerup(x, y, "ball")
            this.powerup_ball_flag = 1;
        }
    }

    brickIsHit(ball, brick)
    {   
        brick.hitCount++;
        if(brick.hitCount === 1)
        {
            this.brickHitSound.play();
            brick.setAlpha(0.5)
            this.generate_powerup(brick)
        } 
        else if (brick.hitCount === 2) 
        {
            brick.destroy();
            this.brickExplodeSound .play();
            this.explode_animation(brick.x, brick.y)
            this.brick_count --;
            if(this.brick_count === 0)
            {
                console.log("Game Won")
            }
        }
    }

    explode_animation(x, y)
    {
        const explosion = this.add.sprite(x, y, 'explosion').setScale(2);
        explosion.anims.play('explode');
        explosion.once('animationcomplete', () => {
            explosion.destroy();
        });
    }
}
