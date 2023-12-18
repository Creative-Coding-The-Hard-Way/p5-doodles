import P5 from "p5";
import { Meta } from "../lib/page";
import { Sequence } from "../lib/sequence";
import { circle_arc_lerp, line_lerp } from "../lib/animations";

function sketch(p5: P5) {
  // initialized in preload()
  let font: P5.Font = undefined;

  const size = 800;
  const diameter = size * 0.75;
  const radius = diameter * 0.5;
  const em = size / 800;
  const bisect_y = Math.sqrt((9 / 64) * diameter * diameter);
  const rotate_speed = p5.TWO_PI / 10;

  const magic_circle = new Sequence()
    .setting((p5, _, gt) => {
      p5.background(0);
      p5.translate(p5.width / 2, p5.height / 2);
      p5.scale(1, -1);
      p5.noFill();
      p5.stroke(255);
      p5.strokeWeight(4 * em);
      p5.rotate(gt * rotate_speed);
    })

    // Draw the perimeter
    .step(60, (p5, t) => {
      circle_arc_lerp(p5, 0, 0, diameter, t, -1);
    })
    .step(60, (p5, t) => {
      p5.scale(-1, 1);
      circle_arc_lerp(p5, 0, 0, diameter + 16 * em, t);
    })
    .step(30, (p5, t) => {
      p5.strokeWeight(2 * em);
      line_lerp(p5, radius, 0, -radius, 0, t);
    })

    // Bisect the center line
    .step(60, (p5, t) => {
      p5.strokeWeight(em);
      p5.stroke(255, 128);
      circle_arc_lerp(p5, radius, 0, diameter * 1.25, t, -0.5);
      p5.scale(-1, 1);
      circle_arc_lerp(p5, radius, 0, diameter * 1.25, t, -0.5);
    })
    .step(30, (p5, t) => {
      p5.strokeWeight(2 * em);
      line_lerp(p5, 0, bisect_y, 0, 0, t);
      line_lerp(p5, 0, bisect_y, 0, radius, t);
      line_lerp(p5, 0, -bisect_y, 0, -radius, t);
      line_lerp(p5, 0, -bisect_y, 0, 0, t);
    })

    // Draw the inscribed square
    .step(30, (p5, t) => {
      p5.strokeWeight(3 * em);
      line_lerp(p5, 0, radius, radius, 0, t);
      line_lerp(p5, 0, radius, -radius, 0, t);
    })
    .step(30, (p5, t) => {
      p5.strokeWeight(3 * em);
      line_lerp(p5, radius, 0, 0, -radius, t);
      line_lerp(p5, -radius, 0, 0, -radius, t);
    })

    // Draw the rune circles
    .step(75, (p5, t) => {
      p5.fill(0);
      p5.rotate(p5.HALF_PI * (1.0 - t));
      const r = t * radius * 0.5;
      p5.circle(0, radius, r);
      p5.circle(-radius, 0, r);
      p5.circle(0, -radius, r);
      p5.circle(radius, 0, r);
    })

    // Render letters
    .setting((p5) => {
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.textFont(font);
      p5.noStroke();
      p5.fill(255);
    })
    .step(30, (p5, t, gt) => {
      p5.textSize(t * radius * 0.35);
      p5.translate(0, radius);
      p5.rotate(-1.0 * gt * rotate_speed + p5.PI);
      p5.text("H", 0, 0);
    })
    .step(30, (p5, t, gt) => {
      p5.textSize(t * radius * 0.35);
      p5.translate(radius, 0);
      p5.rotate(-1.0 * gt * rotate_speed + p5.PI);
      p5.text("E", 0, 0);
    })
    .step(30, (p5, t, gt) => {
      p5.textSize(t * radius * 0.35);
      p5.translate(0, -radius);
      p5.rotate(-1.0 * gt * rotate_speed + p5.PI);
      p5.text("A", 0, 0);
    })
    .step(30, (p5, t, gt) => {
      p5.textSize(t * radius * 0.35);
      p5.translate(-radius, 0);
      p5.rotate(-1.0 * gt * rotate_speed + p5.PI);
      p5.text("T", 0, 0);
    })

    // Fire Circles into center
    .setting((p5) => {
      p5.fill(0);
      p5.strokeWeight(2 * em);
      p5.stroke(255);
    })
    .step(60, (p5, t) => {
      //
      const d = radius * (1.0 - t);
      p5.circle(0, d, radius * 0.3 * t);
      p5.circle(0, -d, radius * 0.3 * t);
      p5.circle(d, 0, radius * 0.3 * t);
      p5.circle(-d, 0, radius * 0.3 * t);
    })
    .step(30, (p5, t, gt) => {
      p5.noStroke();
      p5.fill(255);
      p5.rotate(-1.0 * gt * rotate_speed + p5.PI);
      p5.textSize(t * radius * 0.2);
      p5.text("F", 0, 0);
    })

    // Hold the final image before restarting
    .step(60 * 5, () => {});

  p5.preload = () => {
    font = p5.loadFont("fonts/Daedra.otf");
  };

  p5.setup = () => {
    p5.createCanvas(size, size);
  };

  p5.keyReleased = () => {
    //magic_circle.save(p5, "animation.gif");
    magic_circle.restart(p5);
  };

  p5.draw = () => {
    magic_circle.draw(p5);
  };
}

const meta: Meta = {
  name: "Inscribed Square",
  description:
    "An animation based on the geometric construction of an inscribed square.",
  sketch,
};
export default meta;
