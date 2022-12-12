import { TAG, version } from "@/common/const";
import { setGetBdstoken, swalInstance } from "../common/const";

const htmlBtnGenShare = // 分享页的秒传生成按钮html元素
  '<a id="gen_bdlink_btn_sharePage" title="生成秒传" class="g-button g-button-blue-large" style="margin-right: 5px;margin-left: 5px;"> <span class="g-button-right"> <em class="icon icon-share" style="color:#ffffff" title="生成秒传"></em> <span class="text" style="width: auto;">生成秒传</span> </span> </a>';
const htmlTagSahre = "[node-type=qrCode]";

export default function installShare() {
  console.info("%s version: %s DOM方式安装", TAG, version);
  setGetBdstoken(() => unsafeWindow.locals.get("bdstoken"));
  addBtn();
  $(document).on("click", "#gen_bdlink_btn_sharePage", () => {
    swalInstance.generatebdlinkTask.reset();
    swalInstance.generatebdlinkTask.isSharePage = true;
    swalInstance.genFileWork(false, false);
  }); // 绑定生成按钮事件
}

function addBtn() {
  if ($(htmlTagSahre).length) $(htmlTagSahre).before(htmlBtnGenShare);
  else setTimeout(addBtn, 100);
}
