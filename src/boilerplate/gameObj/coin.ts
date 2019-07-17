export class Coin extends Phaser.GameObjects.Sprite {
    private coinSpeed;
    constructor(params) {
        super(params.scene, params.x, params.y, params.key);
        this.setOrigin(0.5);
        this.setScale(0.05);
        this.setAlpha(1);
        this.coinSpeed = params.coinSpeed;
        this.scene.add.existing(this);
    }

    public move(): boolean {
        if (this.y < (this.scene.game.config.height as number) + this.displayHeight) {
            this.y += this.coinSpeed;
            return true;
        }
        else {
            this.destroy();
            return false;
        }
    }

    // preUpdate() {
    //     console.log('onUpdate')
    // }
}