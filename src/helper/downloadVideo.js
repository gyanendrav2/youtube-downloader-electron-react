const fs = require("fs");
var path = require("path");

export const downloadVideo = (result, name) => {
   
    var DOWNLOAD_DIR = path.join(
      process.env.HOME || process.env.USERPROFILE,
      "downloads/ytdownloader/"
    );
    if (!fs.existsSync(DOWNLOAD_DIR)) {
      fs.mkdirSync(DOWNLOAD_DIR);
    }
    var file_path = path.join(DOWNLOAD_DIR, `${name.replace(/[^a-zA-Z0-9]/g, '')}.mp4`);
    console.log(file_path)
    var file = fs.createWriteStream(file_path);
    result.pipe(file);
    console.log(result.pipe(file))
  };