import { Page } from "./lib/page";

import hello_color from "./sketches/hello_color";
import hello_shape from "./sketches/hello_shape";

const page = new Page("P5 Gallery Starter");
page.InstallSketches([hello_color, hello_shape]);

export {};
