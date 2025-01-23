class Animator {
  constructor(spriteSheet, xStart, yStart, width, height, frameCount, frameDuration, loop = true) {
      this.spriteSheet = spriteSheet; // The image to be drawn
      this.xStart = xStart; // X-coordinate of the first frame
      this.yStart = yStart; // Y-coordinate of the first frame (row)
      this.width = width; // Width of a single frame
      this.height = height; // Height of a single frame
      this.frameCount = frameCount; // Total number of frames
      this.frameDuration = frameDuration; // Time per frame
      this.loop = loop; // Whether animation loops
      this.elapsedTime = 0; // Time since the animation started
  }

  drawFrame(tick, ctx, x, y, scale = 1) {
      this.elapsedTime += tick;
      if (this.loop) {
          this.elapsedTime %= this.frameDuration * this.frameCount;
      } else if (this.elapsedTime >= this.frameDuration * this.frameCount) {
          this.elapsedTime = this.frameDuration * (this.frameCount - 1); // Stop at the last frame
      }

      const frame = this.currentFrame();
      const frameX = this.xStart + frame * this.width;
      ctx.drawImage(
          this.spriteSheet, 
          frameX, this.yStart, this.width, this.height, 
          x, y, this.width * scale, this.height * scale
      );
  }

  currentFrame() {
      return Math.floor(this.elapsedTime / this.frameDuration);
  }
}
