import { TAG, version } from "@/common/const";
import { htmlBtnGenNew, htmlTagNew2, swalInstance } from "../common/const";
import { htmlBtnRapidNew, htmlTagNew } from "@/baidu/common/const";

export default function installNew() {
  console.info("%s version: %s DOM方式安装", TAG, version);
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
