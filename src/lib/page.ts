import P5 from "p5";

export class Page {
  private p5: P5;

  constructor(name: string, sketch: (p5: P5) => void) {
    document.title = name;

    const root = document.getElementById("sketch_root")!;
    this.p5 = new P5(sketch, root);
  }
}
