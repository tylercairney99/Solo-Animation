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
            running: new Animator(this.spriteSheet, 0, 37, 32, 32, 6, 0.15, true) // Row 2
        };

        this.currentAnimator = this.animators.idle; // Default animation
    }

    update() {
        switch (this.state) {
            case "idle":
                // If D or A is pressed, go to running
                if (this.game.keys["d"] || this.game.keys["D"] || this.game.keys["a"] || this.game.keys["A"]) {
                    this.state = "running";
                    this.currentAnimator = this.animators.running;
                    this.currentAnimator.elapsedTime = 0;
                }

                // Stay on the ground
                this.y = this.yBase;
                break;

            case "running":
                // Move right if D is held
                if (this.game.keys["d"] || this.game.keys["D"]) {
                    this.x += this.speed * this.game.clockTick;
                }

                // Move left if A is held
                if (this.game.keys["a"] || this.game.keys["A"]) {
                    this.x -= this.speed * this.game.clockTick;
                }

                // If no keys are pressed, return to idle
                if (!this.game.keys["d"] && !this.game.keys["D"] && !this.game.keys["a"] && !this.game.keys["A"]) {
                    this.state = "idle";
                    this.currentAnimator = this.animators.idle;
                }

                // Stay on the ground
                this.y = this.yBase;
                break;
        }

        // Prevent moving off-screen on the left side
        if (this.x < 0) {
            this.x = 0;
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
