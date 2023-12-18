import P5 from "p5";
import { Meta } from "../lib/page";

function sketch(p5: P5) {
  p5.setup = () => {
    p5.createCanvas(640, 480);
    p5.colorMode(p5.HSB);
  };

  p5.draw = () => {
    p5.background("#d6c7a9");
    p5.strokeWeight(5);
    p5.fill(120, 50, 50);
    p5.beginShape();
    p5.vertex(50, 50);
    p5.vertex(100, 55);
    p5.vertex(120, 20);
    p5.vertex(200, 100);
    p5.vertex(88, 200);
    p5.vertex(50, 50);
    p5.endShape();
  };
}

const meta: Meta = {
  name: "Hello Shape",
  description: "An example sketch which does things with shapes",
  sketch,
};
export default meta;
