const WebpackUserscript = require("webpack-userscript");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src", "app.tsx"),
  externals: {
    sweetalert2: "Swal",
    "js-base64": "Base64",
    "spark-md5": "SparkMD5",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  output: {
    filename: "秒传连接提取.user.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "./tsconfig.json"),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
  },
  plugins: [
    // 生成userscript header信息
    new WebpackUserscript({
      headers: {
        name: "秒传链接提取",
        "name:en": `[name]`,
        version: `[version]`,
        author: `[author]`,
        license: "MIT",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVR4AWL4//8/RRjO8Iucx+noO0O2qmlbUEnt5r3Juas+hsQD6KaG7dqCKPgx72Pe9GIY27btZBrbtm3btm0nO12D7tVXe63jqtqqU/iDw9K58sEruKkngH0DBljOE+T/qqx/Ln718RZOFasxyd3XRbWzlFMxRbgOTx9QWFzHtZlD+aqLb108sOAIAai6+NbHW7lUHaZkDFJt+wp1DG7R1d0b7Z88EOL08oXwjokcOvvUxYMjBFCamWP5KjKBjKOpZx2HEPj+Ieod26U+dpg6lK2CIwTQH0oECGT5eHj+IgSueJ5fPaPg6PZrz6DGHiGAISE7QPrIvIKVrSvCe2DNHSsehIDatOBna/+OEOgTQE6WAy1AAFiVcf6PhgCGxEvlA9QngLlAQCkLsNWhBZIDz/zg4ggmjHfYxoPGEMPZECW+zjwmFk6Ih194y7VHYGOPvEYlTAJlQwI4MEhgTOzZGiNalRpGgsOYFw5lEfTKybgfBtmuTNdI3MrOTAQmYf/DNcAwDeycVjROgZFt18gMso6V5Z8JpcEk2LPKpOAH0/4bKMCAYnuqm7cHOGHJTBRhAEJN9d/t5zCxAAAAAElFTkSuQmCC",
        namespace: "moe.cangku.mengzonefire",
        supportURL: `https://github.com/mengzonefire/rapid-upload-userscript/issues`,
        homepageURL: `[homepage]`,
        contributionURL: "https://afdian.net/@mengzonefire",
        description: `[description]`,
        compatible: [
          "firefox Violentmonkey",
          "firefox Tampermonkey",
          "chrome Violentmonkey",
          "chrome Tampermonkey",
        ],
        match: [
          "*://pan.baidu.com/disk/home*",
          "*://pan.baidu.com/disk/main*",
          "*://yun.baidu.com/disk/home*",
        ],
        grant: [
          "GM_setValue",
          "GM_getValue",
          "GM_deleteValue",
          "GM_setClipboard",
          "GM_getResourceText",
          "GM_addStyle",
        ],
        resource:
          "swalCss https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css",
        require: [
          "https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js",
          "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js",
          "https://cdn.staticfile.org/spark-md5/3.0.0/spark-md5.min.js",
          "https://cdn.jsdelivr.net/npm/js-base64",
        ],
        "run-at": "document-start",
        connect: "*",
      },
      pretty: false,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          // 以下四项为禁用代码压缩 + 不压缩标识符
          mangle: false,
          compress: false,
          keep_fnames: true,
          keep_classnames: true,
          format: {
            // 输出格式化, 防止在greasyfork上被举报为最小化代码
            beautify: true,
            // 删除注释
            comments: false,
          },
        },
      }),
    ],
  },
};
