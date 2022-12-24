/*
 * @Author: mengzonefire
 * @Date: 2022-12-12 10:58:59
 * @LastEditTime: 2022-12-24 10:57:12
 * @LastEditors: mengzonefire
 * @Description: 同步空间loader入口: https://pan.baidu.com/disk/synchronization#
 */

import { TAG, version } from "@/common/const";
import {
  setGetBdstoken,
  setGetSelectedFileList,
  setRefreshList,
  swalInstance,
} from "../common/const";
import { getSelectedFileListNew } from "@/common/utils";

const htmlTagNew = "div.nd-btn-group > span";
const htmlBtnRapidNew =
  '<button id="bdlink_btn" type="button" class="u-button is-round is-has-icon" style="background: #06a7ff;color: #fff;"><span><i class="iconfont icon-copy"></i><span class=" nd-file-list-toolbar-action-item-text">秒传</span></span></button>';
// const htmlBtnGenNew =
//   '<button id="gen_bdlink_btn" type="button" class="u-button is-round is-has-icon" style="margin-left: 8px;background: #06a7ff;color: #fff;"><span><i class="iconfont icon-copy"></i><span class=" nd-file-list-toolbar-action-item-text">生成秒传</span></span></button>';

export default function installSync() {
  console.info("%s version: %s DOM方式安装", TAG, version);
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
      document.querySelector(".nd-main-list, .nd-new-main-list").__vue__.yunData
        .bdstoken
  );
  $(document).on("click", "#bdlink_btn", () => {
    swalInstance.inputView();
  }); // 绑定转存秒传按钮事件
  $(document).on("click", "#gen_bdlink_btn", () => {
    swalInstance.generatebdlinkTask.reset();
    swalInstance.checkUnfinish();
  }); // 绑定生成秒传按钮事件
  addBtn();
}

function addBtn() {
  // 轮询添加按钮, 防止新版页面重复init时, 将按钮覆盖
  let target = $(htmlTagNew);
  if (target.length && !$("#bdlink_btn").length) target.append(htmlBtnRapidNew);
  // target.append(htmlBtnRapidNew, htmlBtnGenNew);
  // 同步页中的文件使用另一种的接口获取dlink, 故暂不添加生成功能
  setTimeout(addBtn, 500);
}
