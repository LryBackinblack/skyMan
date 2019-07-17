/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import { Coin } from "../gameObj/coin";
export class MainScene extends Phaser.Scene {
  private skyMan: Phaser.GameObjects.Sprite;
  private background: Phaser.GameObjects.Sprite;
  private screenWidth: number;
  private screenHeight: number;
  private leftKey: Phaser.Input.Keyboard.Key;
  private rightKey: Phaser.Input.Keyboard.Key;
  private skyManSpeed: number;
  public  coins: Coin[]=[];

  private spawnSpeed: number;  //生成速度
  private spawnTimer: number;  //敌人生成器的计时器

  constructor() {
    super({
      key: "MainScene"
    });

  }

  preload(): void {
    this.load.image("skyMan", "./src/boilerplate/assets/skyMan.png");
    this.load.image("background", "./src/boilerplate/assets/bg.jpg");
    this.load.image("coin", "./src/boilerplate/assets/coin.png");
  }

  create(): void {
    this.screenWidth = this.game.config.width as number;
    this.screenHeight = this.game.config.height as number;
    this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    this.background = this.add.sprite(0, 0, "background");

    this.skyMan = this.add.sprite(this.screenWidth / 2, this.screenHeight / 1.1, "skyMan").setInteractive();
    this.input.setDraggable(this.skyMan);

    this.skyMan.on('drag', function (pointer, dragX, dragY) {
      this.x = dragX;
    });
    this.skyManSpeed = 5;
    this.background.scale = 1.5;
    this.skyMan.scale = 0.1;
    this.spawnTimer = this.game.getTime();
    this.spawnSpeed=500;
    console.log(this.game);
  }

  //金币🌧
  coinRain(): void {
    let coin = new Coin({
      scene: this,
      x: Math.random() * (this.screenWidth - 50)+25,
      y: -50,
      key: "coin",
      coinSpeed: 1
    })
    coin.setActive(true);
    this.coins.push(coin);
  }

  update(): void {

    //键盘控制
    if (this.leftKey.isDown) {
      if (this.skyMan.x > 0) {
        this.skyMan.x -= this.skyManSpeed;
      }
    }
    else if (this.rightKey.isDown) {
      if (this.skyMan.x < this.screenWidth) {
        this.skyMan.x += this.skyManSpeed;
      }
    }

    //硬币生成器
    if (this.spawnTimer < this.game.getTime()) {
      this.coinRain();
      this.spawnTimer = this.game.getTime()+this.spawnSpeed;
    }

    //硬币降落与销毁
    for (let index = 0; index < this.coins.length; index++) {
      if (!this.coins[index].move()) {
          this.coins.splice(index,1);
      }
    }
  }
}
