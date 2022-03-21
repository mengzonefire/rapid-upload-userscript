# rapid-upload-userscript

> 秒传链接提取脚本, 使用typescript + webpack重构

> 用于提取和生成百度网盘秒传链接, 详见 [脚本介绍页](https://github.com/mengzonefire/rapid-upload-userscript/blob/main/homePage.md)

## Usage

安装脚本可参考 [安装教程](https://mengzonefire.code.misakanet.cn/rapid-upload-userscript-doc/install-userscript/)

## Build Setup

``` bash
# install dependencies
npm install

# build
npm run build
```

## TODO
1. 设置页添加配置项 “禁止闪烁”，在弹窗时阻止背景变暗
2. 修改弹窗逻辑, 多步操作在单个弹窗内刷新, 不再重复弹窗
3. 设置页添加配置项 “默认转存路径” 用于跳过转存时的路径输入操作
