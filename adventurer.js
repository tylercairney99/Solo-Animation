class Adventurer {
  constructor(game) {
      this.game = game;
      this.spriteSheet = ASSET_MANAGER.getAsset("./adventurer_sprite_sheet_v1.1.png");

      this.x = 100; // Starting X position
      this.y = 300; // Starting Y position
      this.speed = 150; // Movement speed in pixels per second

      this.animator = new Animator(
          this.spriteSheet, // Sprite sheet
          0, 37, // Starting position of 2nd row (row height = 37px)
          50, 37, // Frame width and height
          6, 0.1 // 6 frames, 0.1s per frame
      );

      this.direction = 1; // 1 for moving right, -1 for moving left
  }

  update() {
      // Move back and forth
      this.x += this.direction * this.speed * this.game.clockTick;
      if (this.x > this.game.ctx.canvas.width - 50 || this.x < 0) {
          this.direction *= -1; // Reverse direction
      }
  }

  draw(ctx) {
      // Draw the correct frame
      this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  }
}
