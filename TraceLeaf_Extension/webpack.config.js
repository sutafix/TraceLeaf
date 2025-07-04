


const path = require("path");

module.exports = {
  mode: "development",
  devtool: false, 
  entry: {
    youtube: "./src/sites/youtube.js",
    twitch: "./src/sites/twitch.js",
    gmail: "./src/sites/gmail.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
