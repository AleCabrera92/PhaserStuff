class Scene2 extends Phaser.Scene {

    constructor() {
        super({ key: 'Scene2' });
    }

    preload() { //Assets to preload for the scene
    }

    create() {

        this.scale.refresh(); this.cameras.main.fadeIn(500);

        scene = 2;

        if (sound_drill.isPlaying) {
            sound_drill.stop();
        }

        sound_titleTheme.stop();

        isMusicPlaying = false;
        this.sound.sounds.forEach(function(sound) { if (sound.key === 'levelTheme' && sound.isPlaying) { isMusicPlaying = true; } });
        if (!isMusicPlaying) { sound_levelTheme.play(); }

        platforms = this.physics.add.staticGroup();
        lasers = this.physics.add.group({allowGravity: false});
        this.physics.add.collider(lasers, platforms);
        bigLasers = this.physics.add.group({immovable: true, allowGravity: false});
        this.physics.add.collider(bigLasers, platforms, function(bigLaser) {bigLaser.setVelocityX(0), bigLaser.setAcceleration(0)});
        this.physics.add.collider(bigLasers, platforms);
        this.add.image(1700, 1303, 'ground').setScale(5).setDepth(0);
        triggerPlatform = this.physics.add.group({ immovable: true, allowGravity: false });
        player = this.physics.add.sprite(100, 0, 'beecon_full').setScale(0.3).setDepth(0.19);
        player.body.setSize(120, 120);
        player.body.setOffset(65, 110);
        this.physics.add.collider(bigLasers, player);
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);
        liveBG = this.add.image(player.x, 100, 'lifeBG').setScale(0.65).setDepth(10).setAlpha(0.9);
        livesText = this.add.text(player.x, 19, 'Energy: ' + lives, { fontFamily: 'Arial', fontSize: 20, color: '#000000' }).setDepth(10); //, fontStyle: 'bold'
        this.physics.add.overlap(player, triggerPlatform, () => {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('Scene3');
            });
        });
        const self = this;
        this.physics.add.collider(player, platforms, function(player, platform) {
            if (player.anims.currentAnim.key === 'drill' && platform.texture.key === 'breakableGround') {
                let timer = 0;
                let timerEvent = self.time.addEvent({
                    delay: 500,
                    callback: () => {
                        timer++;
                        if (timer >= 1 && player.anims.currentAnim.key === 'drill') {
                            platform.destroy();
                            timerEvent.remove();
                        }
                    },
                    loop: true,
                    callbackScope: self
                });
                player.once('animationcomplete', (animation) => {
                    if (animation.key === 'drill') {
                        timerEvent.remove();
                    }
                });
            }
        });
        this.physics.add.collider(bigLasers, bigLasers);
        this.physics.add.collider(bigLasers, bigLasers, function(bigLaser) {bigLaser.setVelocityX(0), bigLaser.setAcceleration(0)});

        for (let i = 0; i <= 1; i++) {
            this.add.image(i * 1600, -300, 'mountains').setScale(2).setScrollFactor(0.2).setDepth(0.1);
            this.add.image(i * 1600, 0, 'mountains').setScale(2).setScrollFactor(0.2).setDepth(0.1);
            this.add.image(i * 1600, 300, 'mountains').setScale(2).setScrollFactor(0.2).setDepth(0.1);
            this.add.image(i * 1600, 600, 'mountains').setScale(2).setScrollFactor(0.2).setDepth(0.1);
        }

        platforms.create(-300, 0, 'wall').setScale(1.5).refreshBody().setDepth(0.2);
        platforms.create(-300, 400, 'wall').setScale(1.5).refreshBody().setDepth(0.2);
        platforms.create(600, 0, 'wall').setScale(1.5).refreshBody().setDepth(0.2);
        platforms.create(600, 400, 'wall').setScale(1.5).refreshBody().setDepth(0.2);
        platforms.create(900, 0, 'wall').setScale(1.5).refreshBody().setDepth(0.2);
        platforms.create(900, 400, 'wall').setScale(1.5).refreshBody().setDepth(0.2);
        platforms.create(1200, 0, 'wall').setScale(1.5).refreshBody().setDepth(0.2);
        platforms.create(1200, 400, 'wall').setScale(1.5).refreshBody().setDepth(0.2);
        platforms.create(1500, 0, 'wall').setScale(1.5).refreshBody().setDepth(0.2);
        platforms.create(1500, 400, 'wall').setScale(1.5).refreshBody().setDepth(0.2);

        for (let i = 0; i < 10; i++) {triggerPlatform.create(i * 150, 790, 'ground').setScale(1).setAlpha(0).setDepth(0.2)};

        this.anims.create({key: 'left', frames: this.anims.generateFrameNumbers('beecon_full', { start: 1, end: 0 }), frameRate: 10, repeat: -1});
        this.anims.create({key: 'right', frames: this.anims.generateFrameNumbers('beecon_full', { start: 4, end: 5 }), frameRate: 10, repeat: -1});
        this.anims.create({key: 'idle', frames: this.anims.generateFrameNumbers('beecon_full', { start: 8, end: 9 }), frameRate: 10, repeat: -1});
        this.anims.create({key: 'idleBack', frames: this.anims.generateFrameNumbers('beecon_full', { start: 7, end: 6 }), frameRate: 10, repeat: -1});
        this.anims.create({key: 'jump', frames: this.anims.generateFrameNumbers('beecon_full', { start: 14, end: 15 }), frameRate: 10, repeat: 0});
        this.anims.create({key: 'jumpBack', frames: this.anims.generateFrameNumbers('beecon_full', { start: 13, end: 12 }), frameRate: 10, repeat: 0});
        this.anims.create({key: 'drill', frames: this.anims.generateFrameNumbers('beecon_full', { start: 10, end: 11 }), frameRate: 30, repeat: -1});

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        cursors = this.input.keyboard.createCursorKeys();

        camera = this.cameras.main;
        camera.scrollX = game.config.width * 2;
        camera.scrollY = 0;

        chargeReady = this.add.sprite(player.x, player.y, 'chargeReady').setScale(0.5).setVisible(false).setDepth(1).setAlpha(0.5);

        overlay = this.add.rectangle(this.cameras.main.centerX, this.cameras.main.centerY, this.cameras.main.width*4, this.cameras.main.height*2, 0x000000, 0.25).setDepth(1);

        this.lastWalkSoundTime = 0;

        this.input.keyboard.on('keydown-P', function () {
            pauseOverlay = this.add.rectangle(this.cameras.main.centerX, this.cameras.main.centerY, this.cameras.main.width*4, this.cameras.main.height*2, 0x000000, 0.25).setDepth(1);
            pauseText = this.add.text(0, 0, 'PAUSE', {font: '32px Arial', fill: '#fff'}).setOrigin(0.5);
            pauseText.setShadow(2, 2, '#000000', 2).setDepth(3).setPosition(player.x+320, game.config.height / 2);
            this.sound.pauseAll();
            this.sound.mute = true;
            game.scene.pause('Scene'+scene);
            game.scene.stop('Pause');
            game.scene.start('Pause');
        }, this);

    }

    update() {

        if (!game.scene.isPaused() && pauseOverlay && pauseText) {
            this.sound.resumeAll();
            this.sound.mute = false;
            pauseOverlay.destroy();
            pauseText.destroy();
        }

        camera.scrollX = player.x - game.config.width / 4;
        
        liveBG.x = player.x+100 - game.config.width / 4;
        liveBG.y = 30;

        livesText.x = player.x+20 - game.config.width / 4;
        livesText.y = 19;

        keyA.on('down', enableKeys);
        keyD.on('down', enableKeys);
        cursors.left.on('down', enableKeys);
        cursors.right.on('down', enableKeys);

        if (Phaser.Input.Keyboard.JustDown(keyK)) {
            sound_drill.play();
            sound_drill.loop = true;
            player.anims.play('drill', true);
            keyJ.enabled = false;
            keyW.enabled = false;
            keyUP.enabled = false;
            keySpace.enabled = false;
        }

        if (player.body.velocity.x !==0) {
            sound_drill.stop();
        }

        if (player.body.velocity.x !==0 && player.body.onFloor()) {
            if (this.time.now - this.lastWalkSoundTime > 100) {
                sound_beeconWalk.play();
                this.lastWalkSoundTime = this.time.now;
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            toggleFullscreen();
        }

        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J))) {
            jKeyDownTime = this.time.now;
        }

        if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J), 750)) {

            let holdTime = this.time.now - jKeyDownTime;

            if (holdTime > 750) {
                chargeReady.setVisible(true);
            }
        }

        chargeReady.setPosition(player.x, player.y-50);

        lasers.getChildren().forEach(laser => {
            if (this.physics.overlap(laser, airPlatform) || laser.body.velocity.x === 0) {
                sound_laserHit.play();
                laser.destroy();
              }
        });
    
        if (cursors.left.isDown || keyA.isDown) {
            player.setVelocityX(-250);
            if (player.anims.currentAnim.key === 'jumpBack') {
                player.anims.play('jumpBack', true);
            } else {
                player.anims.play('left', true);   
            }    
        } else if (cursors.right.isDown || keyD.isDown) {
            player.setVelocityX(250);
            if (player.anims.currentAnim.key === 'jump') {
                player.anims.play('jump', true);
            } else {
                player.anims.play('right', true);   
            }  
        } else {
            player.setVelocityX(0);
            if (player.anims.currentAnim === null || player.anims.currentAnim.key === 'right') {
                player.anims.play('idle', true);
            } else if (player.anims.currentAnim.key === 'left') {
                player.anims.play('idleBack', true);
            }
        }

        if (Phaser.Input.Keyboard.JustUp(keyJ)) {
            if (keyJ.duration > 750) {
                chargeReady.setVisible(false);
                shootBigLaser();
            } else {
                shootLaser();
            }
        }
    
        didPressUp = Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP));
        didPressW = Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W));
        didPressSpace = Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE));

        if (player.body.onFloor()) {
            hasJumped = false;
        }

        if (didPressUp || didPressW || didPressSpace) {
            if (player.body.onFloor()) {
                //console.log("1")
                if (player.anims.currentAnim.key === 'right' || player.anims.currentAnim.key === 'idle') {
                    sound_beeconJump.play();
                    player.anims.play('jump', true);
                } else if (player.anims.currentAnim.key === 'left' || player.anims.currentAnim.key === 'idleBack') {
                    sound_beeconJump.play();
                    player.anims.play('jumpBack', true);
                }   
                canDoubleJump = true;
                player.setVelocityY(-380);
            } else if (canDoubleJump) {
                //console.log("2")
                if (player.anims.currentAnim.key === 'right' || player.anims.currentAnim.key === 'idle' || player.anims.currentAnim.key === 'jump') {
                    sound_beeconJump.play();
                    player.anims.play('jump', true);
                } else if (player.anims.currentAnim.key === 'left' || player.anims.currentAnim.key === 'idleBack' || player.anims.currentAnim.key === 'jumpBack') {
                    sound_beeconJump.play();
                    player.anims.play('jumpBack', true);
                }
                hasJumped = true;
                canDoubleJump = false;
                player.setVelocityY(-350);
            } else if ((!player.body.onFloor()) && (hasJumped === false)) {
                //console.log("3")
                if (player.anims.currentAnim.key === 'right' || player.anims.currentAnim.key === 'idle' || player.anims.currentAnim.key === 'jump') {
                    sound_beeconJump.play();
                    player.anims.play('jump', true);
                } else if (player.anims.currentAnim.key === 'left' || player.anims.currentAnim.key === 'idleBack' || player.anims.currentAnim.key === 'jumpBack') {
                    sound_beeconJump.play();
                    player.anims.play('jumpBack', true);
                }   
                hasJumped = true;
                player.setVelocityY(-350);
            }
        }

        player.on('animationcomplete-jump', function() {
            player.anims.play('idle', true);
        });

        player.on('animationcomplete-jumpBack', function() {
            player.anims.play('idleBack', true);
        });

        if (bigLasers.children.size > 4) {
            const bigLaserToDelete = bigLasers.getFirstAlive();
            if (bigLaserToDelete) {
                bigLaserToDelete.destroy();
            }
        }

    }

}