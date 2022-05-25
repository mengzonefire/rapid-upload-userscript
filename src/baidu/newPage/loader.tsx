import { TAG } from "@/common/const";
import { htmlBtnGenNew, swalInstance } from "../common/const";
import { htmlBtnRapidNew, htmlTagNew } from "@/baidu/common/const";

export default function installNew() {
  console.info("%s DOM方式安装，若失效请报告。", TAG);
  $(htmlTagNew).append(htmlBtnRapidNew, htmlBtnGenNew);
  $(document).on("click", "#bdlink_btn", () => {
    swalInstance.inputView();
  }); // 绑定转存秒传按钮事件
  $(document).on("click", "#gen_bdlink_btn", () => {
    swalInstance.generatebdlinkTask.reset();
    swalInstance.checkUnfinish();
  }); // 绑定生成秒传按钮事件
}
