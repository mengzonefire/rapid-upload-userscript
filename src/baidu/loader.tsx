import {
  locUrl,
  baiduNewPage,
  baiduSyncPage,
  baiduSharePage,
  updateInfoVer,
  donateVer,
  feedbackVer,
} from "@/common/const";
import { parseQueryLink } from "@/common/duParser";
import installNew from "./newPage/loader";
import installLegacy from "./legacyPage/loader";
import { swalInstance } from "./common/const";
import installSync from "./syncPage/loader";
import installShare from "./sharePage/loader";

// 主函数入口
export function loaderBaidu(): void {
  let load = () => {
    if (locUrl.includes(baiduNewPage)) installNew(); // 新版界面loader入口
    else if (locUrl.includes(baiduSharePage))
      installShare(); // 分享页loader入口
    else if (locUrl.includes(baiduSyncPage))
      installSync(); // 同步空间loader入口
    else installLegacy(); // 旧版界面loader入口

    // 进入页面后的弹窗任务
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
    $(document).on("click", "#copy_fail_list", (btn) => {
      let listText = "";
      for (let item of swalInstance.parseResult.failList)
        listText += item.path + "\n";
      GM_setClipboard(listText);
      btn.target.innerText = "复制成功";
    }); // 失败文件列表复制
    $(document).on("click", "#copy_success_list", (btn) => {
      let listText = "";
      for (let item of swalInstance.parseResult.successList)
        listText += item.path + "\n";
      GM_setClipboard(listText);
      btn.target.innerText = "复制成功";
    }); // 成功文件列表复制
    $(document).on("click", "#copy_fail_branch_list", (btn) => {
      let ele = $(btn.target);
      GM_setClipboard(
        ele
          .parents("details.mzf_details_branch")
          .next()[0]
          .innerText.replace(/\n\n/g, "\n")
      );
      btn.target.innerText = "复制成功";
    }); // 失败文件分支列表复制
  };

  // 绑定入口函数到dom事件
  if (["interactive", "complete"].includes(document.readyState)) load();
  else window.addEventListener("DOMContentLoaded", load);
}
