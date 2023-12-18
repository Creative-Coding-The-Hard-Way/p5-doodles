import { Page } from "./lib/page";

import inscribed_square from "./sketches/inscribed_square";
import text from "./sketches/text";

const page = new Page("Magic Circles");
page.InstallSketches([inscribed_square, text]);

export {};
