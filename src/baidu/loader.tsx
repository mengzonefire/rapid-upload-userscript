import { locUrl, baiduNewPage } from "@/common/const";
import initQueryLink from "@/common/initQueryLink";
import { hook, install } from "./legacyPage/loader";
import installNew from "./newPage/loader";
import registerPlugin from "./legacyPage/registerPlugin";
import { swalInstance } from "./common/context";

export function loaderBaidu(): void {
  if (locUrl.indexOf(baiduNewPage) !== -1) {
    // 添加参数以防止新版界面下的body样式突变
    swalInstance.swalConfig = { heightAuto: false, scrollbarPadding: false };
    installNew();
  } // 新版界面loader入口
  else {
    install();
    hook("system-core:pluginHub/register/register.js", registerPlugin);
  } // 旧版界面loader入口

  let bdlink = initQueryLink();
  if (bdlink) {
    // 解析到秒传链接, 弹出转存窗口
    swalInstance.inputView();
  } else {
    // 检查是否首次运行, 若是弹出更新信息窗口
    swalInstance.updateInfo();
  }
} // 百度秒传脚本主函数入口
