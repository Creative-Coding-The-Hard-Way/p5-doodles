import { Page } from "~/src/lib/page";
import P5 from "p5";

function sketch(p5: P5) {
  const w = 800;
  const h = 600;

  p5.setup = () => {
    p5.createCanvas(w, h);
    p5.colorMode(p5.HSL);
    p5.background(128);
  };

  p5.draw = () => {
    p5.translate(w / 2, h / 2);

    p5.beginShape();

    const radius = p5.map(p5.mouseY, 0, h, 30, h / 2);
    const steps = Math.round(p5.map(p5.mouseX, 0, w, 3, 15));
    const angle_step = p5.TWO_PI / steps;
    for (let i = 0; i < steps; i++) {
      const angle = i * angle_step;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      p5.vertex(x, y);
    }

    p5.endShape(p5.CLOSE);
  };
}
new Page("Hello Shape", sketch);

export {};
