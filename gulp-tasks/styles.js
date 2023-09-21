import { src, dest } from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import shorthand from "gulp-shorthand";
import cleanCSS from "gulp-clean-css";
import plumber from "gulp-plumber";
import concat from "gulp-concat";

const sass = gulpSass(dartSass);
const styles = () =>
  src([
    "app/styles/variables.scss",
    "app/styles/base.scss",
    "app/styles/media.scss",
    "app/styles/**/*.scss",
    "app/pages/**/*.scss",
  ])
    .pipe(plumber())
    .pipe(concat("style.scss"))
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(shorthand())
    .pipe(cleanCSS({ debug: true }))
    .pipe(dest("dist/css"));

export default styles;
