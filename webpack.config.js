const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackUserscript = require("webpack-userscript");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
// const nodeExternals = require("webpack-node-externals");
const requireFunc =
  typeof __webpack_require__ === "function" ? __non_webpack_require__ : require; // 忽略源码中的require功能
module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src", "app.tsx"),
  externalsPresets: { node: true },
  // externals: [nodeExternals()],
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
        test: /\.html$/,
        use: [
          {
            loader: "text-loader",
          },
        ],
        exclude: /node_modules/,
      },
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
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "text-loader",
          },
          "sass-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "text-loader",
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // 生成userscript header信息
    new WebpackUserscript({
      headers: {
        name: "秒传链接提取",
        "name:en": `[name]`,
        version: `[version]`,
        author: `[author]`,
        license: `GPLv3`,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABBUlEQVR4AZTTJRBUURTH4TtDwXuPdPrgbhHXiksf3CPucRNScHd3d3d3uO9bKeu7b79+fun8Q17CNHyMMUqaiPE4fEyYVjjGNKnNwQ4lpgV8lManEfwfosLHEGPU1N3ZnAv4qlT+NiQ56uPWSjKBrztUSnIaB66sY1vgxgxoMXB5NbsCB9rxcB5fN2M5/16nCFxeS6YTezpzsB1Pu/C2O7/78/99eYBYHXh+gqdHObGIK4GHgevjVIt1AgAnhvE4cGe8euoHbizgYuD2RGgx8O0RpwIPRmsmJDGqcrANd3pLo/qVr03hUlcpfSwf0/vD3JwkPdPK5/zhkOz+/f1FIDv/RcnOAEjywH/DhgADAAAAAElFTkSuQmCC",
        namespace: "moe.cangku.mengzonefire",
        supportURL: `https://github.com/mengzonefire/rapid-upload-userscript/issues`,
        homepageURL: `[homepage]`,
        contributionURL: "https://afdian.net/@mengzonefire",
        description: `[description]`,
        "description:en":
          "input bdlink to get files or get bdlink for Baidu™ WebDisk.",
        compatible: [
          "firefox Violentmonkey",
          "firefox Tampermonkey",
          "chrome Violentmonkey",
          "chrome Tampermonkey",
          "edge Violentmonkey",
          "edge Tampermonkey",
        ],
        match: [
          "*://pan.baidu.com/disk/home*",
          "*://pan.baidu.com/disk/main*",
          "*://pan.baidu.com/disk/synchronization*",
          "*://pan.baidu.com/s/*",
          "*://yun.baidu.com/disk/home*",
          "*://yun.baidu.com/disk/main*",
          "*://yun.baidu.com/disk/synchronization*",
          "*://yun.baidu.com/s/*",
          "*://wangpan.baidu.com/disk/home*",
          "*://wangpan.baidu.com/disk/main*",
          "*://wangpan.baidu.com/disk/synchronization*",
          "*://wangpan.baidu.com/s/*",
        ],
        grant: [
          "GM_setValue",
          "GM_getValue",
          "GM_deleteValue",
          "GM_setClipboard",
          "GM_addStyle",
          "GM_xmlhttpRequest",
          "GM_registerMenuCommand",
          "unsafeWindow",
        ],
        "run-at": "document-body",
        connect: ["baidu.com", "baidupcs.com", "cdn.jsdelivr.net", "*"],
        downloadURL:
          "https://greasyfork.org/scripts/424574/code/%E7%A7%92%E4%BC%A0%E9%93%BE%E6%8E%A5%E6%8F%90%E5%8F%96.user.js",
        updateURL:
          "https://greasyfork.org/scripts/424574/code/%E7%A7%92%E4%BC%A0%E9%93%BE%E6%8E%A5%E6%8F%90%E5%8F%96.user.js",
        antifeature:
          'referral-link 23.4.5: 加了一个百度官方的网盘会员推广 (从那里开通可使作者获得佣金), 觉得碍眼可以点 "不再显示" 永久隐藏',
      },
      pretty: true,
    }),
  ],
  optimization: {
    minimize: false,
    // 完全禁用压缩(会导致下面的配置项全部失效), 防止在greasyfork上被举报为加密/最小化代码
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
