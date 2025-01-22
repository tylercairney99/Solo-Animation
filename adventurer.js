class Adventurer {
  constructor(game) {
      this.game = game;
      this.spriteSheet = ASSET_MANAGER.getAsset("./adventurer_sprite_sheet_v1.1.png");

      this.x = 100; // Starting X position
      this.y = 300; // Starting Y position
      this.speed = 100; // Speed of movement in pixels per second

      this.frameWidth = 50; // Width of each frame in the sprite sheet
      this.frameHeight = 37; // Height of each frame
      this.frameCount = 6; // Number of frames in the walking animation
      this.frameIndex = 0; // Current frame index
      this.frameDuration = 0.1; // Time each frame is shown
      this.frameTimer = 0;

      this.direction = 1; // 1 for right, -1 for left
  }

  update() {
      // Update frame timer
      this.frameTimer += this.game.clockTick;
      if (this.frameTimer > this.frameDuration) {
          this.frameTimer = 0;
          this.frameIndex = (this.frameIndex + 1) % this.frameCount; // Loop frames
      }

      // Update position and reverse direction at canvas edges
      this.x += this.direction * this.speed * this.game.clockTick;
      if (this.x > this.game.ctx.canvas.width - this.frameWidth || this.x < 0) {
          this.direction *= -1; // Reverse direction
      }
  }

  draw(ctx) {
      const frameX = this.frameIndex * this.frameWidth;
      const frameY = this.direction === 1 ? 0 : this.frameHeight; // Switch row for direction
      ctx.drawImage(
          this.spriteSheet,
          frameX, frameY, this.frameWidth, this.frameHeight,
          this.x, this.y, this.frameWidth, this.frameHeight
      );
  }
}
