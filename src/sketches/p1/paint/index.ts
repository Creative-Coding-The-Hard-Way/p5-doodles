import { Page } from "~/src/lib/page";
import P5 from "p5";

function sketch(p5: P5) {
  const w = 800;
  const h = 600;

  p5.setup = () => {
    p5.createCanvas(w, h);
    p5.colorMode(p5.HSL);
    p5.background(128);
    p5.noStroke();
  };

  p5.draw = () => {
    const hue = ((p5.millis() / 1000.0) * (360 / 5.0)) % 360;
    p5.push();
    p5.stroke(hue, 50, 50);
    p5.strokeWeight(30);
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    p5.pop();
  };
}
new Page("Paint", sketch);

export {};
