import { TAG } from "@/common/const";
import { swalInstance } from "../common/const";
import {
  htmlBtnRapidLegacy,
  htmlBtnGenLegacy,
  htmlTagLegacy,
} from "@/baidu/common/const";

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

export default function installlegacy() {
  console.info("%s DOM方式安装，若失效请报告。", TAG);
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
