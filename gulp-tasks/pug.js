import { src, dest, series } from "gulp";
import pug from "gulp-pug";
import plumber from "gulp-plumber";
import htmlbeautify from "gulp-html-beautify";
import jsonConcat from "gulp-json-concat";
import clean from "gulp-clean";
import data from "gulp-data";
import replace from "gulp-replace";
const urlBuilder = require('gulp-url-builder')
const fs = require("fs");

const blocksJsons = () =>
  src("app/pages/**/*.json")
    .pipe(plumber())
    .pipe(
      jsonConcat("blocks.json", function (dataJson) {
        return Buffer.from(JSON.stringify(dataJson));
      })
    )
    .pipe(dest("dist"));

const pugToHtmlRus = () =>
    src(["app/pages/*.pug", "!app/pages/layout.pug"])
    .pipe(plumber())
    .pipe(
      
      data(() => {
        return {
          text: JSON.parse(fs.readFileSync(`dist/blocks.json`)),
          lang: "rus",
        };
      })
    )
    .pipe(pug())
    .pipe(htmlbeautify())
    .pipe(urlBuilder())
    .pipe(dest("dist/"));

const deleteJson = () => src(["dist/blocks.json"]).pipe(clean());

export default series(
  blocksJsons,
  pugToHtmlRus,
  deleteJson
);