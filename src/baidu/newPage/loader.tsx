/*
 * @Author: mengzonefire
 * @Date: 2022-10-20 10:36:43
 * @LastEditTime: 2023-02-14 03:53:02
 * @LastEditors: mengzonefire
 * @Description: 新版度盘界面loader入口: https://pan.baidu.com/disk/main
 */

import { TAG, version } from "@/common/const";
import {
  setGetBdstoken,
  setGetSelectedFileList,
  setRefreshList,
  swalInstance,
} from "../common/const";
import { getSelectedFileListNew } from "@/common/utils";

const htmlTagNew = "div.nd-file-list-toolbar__actions"; // 新版界面秒传按钮的html父对象
const htmlTagNew2 = "div.wp-s-agile-tool-bar__header"; // 22.5.24: 新版界面新增的一个父对象
const htmlBtnRapidNew = // 新版界面秒传按钮的html元素
  '<button id="bdlink_btn" class="mzf_new_btn"></i><span>秒传</span></button>';
const htmlBtnGenNew = // 新版界面秒传生成按钮的html元素
  '<button id="gen_bdlink_btn" class="mzf_new_btn"></i><span>生成秒传</span></button>';

export default function installNew() {
  console.info("%s version: %s DOM方式安装", TAG, version);
  swalInstance.swalGlobalArgs = {
    heightAuto: false,
    scrollbarPadding: false,
  }; // 添加swal参数以防止新版界面下的body样式突变
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
  if (!target.length) target = $(htmlTagNew2);
  if (target.length && !$("#bdlink_btn").length)
    target.append(htmlBtnRapidNew, htmlBtnGenNew);
  setTimeout(addBtn, 500);
}
