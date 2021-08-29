import { TAG } from "@/common/const";
import { swalInstance } from "../common/const";
import { htmlBtnRapid, htmlTag } from "./const";

export default function installNew () {
    // 添加按钮并绑定事件 (新版页面目前还未实现秒传生成功能, 故只添加转存按钮)
    jQuery(function() {
        console.info("%s DOM方式安装，若失效请报告。", TAG);
        $(htmlTag).append(htmlBtnRapid);
        $(document).on("click", "#bdlink_btn", function () {
            swalInstance.inputView();
          }); // 绑定转存秒传按钮事件
     })
}