import {
  locUrl,
  baiduNewPage,
  updateInfoVer,
  donateVer,
  feedbackVer,
} from "@/common/const";
import initQueryLink from "@/common/initQueryLink";
import { hook, install } from "./legacyPage/loader";
import installNew from "./newPage/loader";
import registerPlugin from "./legacyPage/registerPlugin";
import { swalInstance } from "./common/const";
import { getbdstoken } from "@/common/utils";

export function loaderBaidu(): void {
  getbdstoken();

  if (locUrl.indexOf(baiduNewPage) != -1) {
    // 添加swal参数以防止新版界面下的body样式突变
    swalInstance.swalArgs = { heightAuto: false, scrollbarPadding: false };
    installNew();
  } // 新版界面loader入口
  else {
    install();
    hook("system-core:pluginHub/register/register.js", registerPlugin);
  } // 旧版界面loader入口

  // 开始解析url中的秒传链接
  let bdlink = initQueryLink();
  if (bdlink) {
    // 解析到秒传链接, 弹出转存窗口
    window.addEventListener("DOMContentLoaded", () => {
      swalInstance.inputView({ inputValue: bdlink });
    });
  } else if (!GM_getValue(`${updateInfoVer}_no_first`))
    window.addEventListener("DOMContentLoaded", () => {
      swalInstance.updateInfo(() => {
        GM_setValue(`${updateInfoVer}_no_first`, true);
      });
    }); // 检查是否首次运行, 若是则弹出更新信息窗口

  // 预先绑定好自定义按钮事件
  $(document).on("click", "#kill_donate", function () {
    GM_setValue(`${feedbackVer}_kill_donate`, true);
    $("#mzf_donate").remove();
  }); // 赞助提示 "不再显示" 按钮
  $(document).on("click", "#kill_feedback", function () {
    GM_setValue(`${donateVer}_kill_feedback`, true);
    $("#mzf_feedback").remove();
  }); // 反馈提示 "不再显示" 按钮
  $(document).on("click", "#check_md5_btn", swalInstance.checkMd5); // 测试秒传按钮
} // 百度秒传脚本主函数入口
