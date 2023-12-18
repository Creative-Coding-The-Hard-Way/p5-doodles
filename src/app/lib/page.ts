import P5 from "p5";

/**
 * Metadata for an individual sketch.
 */
export interface Meta {
  /** Create the sketch. */
  sketch: (p5: P5) => void;

  /** The human-readable display name for the sketch. */
  name: string;

  /**
   * The human-readable description of the sketch. Should be a single paragraph.
   */
  description: string;
}

/**
 * Represents the main application index page.
 */
export class Page {
  private root: HTMLElement;
  private name: HTMLElement;
  private description: HTMLElement;
  private sketch: P5 | undefined;

  /**
   * Create the main page.
   *
   * The Page assumes that certain elements exist within the index.html markup.
   *
   * @param title - The title will set the text at the top of the page and in
   *                the document metadata.
   */
  constructor(title: string) {
    this.root = document.getElementById("sketch_root")!;
    this.name = document.getElementById("sketch_name")!;
    this.description = document.getElementById("sketch_description")!;
    this.sketch = undefined;

    document.title = title;
    document.getElementById("app_title")!.innerText = title;
  }

  InstallSketches(sketches: Meta[]) {
    const hashed_sketches: Map<string, Meta> = new Map();
    const nav = document.getElementById("sketch_list")!;
    for (const sketch of sketches) {
      const hash = "#" + sketch.name.toLowerCase().replaceAll(" ", "-");
      console.log("adding sketch: ", hash);
      hashed_sketches.set(hash, sketch);

      const link = document.createElement("a");
      link.href = hash;
      link.innerText = sketch.name;
      nav.appendChild(link);
    }

    const hash_changed = () => {
      console.log("hash changed", window.location.hash);
      if (hashed_sketches.has(window.location.hash)) {
        this.InstallSketch(hashed_sketches.get(window.location.hash));
      } else {
        console.log(
          "Got hash ",
          window.location.hash,
          " but expected one of ",
          [...hashed_sketches.keys()]
        );
        if (window.location.hash == "") {
          this.InstallSketch(sketches[0]);
        }
      }
    };
    hash_changed();
    window.onhashchange = hash_changed;
  }

  /**
   * Install a sketch to the current page.
   *
   * Any previously-running sketch will be stopped and replaced by the new one.
   *
   * @param meta The sketch to install.
   */
  InstallSketch(meta: Meta) {
    this.name.innerText = meta.name;
    this.description.innerText = meta.description;

    if (this.sketch != undefined) {
      console.log("Removing existing sketch...");
      this.sketch.remove();
    }
    console.log("Install sketch: ", meta.name);
    this.sketch = new P5((p5: P5) => meta.sketch(p5), this.root);
  }
}
