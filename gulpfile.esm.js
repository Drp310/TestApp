import { series } from "gulp";
import pugToHtml from "./gulp-tasks/pug";
import styles from "./gulp-tasks/styles";
import script from "./gulp-tasks/script";
import imgMinAll from "./gulp-tasks/img";
import fonts from "./gulp-tasks/fonts";
import server from "./gulp-tasks/server";
import libs from "./gulp-tasks/libs";

const build = series(pugToHtml, libs, styles, script, imgMinAll, fonts);

const start = series(build, server);

export { build, start };
