import { watch, series } from "gulp";
import pugToHtml from "./pug";
import styles from "./styles";
import script from "./script";
import imgMinAll from "./img";
import fonts from "./fonts";

const bs = require("browser-sync").create();

const readyReload = (done) => {
  bs.reload();
  done();
};

const server = (done) => {
  bs.init({
    server: {
      baseDir: "./dist",
      index: "index.html",
    },
    port: 3001
  });
  watch("app/js/**/*.js", series(script, readyReload));
  watch("app/pages/**/*.pug", series(pugToHtml, readyReload));
  watch("app/**/*.{sass,scss}", series(styles, readyReload));
  watch("app/**/*.{png,jpg,svg}", series(imgMinAll, readyReload));
  watch("app/**/*.svg", series(pugToHtml, readyReload));
  watch("app/fonts/**/*", series(fonts, readyReload));
  done();
};

export default server;
