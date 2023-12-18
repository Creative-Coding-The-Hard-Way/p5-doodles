import P5 from "p5";
import { Meta } from "../lib/page";

function sketch(p5: P5) {
  p5.setup = () => {
    p5.createCanvas(640, 480);
    p5.colorMode(p5.HSB);
  };

  p5.draw = () => {
    p5.background("#faebd7");
    p5.noStroke();

    const steps = 32;
    for (let i = 0; i < steps; i++) {
      for (let j = 0; j < steps; j++) {
        p5.fill((i / steps) * 360, 70, (1.0 - j / steps) * 100);
        const x = (i * p5.width) / steps;
        const y = (j * p5.height) / steps;
        p5.rect(x, y, x + p5.width / steps, y + p5.height / steps);
      }
    }
  };
}

const meta: Meta = {
  name: "Hello Color",
  description: "An example sketch which does things with color.",
  sketch,
};
export default meta;
