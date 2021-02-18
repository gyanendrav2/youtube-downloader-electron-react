import React from "react";
import "../assets/css/App.css";

const fs = require("fs");
const ytdl = require("ytdl-core");
var path = require("path");

function App() {
  const startDownload = () => {
    const result = ytdl("http://www.youtube.com/watch?v=aqz-KE-bpKQ");
    var DOWNLOAD_DIR = path.join(
      process.env.HOME || process.env.USERPROFILE,
      "downloads/ytdownloader/"
    );
    if (!fs.existsSync(DOWNLOAD_DIR)) {
      fs.mkdirSync(DOWNLOAD_DIR);
    }
    var file_path = path.join(DOWNLOAD_DIR, "video.mp4");
    var file = fs.createWriteStream(file_path);
    result.pipe(file);
  };
  return (
    <div>
      <button onClick={startDownload}>Download</button>
    </div>
  );
}

export default App;
