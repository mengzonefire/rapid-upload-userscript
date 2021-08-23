export default function registerPlugin() {

  window.define(
    "function-widget:mengzonefire/rapidupload-userscript.js",
    (_require: any, _exports: any) => {
      // 添加秒传按钮的代码入口
    }
  );

  window.manifest.push({
    name: "秒传链接提取",
    group: "moe.cangku.mengzonefire",
    version: "1.0",
    type: "1",
    description: "用于转存百度网盘秒传链接",
    buttons: [
      {
        conditions: { pageModule: "list" },
        index: 5,
        disabled: "none",
        enable: true,
        color: "blue blue-upload",
        icon: "icon-disk",
        title: "秒传链接",
        name: "rapidupload",
      }, // 秒传转存按钮, 仅在文件列表视图的上方工具栏显示
      {
        conditions: {
          excludeDirType: "sourceHolder,cardHolder,shareHolder",
        },
        index: 1,
        title: "生成秒传",
        icon: "icon-share",
        name: "generateBdlink",
      }, // 秒传生成按钮, 选中文件/目录后在上方工具栏显示
    ],
    contextMenu: [
      {
        conditions: {
          excludeDirType: "sourceHolder,cardHolder,shareHolder",
          pageModule: "list,share,search,category,searchGlobal",
        },
        index: 7,
        title: "生成秒传",
        keyboard: "G",
        disabled: "disable",
        name: "generateBdlink",
      }, // 秒传生成菜单, 在右键菜单显示
    ],
    preload: false,
    entranceFile: "function-widget:mengzonefire/rapidupload-userscript.js",
    pluginId: "moe.cangku.mengzonefire",
  });
}
