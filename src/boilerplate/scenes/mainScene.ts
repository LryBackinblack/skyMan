/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

export class MainScene extends Phaser.Scene {
  private skyMan: Phaser.GameObjects.Sprite;
  private background: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.image("skyMan", "./src/boilerplate/assets/skyMan.jpg");
    this.load.image("background", "./src/boilerplate/assets/bg.jpg");

  }

  create(): void {
    const screenWidth:number = this.game.config.width as number;
    const screenHeight:number = this.game.config.height as number;
    this.background = this.add.sprite(0, 0, "background");
    this.skyMan = this.add.sprite(screenWidth / 2, screenHeight / 1.1, "skyMan").setInteractive();
    this.input.setDraggable(this.skyMan);

    this.skyMan.on('drag', function (pointer, dragX, dragY) {
        this.x = dragX;
    });

    this.background.scale = 1.5;
    this.skyMan.scale = 0.1;
  }
}
