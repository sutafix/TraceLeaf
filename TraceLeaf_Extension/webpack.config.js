


const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    youtube: "./src/sites/youtube.js",
    twitch: "./src/sites/twitch.js",
    gmail: "./src/sites/gmail.js",
    openai: "./src/sites/openai.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
