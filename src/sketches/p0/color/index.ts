import { Page } from "~/src/lib/page";
import P5 from "p5";

function sketch(p5: P5) {
  const w = 800;
  const h = 600;

  p5.setup = () => {
    p5.createCanvas(w, h);
    p5.colorMode(p5.HSL);
  };

  p5.draw = () => {
    p5.background(128);

    const rows = 15;
    const cols = 15;
    const row_height = h / rows;
    const col_width = w / cols;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const top = j * row_height;
        const left = i * col_width;
        p5.fill((360 * i) / cols, 45, (100 * j) / rows);
        p5.rect(left, top, col_width, row_height);
      }
    }
  };
}
new Page("Hello Color", sketch);

export {};
