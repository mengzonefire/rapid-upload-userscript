import { locUrl, baiduNewPage, updateInfoVer } from "@/common/const";
import initQueryLink from "@/common/initQueryLink";
import { hook, install } from "./legacyPage/loader";
import installNew from "./newPage/loader";
import registerPlugin from "./legacyPage/registerPlugin";
import { swalInstance } from "./common/const";
import { getbdstoken } from "@/common/utils";

export function loaderBaidu(): void {
  getbdstoken();
  if (locUrl.indexOf(baiduNewPage) !== -1) {
    // 添加swal参数以防止新版界面下的body样式突变
    swalInstance.swalArgs = { heightAuto: false, scrollbarPadding: false };
    installNew();
  } // 新版界面loader入口
  else {
    install();
    hook("system-core:pluginHub/register/register.js", registerPlugin);
  } // 旧版界面loader入口

  let bdlink = initQueryLink();
  if (bdlink) {
    // 解析到秒传链接, 弹出转存窗口
    window.addEventListener("DOMContentLoaded", () => {
      swalInstance.inputView({ inputValue: bdlink });
    });
  } else if (!GM_getValue(`${updateInfoVer}_no_first`))
    swalInstance.updateInfo(() => {
      GM_setValue(`${updateInfoVer}_no_first`, true);
    }); // 检查是否首次运行, 若是弹出更新信息窗口
} // 百度秒传脚本主函数入口
