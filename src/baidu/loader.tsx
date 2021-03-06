import {
  locUrl,
  baiduNewPage,
  updateInfoVer,
  donateVer,
  feedbackVer,
} from "@/common/const";
import { parseQueryLink } from "@/common/duParser";
import installNew from "./newPage/loader";
import installLegacy from "./legacyPage/loader";
import {
  setRefreshList,
  setGetSelectedFileList,
  setGetBdstoken,
  swalInstance,
} from "./common/const";
import {
  getSelectedFileListLegacy,
  getSelectedFileListNew,
} from "@/common/utils";

export function loaderBaidu(): void {
  let load = () => {
    if (locUrl.includes(baiduNewPage)) {
      // 添加swal参数以防止新版界面下的body样式突变
      swalInstance.swalGlobalArgs = {
        heightAuto: false,
        scrollbarPadding: false,
      };
      setRefreshList(() => {
        document
          .querySelector(".nd-main-list, .nd-new-main-list")
          .__vue__.reloadList();
      });
      setGetSelectedFileList(getSelectedFileListNew);
      setGetBdstoken(
        () =>
          document.querySelector(".nd-main-list, .nd-new-main-list").__vue__
            .yunData.bdstoken
      );
      installNew();
    } // 新版界面loader入口
    else {
      setRefreshList(() => {
        // 旧版界面, 调用原生方法刷新文件列表, 无需重新加载页面
        unsafeWindow
          .require("system-core:system/baseService/message/message.js")
          .trigger("system-refresh");
      });
      setGetSelectedFileList(getSelectedFileListLegacy);
      setGetBdstoken(() => unsafeWindow.locals.get("bdstoken"));
      installLegacy();
    } // 旧版界面loader入口

    let bdlink = parseQueryLink(locUrl); // 解析url中的秒传链接
    if (bdlink) {
      // 解析到秒传链接, 弹出转存窗口
      swalInstance.inputView(bdlink);
    } else if (!GM_getValue(`${updateInfoVer}_no_first`))
      // 检查是否首次运行, 若是则弹出更新信息窗口
      swalInstance.updateInfo(() => {
        GM_setValue(`${updateInfoVer}_no_first`, true);
      });

    // 预先绑定好按钮事件
    $(document).on("click", "#kill_donate", function () {
      GM_setValue(`${feedbackVer}_kill_donate`, true);
      $("#mzf_donate").remove();
    }); // 赞助提示 "不再显示" 按钮
    $(document).on("click", "#kill_feedback", function () {
      GM_setValue(`${donateVer}_kill_feedback`, true);
      $("#mzf_feedback").remove();
    }); // 反馈提示 "不再显示" 按钮
    $(document).on("click", "#check_md5_btn", () => {
      swalInstance.checkMd5();
    }); // 测试秒传按钮
  };
  if (["interactive", "complete"].includes(document.readyState)) load();
  else window.addEventListener("DOMContentLoaded", load);
} // 百度秒传脚本主函数入口
