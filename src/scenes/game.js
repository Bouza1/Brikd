import Phaser from "phaser";

export default class Game extends Phaser.Scene{
    
    init()
    {
        this.lives = 5
    }

    init_bricks()
    {
        const bricks = this.add.group();
        //B
        const rectangle1 = this.add.rectangle(70, 40, 20, 40, 0xff5733, 1)
        const rectangle2 = this.add.rectangle(70, 90, 20, 40, 0xff5733, 1)
        const rectangle3 = this.add.rectangle(70, 140, 20, 40, 0xff5733, 1)   
        const rectangle4 = this.add.rectangle(100, 35, 20, 30, 0xff5733, 1)
        const rectangle5 = this.add.rectangle(100, 90, 20, 20, 0xff5733, 1)
        const rectangle6 = this.add.rectangle(100, 145, 20, 30, 0xff5733, 1)
        const rectangle7 = this.add.rectangle(125, 60, 10, 40, 0xff5733, 1)
        const rectangle8 = this.add.rectangle(125, 125, 10, 40, 0xff5733, 1)
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
        const rectangle17 = this.add.rectangle(280, 40, 20, 40, 0xfef771, 1)
        const rectangle18 = this.add.rectangle(280, 85, 20, 30, 0xfef771, 1)
        const rectangle19 = this.add.rectangle(280, 130, 20, 40, 0xfef771, 1)
        const rectangle20 = this.add.rectangle(310, 145, 20, 30, 0xfef771, 1)
        const rectangle21 = this.add.rectangle(340, 40, 20, 40, 0xfef771, 1)
        const rectangle22 = this.add.rectangle(340, 85, 20, 30, 0xfef771, 1)
        const rectangle23 = this.add.rectangle(340, 130, 20, 40, 0xfef771, 1)
        // Z
        const rectangle24 = this.add.rectangle(395, 30, 35, 20, 0x71c2fe, 1)
        const rectangle25 = this.add.rectangle(440, 30, 40, 20, 0x71c2fe, 1)
        const rectangle26 = this.add.rectangle(395, 150, 40, 20, 0x71c2fe, 1)
        const rectangle27 = this.add.rectangle(440, 150, 35, 20, 0x71c2fe, 1)
        const rectangle28 = this.add.rectangle(435, 60, 40, 20, 0x71c2fe, 1)
        const rectangle29 = this.add.rectangle(420, 90, 30, 20, 0x71c2fe, 1)
        const rectangle30 = this.add.rectangle(405, 120, 40, 20, 0x71c2fe, 1)
        //A
        const rectangle31 = this.add.rectangle(495, 50, 20, 40, 0x98ff93, 1)
        const rectangle32 = this.add.rectangle(495, 95, 20, 30, 0x98ff93, 1)
        const rectangle33 = this.add.rectangle(495, 140, 20, 40, 0x98ff93, 1)
        const rectangle34 = this.add.rectangle(525, 35, 20, 30, 0x98ff93, 1)
        const rectangle35 = this.add.rectangle(525, 90, 20, 20, 0x98ff93, 1)
        const rectangle36 = this.add.rectangle(555, 50, 20, 40, 0x98ff93, 1)
        const rectangle37 = this.add.rectangle(555, 95, 20, 30, 0x98ff93, 1)
        const rectangle38 = this.add.rectangle(555, 140, 20, 40, 0x98ff93, 1)

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
            let rand = Math.floor(Math.random() * 11)
            if (rand === 7)
            {
                brick_array[i].powerUp = true
            }
            else
            {
                brick_array[i].powerUp = false
            }
        }

        return bricks
    }

    preload()
    {
       
    }

    create()
    { 
        this.physics.world.setBounds(0, 0, 630, 440)
        this.bricks = this.init_bricks()
        this.brick_count = 38
        console.log(this.brick_count)
        // Player Padel
        this.paddle = this.add.rectangle(280, 400, 80, 20, 0xffffff, 1)
        this.physics.add.existing(this.paddle, true)
        // Lives 
        const scoreStyle =  {
            fontSize: 36
        }
        this.livesLabel = this.add.text(20, 25, '5', scoreStyle)
        .setOrigin(0.5,0.5)

        //Ball
        this.ball = this.add.circle(260, 250, 6, 0xffffff, 1)
        this.physics.add.existing(this.ball)
        this.ball.body.setBounce(1, 1)
        this.ball.body.setCollideWorldBounds(true)
        this.reset_ball()
        this.ball.checkWorldBounds = true;

        // Powerups
        this.powerupFlag = 0

        /** @type  {Phaser.Physics.Arcade.Body}*/
        this.physics.add.collider(this.paddle, this.ball)
        this.physics.add.collider(this.ball, this.bricks, this.brickIsHit, null, this)

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys()


    }

    update()
    {
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
    }

    reset_ball()
    {
        this.ball.setPosition(260, 250)
        this.ball.body.setVelocity(200, 200)
    }

    minus_life()
    {
        this.lives -= 1
        this.livesLabel.text = this.lives
        if(this.lives === 0)
        {
            console.log("Reset Game Here")
        }
    }

    biggerPadel(powerup)
    {
        powerup.destroy()
        this.paddle.setSize(160, 20)
        setTimeout(() => {
            this.paddle.setSize(80, 20)
          }, 10000);
          
    }

    drop_powerup(x, y) 
    {
        const powerup = this.add.rectangle(x, y, 10, 10, 0xffffff, 1);
        this.physics.add.existing(powerup);
        powerup.name = this.powerupFlag
        powerup.body.setVelocity(0, 70);
        this.physics.add.collider(this.paddle, powerup, () => this.biggerPadel(powerup), null, this);
        return powerup;
    }

    brickIsHit(ball, brick)
    {   
        brick.hitCount++;
        if(brick.hitCount === 1)
        {
            brick.setAlpha(0.5)
            if(brick.powerUp === true)
            {
                let x = brick.x
                let y = brick.y
                this.drop_powerup(x, y)
            }
        } 
        else if (brick.hitCount === 2) 
        {
            brick.destroy();
            this.brick_count --;
            console.log(this.brick_count)
            if(this.brick_count === 0)
            {
                console.log("Game Won")
                // this.bricks = this.init_bricks()
            }
        }
    }
}
