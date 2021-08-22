import { locUrl, baiduNewPage } from "src/common/const";
import injectMenuLegacy from "./legacyPage/injectMenu";
import initQueryLink from "src/common/initQueryLink";
import { hook } from "./legacyPage/loader";
export function loaderBaidu(): void {
  if (locUrl.indexOf(baiduNewPage) !== -1) {
  } // 新版界面
  else {
    hook("disk-system:widget/system/uiRender/menu/listMenu.js", injectMenuLegacy);
    hook("system-core:pluginHub/register/register.js", registerPlugin);
    hook("system-core:system/uiService/list/list.js", initQueryLink);
  } // 旧版界面
} // 百度秒传脚本主函数入口
