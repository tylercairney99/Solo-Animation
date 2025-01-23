class Adventurer {
  constructor(game) {
      this.game = game;
      this.spriteSheet = ASSET_MANAGER.getAsset("./adventurer_sprite_sheet_v1.1.png");

      this.x = 100;    // Starting X position
      this.yBase = 300; // Ground-level Y position
      this.y = this.yBase;
      this.speed = 150; 
      this.state = "idle"; // Start idle

      // Define animations
      this.animators = {
          idle: new Animator(this.spriteSheet, 0, 0, 32, 32, 1, 1, true),        // Row 1
          running: new Animator(this.spriteSheet, 0, 37, 32, 32, 6, 0.15, true), // Row 2
          attacking: new Animator(this.spriteSheet, 0, 148, 32, 32, 6, 0.1, false) // Row 5 (attack)
      };

      this.currentAnimator = this.animators.idle; // Default animation
  }

  update() {
      switch (this.state) {
          case "idle":
              // If D is pressed, go to running
              if (this.game.keys["d"] || this.game.keys["D"]) {
                  this.state = "running";
                  this.currentAnimator = this.animators.running;
                  this.currentAnimator.elapsedTime = 0;
              }

              // If there's a click, attack once
              if (this.game.click) {
                  this.state = "attacking";
                  this.currentAnimator = this.animators.attacking;
                  this.currentAnimator.elapsedTime = 0;
                  // Prevent resetting attack every frame
                  this.game.click = false;
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
              }

              // If there's a click, attack once
              if (this.game.click) {
                  this.state = "attacking";
                  this.currentAnimator = this.animators.attacking;
                  this.currentAnimator.elapsedTime = 0;
                  this.game.click = false;
              }

              // Stay on the ground
              this.y = this.yBase;
              break;

          case "attacking":
              // Remain on the ground while attacking
              this.y = this.yBase;

              // Return to idle after the attack animation finishes
              if (this.currentAnimator.isDone()) {
                  this.state = "idle";
                  this.currentAnimator = this.animators.idle;
              }
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