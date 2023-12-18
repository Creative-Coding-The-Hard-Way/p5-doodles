import P5 from "p5";
import { Meta } from "../lib/page";

function sketch(p5: P5) {
  p5.setup = () => {
    p5.createCanvas(400, 800);
  };

  p5.draw = () => {
    p5.background("grey");
  };
}

const meta: Meta = {
  name: "Text Or Something",
  description: "Not sure yet.",
  sketch,
};
export default meta;
