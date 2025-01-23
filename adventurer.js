class Adventurer {
  constructor(game) {
      this.game = game;
      this.spriteSheet = ASSET_MANAGER.getAsset("./adventurer_sprite_sheet_v1.1.png");

      this.x = 100;    // Starting X position
      this.yBase = 300; // Ground-level Y position
      this.y = this.yBase; // Character stays grounded
      this.speed = 150; 
      this.state = "idle"; // Start in idle state

      // Define animations
      this.animators = {
          idle: new Animator(this.spriteSheet, 0, 0, 32, 32, 1, 1, true),        // Row 1
          running: new Animator(this.spriteSheet, 0, 37, 32, 32, 6, 0.15, true) // Row 2
      };

      this.currentAnimator = this.animators.idle; // Default animation
  }

  update() {
      switch (this.state) {
          case "idle":
              // If D is pressed, go to running
              if (this.game.keys["d"] || this.game.keys["D"]) {
                  this.state = "running";
                  this.currentAnimator = this.animators.running;d
                  this.currentAnimator.elapsedTime = 0; // Reset animation time
              }

              // Stay on the ground
              this.y = this.yBase;
              break;

          case "running":
              // Keep moving right if D is held
              if (this.game.keys["d"] || this.game.keys["D"]) {
                  this.x += this.speed * this.game.clockTick;
              } else {
                  // Otherwise, back to idle
                  this.state = "idle";
                  this.currentAnimator = this.animators.idle;
                  this.currentAnimator.elapsedTime = 0; // Reset animation time
              }

              // Stay on the ground
              this.y = this.yBase;
              break;
      }

      // Prevent moving off-screen on the right side
      if (this.x > this.game.ctx.canvas.width - this.currentAnimator.width * 3) {
          this.x = this.game.ctx.canvas.width - this.currentAnimator.width * 3;
      }
  }

  draw(ctx) {
      // Draw current animation frame
      this.currentAnimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
  }
}
