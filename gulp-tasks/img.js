import { src, dest, series } from 'gulp';
import imagemin from 'gulp-imagemin';
import plumber from 'gulp-plumber';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminWebp from 'imagemin-webp';
import extReplace from 'gulp-ext-replace';

const imgMin = () =>
  src('app/img/**/*.{png,jpg,svg}')
    .pipe(plumber())
    .pipe(imagemin([imageminPngquant(), imageminMozjpeg(), imagemin.svgo()]))
    .pipe(dest('dist/img'));

const imgMinWebp = () =>
  src('app/img/**/*.{png,jpg}')
    .pipe(imagemin([imageminWebp()]))
    .pipe(extReplace('.webp'))
    .pipe(dest('dist/img'));

const imgMinAll = series(imgMin, imgMinWebp);

export default imgMinAll;
