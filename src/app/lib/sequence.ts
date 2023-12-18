import P5 from "p5";

/**
 * An animation is a function which uses p5 to draw a frame based on an
 * interpolation factor, t.
 *
 * @param p5 {P5}
 *     The P5 library instance, used to draw the animation.
 * @param t {number}
 *     A float value in the range [0, 1], where 0 represents the
 *     beginning of the animation, and 1 represents the end. This can be used
 *     for interpolation.
 * @param gt {number}
 *     The global time since the application started. This can be used to
 *     synchronize animation elements.
 */
export type Animation = (p5: P5, t: number, gt: number) => void;

interface Step {
  duration_in_frames: number;
  animation: Animation;
  keep_settings: boolean;
  blocking: boolean;
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
/**
 * A utility for creating sequenced animations.
 * Example usage:

   let sequence = new Sequence()
    .setting(() => {
      background(0);
      translate(width / 2, height / 2);
      scale(1, -1);
      stroke(255);
    })
    .step(30, (t, gt) => {
      circle(width / 4, height / 4, 20 + t * 20);
    })
    .step(30, (t, gt) => {
      line(-width / 2, 0, -width / 2 + (t * width) / 2, 0);
    });
 *
 * Then in your draw function, simply call:

   sequence.draw();

 */
export class Sequence {
  private steps: Step[];
  private reset_frame: number;
  private reset_time: number;

  constructor() {
    this.steps = [];
    this.reset_frame = 0;
    this.reset_time = 0;
  }

  /**
   * A setting is an animation function which is called in order,
   * and all settings are persisted.
   * @return this, for chaining
   */
  setting(animation: Animation): Sequence {
    this.steps.push({
      duration_in_frames: 0,
      animation,
      keep_settings: true,
      blocking: false,
    });
    return this;
  }

  /**
   * Add a sequential step to the animation.
   *
   * Each step's animation starts after the previous steps have finished.
   * When a step is finished, the animation function is still called every frame
   * with a value of 1.
   *
   * Settings in animations are not retained once they complete. If you need to
   * set and keep settings, add a 'setting' step.
   *
   * @return this, for chaining
   */
  step(
    duration_in_frames: number,
    animation: Animation,
    blocking?: boolean
  ): Sequence {
    let is_blocking = blocking == undefined ? true : blocking;
    this.steps.push({
      duration_in_frames,
      animation,
      keep_settings: false,
      blocking: is_blocking,
    });
    return this;
  }

  /**
   * Restarts the animation sequence from the beginning.
   */
  restart(p5: P5) {
    this.reset_frame = p5.frameCount;
    this.reset_time = p5.millis() / 1000.0;
  }

  /**
   * Draws the frame based on the current time and frame count.
   */
  draw(p5: P5) {
    const global_time = p5.millis() / 1000.0 - this.reset_time;
    let frame = p5.frameCount - this.reset_frame;

    if (frame > this.totalFrameCount() + 61) {
      this.restart(p5);
    }

    for (const {
      duration_in_frames,
      animation,
      keep_settings,
      blocking,
    } of this.steps) {
      const t = easeInOutCubic(
        p5.constrain(frame, 0, duration_in_frames) / duration_in_frames
      );

      if (keep_settings) {
        animation(p5, t, global_time);
      } else {
        p5.push();
        animation(p5, t, global_time);
        p5.pop();
      }

      if (blocking) {
        frame -= duration_in_frames;
      }
      if (frame <= 0) {
        break;
      }
    }
  }

  /**
   * Returns the total duration of the sequence in frames.
   */
  totalFrameCount() {
    let frames = 0;
    for (const { duration_in_frames } of this.steps) {
      frames += duration_in_frames;
    }
    return frames;
  }

  /**
   * Save an animated gif with enough frames for the entire
   * sequence and a little extra.)
   */
  save(p5: P5, fileName: string) {
    p5.saveGif(fileName, this.totalFrameCount() + 60, { units: "frames" });
  }
}
