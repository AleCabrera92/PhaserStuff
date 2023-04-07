class Title extends Phaser.Scene {

  constructor() {
    super({ key: 'Title' });
  }

  preload() {
    
    this.load.spritesheet('beecon_full', 'assets/beecon_full.png', { frameWidth: 250, frameHeight: 250 });
    this.load.image('platform', 'assets/platform.png');
    this.load.image('title', 'assets/title.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('clouds', 'assets/cloud.png');
    this.load.image('rain', 'assets/rain.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('skyOverlay', 'assets/skyOverlay.png');
    this.load.audio('titleTheme', 'assets/titleTheme.mp3');
    this.load.audio('beeconWalk', 'assets/beeconWalk.mp3');
    this.load.audio('beeconJump', 'assets/beeconJump.mp3');

  }

  create() {

    this.scale.refresh();

    overlay = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000).setOrigin(0).setDepth(1002);

    this.time.delayedCall(1000, function() {
      this.tweens.add({
        targets: overlay,
        alpha: 0,
        duration: 1000,
        onComplete: function() {
          overlay.destroy();
        }
      });
    }, [], this);

    overlay2 = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000).setOrigin(0).setDepth(1000);

    this.time.delayedCall(3000, function() {
      this.tweens.add({
        targets: overlay2,
        alpha: 0,
        duration: 1000,
        onComplete: function() {
          overlay2.destroy();
        }
      });
    }, [], this);
  
    bgm = this.sound.add('titleTheme', { loop: true });
    bgm.setVolume(0.5);

    // this.sound.pauseOnBlur = false;
    // this.sound.on('blur', function () {
    //   bgm.setMute(true);
    // });
  
    // // Unmute the audio when the tab regains focus
    // this.sound.on('focus', function () {
    //   bgm.setMute(false);
    // });
  
    // Play the audio after a delay of 3 seconds
    this.time.delayedCall(850, function() {
      bgm.play();
    }, [], this);

    const randomText = this.add.text(0, 0, 'PRESS ENTER TO START', {font: '32px Arial', fill: '#fff'}).setOrigin(0.5);
    randomText.setPosition(this.game.canvas.width/2, this.game.canvas.height/1.8);
    randomText.setShadow(2, 2, '#000000', 2).setDepth(3);
    //this.input.keyboard.on('keydown-ENTER', () => {this.cameras.main.fadeOut(1000); this.scene.start('Scene1')});
    this.input.keyboard.on('keydown-ENTER', () => {this.scene.start('Scene1')});
    platforms = this.physics.add.staticGroup();
    player = this.physics.add.sprite(0, 600, 'beecon_full').setScale(0.3);
    player.body.setSize(120, 120);
    player.body.setOffset(65, 110);
    player.setCollideWorldBounds(true);
    platforms.create(this.game.canvas.width/2, this.game.canvas.height/3.5, 'title').setScale(0.518).refreshBody().setDepth(1001).setAlpha(1);

    for (let i = 0; i < 3; i++) {this.add.image(i * 1024, 300, 'sky').setScrollFactor(0.1).setDepth(-0.4)};

    clouds = this.physics.add.image(576, 100, 'clouds').setScrollFactor(0.13).setDepth(-0.3).setGravity(false).setAlpha(0.75); // enable physics on the image
    clouds.body.setVelocityX(-51); clouds.body.setCollideWorldBounds(false); clouds.body.allowGravity = false;
    clouds2 = this.physics.add.image(1500, 300, 'clouds').setScrollFactor(0.15).setDepth(-0.3).setGravity(false).setAlpha(0.75); // enable physics on the image
    clouds2.body.setVelocityX(-33); clouds2.body.setCollideWorldBounds(false); clouds2.body.allowGravity = false;
    clouds3 = this.physics.add.image(803, 500, 'clouds').setScrollFactor(0.17).setDepth(-0.3).setGravity(false).setAlpha(0.75); // enable physics on the image
    clouds3.body.setVelocityX(-22); clouds3.body.setCollideWorldBounds(false); clouds3.body.allowGravity = false;

    for (let i = 0; i < 4; i++) {platforms.create(i * 512, 760, 'ground').setScale(1).refreshBody()};

    this.anims.create({key: 'idle', frames: this.anims.generateFrameNumbers('beecon_full', { start: 8, end: 9 }), frameRate: 10, repeat: -1});
    this.anims.create({key: 'left', frames: this.anims.generateFrameNumbers('beecon_full', { start: 1, end: 0 }), frameRate: 10, repeat: -1});
    this.anims.create({key: 'right', frames: this.anims.generateFrameNumbers('beecon_full', { start: 4, end: 5 }), frameRate: 10, repeat: -1});
    this.anims.create({key: 'jump', frames: this.anims.generateFrameNumbers('beecon_full', { start: 14, end: 15 }), frameRate: 10, repeat: 0});
    this.anims.create({key: 'jumpBack', frames: this.anims.generateFrameNumbers('beecon_full', { start: 13, end: 12 }), frameRate: 10, repeat: 0});
    this.anims.create({key: 'idle', frames: this.anims.generateFrameNumbers('beecon_full', { start: 8, end: 9 }), frameRate: 10, repeat: -1});
    this.anims.create({key: 'idleBack', frames: this.anims.generateFrameNumbers('beecon_full', { start: 7, end: 6 }), frameRate: 10, repeat: -1});

    this.physics.add.collider(player, platforms);
    this.timer = this.time.addEvent({delay: 500, loop: true, callback: () => {randomText.visible = !randomText.visible}});
  
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

    player.anims.play('right');
    player.setVelocityX(250);

    emitter = this.add.particles('rain').setDepth(-0.11).createEmitter({
      x: 0,
      y: 0,
      quantity: 50,
      lifespan: 1600,
      speedY: { min: 300, max: 500 },
      speedX: { min: -5, max: 5 },
      scale: { start: 0.1, end: 0.5 },
      rotate: { start: 0, end: 0 },
      frequency: 5,
      emitZone: { source: new Phaser.Geom.Rectangle(0, 0, this.game.config.width, 1) },
      on: true
    });

    emitter.setScrollFactor(0).setScale(0.5).setAlpha(0.7);
    
  }

  update() {

    if (clouds) {this.physics.world.wrap(clouds.body, clouds.width, true)};
    if (clouds2) {this.physics.world.wrap(clouds2.body, clouds2.width, true)};
    if (clouds3) {this.physics.world.wrap(clouds3.body, clouds3.width, true)};

    if (player.body.blocked.right) {
      player.anims.play('left', true);
        player.setVelocityX(-250);
        let delay1 = Phaser.Math.Between(0, 4000);
        let self1 = this;
        if (Math.random() < 0.5) {
          this.time.addEvent({
            delay: delay1,
            callback: function() {
              player.setVelocityY(-380);
              player.anims.play('jumpBack', true);
              self1.time.delayedCall(333.33, function() {
                player.anims.play('left', true);
              }, [], this);
            },
            loop: false
          });
        }
        let delay2 = Phaser.Math.Between(0, 4000);
        let self2 = this;
        if (Math.random() < 0.5) {
          this.time.addEvent({
            delay: delay2,
            callback: function() {
              player.setVelocityY(-380);
              player.anims.play('jumpBack', true);
              self2.time.delayedCall(333.33, function() {
                player.anims.play('left', true);
              }, [], this);
            },
            loop: false
          });
        }
      player.setVelocityX(-250);
    } else if (player.body.blocked.left) {
        player.anims.play('right', true);
        player.setVelocityX(250);
        let delay3 = Phaser.Math.Between(0, 4000);
        let self3 = this;
        if (Math.random() < 0.5) {
          this.time.addEvent({
            delay: delay3,
            callback: function() {
              player.setVelocityY(-380);
              player.anims.play('jump', true);
              self3.time.delayedCall(333.33, function() {
                player.anims.play('right', true);
              }, [], this);
            },
            loop: false
          });
        }
        let delay4 = Phaser.Math.Between(0, 4000);
        let self4 = this;
        if (Math.random() < 0.5) {
          this.time.addEvent({
            delay: delay4,
            callback: function() {
              player.setVelocityY(-380);
              player.anims.play('jump', true);
              self4.time.delayedCall(333.33, function() {
                player.anims.play('right', true);
              }, [], this);
            },
            loop: false
          }); 
        }   
    }

    player.on('animationcomplete-jump', function() {
      player.anims.play('idle', true);
    });

    player.on('animationcomplete-jumpBack', function() {
        player.anims.play('idleBack', true);
    });
    
    if (Phaser.Input.Keyboard.JustDown(keyF)) {toggleFullscreen()};

  }

  shutdown() {this.timer.remove()};

}