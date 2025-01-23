class Animator {
  constructor(spriteSheet, xStart, yStart, width, height,
              frameCount, frameDuration, loop = true) {
      this.spriteSheet = spriteSheet;
      this.xStart = xStart;
      this.yStart = yStart;
      this.width = width;
      this.height = height;
      this.frameCount = frameCount;
      this.frameDuration = frameDuration;
      this.loop = loop;
      this.elapsedTime = 0;
  }

  drawFrame(tick, ctx, x, y, scale = 1) {
      // Accumulate time
      this.elapsedTime += tick;

      // If looping, wrap around; if not looping, clamp at last frame
      if (this.loop) {
          this.elapsedTime %= this.frameDuration * this.frameCount;
      } else if (this.elapsedTime >= this.frameDuration * this.frameCount) {
          this.elapsedTime = this.frameDuration * (this.frameCount - 1);
      }

      // Determine current frame
      const frame = this.currentFrame();
      const frameX = this.xStart + frame * this.width;

      // Draw that frame
      ctx.drawImage(
          this.spriteSheet,
          frameX, this.yStart, this.width, this.height,
          x, y, this.width * scale, this.height * scale
      );
  }

  currentFrame() {
      return Math.floor(this.elapsedTime / this.frameDuration);
  }

  isDone() {
      // True if we've exceeded the total duration of a non-looping animation
      return this.elapsedTime >= this.frameDuration * this.frameCount;
  }
}