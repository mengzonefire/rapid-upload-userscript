import { locUrl, baiduNewPage } from "@/common/const";
import registerPlugin from "./legacyPage/registerPlugin";
import initQueryLink from "@/common/initQueryLink";
import { hook, install } from "./legacyPage/loader";

export function loaderBaidu(): void {
  if (locUrl.indexOf(baiduNewPage) !== -1) {
  } // 新版界面
  else {
    install();
    hook("system-core:pluginHub/register/register.js", registerPlugin);
    hook("system-core:system/uiService/list/list.js", initQueryLink);
  } // 旧版界面
} // 百度秒传脚本主函数入口
