module.exports = {
    context: __dirname + "/src",
    entry: "./script.js",
    output: {
      path: __dirname + "/build",
      filename: "bundle.js"
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
    }
  }