/*
 * @Author: mengzonefire
 * @Date: 2022-10-20 10:36:43
 * @LastEditTime: 2022-12-24 10:57:23
 * @LastEditors: mengzonefire
 * @Description: 旧版度盘界面loader入口: https://pan.baidu.com/disk/home?stayAtHome=true
 */

import { TAG, version } from "@/common/const";
import {
  setGetBdstoken,
  setGetSelectedFileList,
  setRefreshList,
  swalInstance,
} from "../common/const";
import { getSelectedFileListLegacy } from "@/common/utils";

const htmlTagLegacy = "div.tcuLAu"; // 旧版界面秒传按钮的html父对象
const htmlBtnRapidLegacy = // 旧版界面秒传按钮的html元素
  '<a class="g-button g-button-blue" id="bdlink_btn" title="秒传链接" style="display: inline-block;""><span class="g-button-right"><em class="icon icon-disk" title="秒传链接提取"></em><span class="text" style="width: auto;">秒传链接</span></span></a>';
const htmlBtnGenLegacy = // 旧版界面秒传生成按钮的html元素
  '<a class="g-button" id="gen_bdlink_btn"><span class="g-button-right"><em class="icon icon-share"></em><span class="text" style="width: auto;">生成秒传</span></span></a>';

export default function installLegacy() {
  console.info("%s version: %s DOM方式安装", TAG, version);
  setRefreshList(() => {
    // 旧版界面, 调用原生方法刷新文件列表, 无需重新加载页面
    unsafeWindow
      .require("system-core:system/baseService/message/message.js")
      .trigger("system-refresh");
  });
  setGetSelectedFileList(getSelectedFileListLegacy);
  setGetBdstoken(() => unsafeWindow.locals.get("bdstoken"));
  addBtn(); // DOM添加秒传按钮
  addGenBtn(); // DOM添加生成按钮
  $(document).on("click", "#bdlink_btn", () => {
    swalInstance.inputView();
  }); // 绑定秒传按钮事件
  $(document).on("click", "#gen_bdlink_btn", () => {
    swalInstance.generatebdlinkTask.reset();
    swalInstance.checkUnfinish();
  }); // 绑定生成按钮事件
}

function getSystemContext() {
  return unsafeWindow.require("system-core:context/context.js")
    .instanceForSystem;
}

function addGenBtn() {
  let listTools = getSystemContext().Broker.getButtonBroker("listTools");
  if (listTools && listTools.$box)
    $(listTools.$box).children("div").after(htmlBtnGenLegacy);
  else setTimeout(addGenBtn, 300);
}

function addBtn() {
  if ($(htmlTagLegacy).length) $(htmlTagLegacy).append(htmlBtnRapidLegacy);
  else setTimeout(addBtn, 100);
}
