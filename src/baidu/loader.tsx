import { locUrl, baiduNewPage } from "@/common/const";
import initQueryLink from "@/common/initQueryLink";
import { hook, install } from "./legacyPage/loader";
import registerPlugin from "./legacyPage/registerPlugin";

export function loaderBaidu(): void {
  if (locUrl.indexOf(baiduNewPage) !== -1) {
  } // 新版界面loader入口
  else {
    install();
    hook("system-core:pluginHub/register/register.js", registerPlugin);
  } // 旧版界面loader入口

  let bdlink = initQueryLink();
  if (bdlink){
    // 解析到秒传链接, 弹出转存窗口
  }
  else {
    // 检查是否首次运行, 若是弹出更新信息窗口
  }
} // 百度秒传脚本主函数入口
