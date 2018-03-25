export class MainScene extends Phaser.Scene {

    private player: Phaser.GameObjects.Sprite;
    private playerSpeed: number;
    private treasure: Phaser.GameObjects.Sprite;
    private enemies: Phaser.GameObjects.Group;

    init() {
        this.playerSpeed = 1.5;
        // this.enemySpeed = 2;
        // this.enemyMaxY = 280;
        // this.enemyMinY = 80;
    }
  
    preload(): void {
        this.load.image("background", "assets/background.png");
        this.load.image("player", "assets/player.png");
        this.load.image("dragon", "assets/dragon.png");
        this.load.image("treasure", "assets/treasure.png");
    }
  
    create(): void {
        //background
        const bg = this.add.image(0, 0, "background");
        bg.setOrigin(0, 0);
        //player
        this.player = this.add.sprite(40, this.sys.game.config['height'] / 2, 'player');
        // scale down
        this.player.setScale(0.5);
        //treasuer
        this.treasure = this.add.sprite(
            this.sys.game.config['width'] - 80, this.sys.game.config['height'] / 2, 'treasure'
        );
        this.treasure.setScale(0.6);
        //enemies
        // group of enemies
        this.enemies = this.add.group({
            key: 'dragon',
            repeat: 5,
            setXY: {
                x: 110,
                y: 100,
                stepX: 80,
                stepY: 20
            }
        });
        //scale enemies down
        Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

    }
    
    update() {
        // check for active input
        if (this.input.activePointer.isDown) {
          // player walks
          this.player.x = this.input.activePointer.x
          this.player.y = this.input.activePointer.y
        }
        //validate collision with treasure
        // treasure collision
        if (Phaser.Geom.Intersects.RectangleToRectangle(
            this.player.getBounds() as Phaser.Geom.Rectangle, 
            this.treasure.getBounds() as Phaser.Geom.Rectangle )
        ) {
            this.gameOver();
        }
    }

    gameOver(){
        // restart the scene
        this.scene.manager['bootScene'](this);
    }
  }