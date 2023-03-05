import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminGifsicle from "imagemin-gifsicle";
import imageminSvgo from "imagemin-svgo";

await imagemin(["assets/*.{jpg,png,gif,svg}"], {
  destination: "src/images",
  plugins: [
    imageminMozjpeg({ quality: 75 }),
    imageminPngquant(),
    imageminGifsicle(),
    imageminSvgo(),
  ],
});
