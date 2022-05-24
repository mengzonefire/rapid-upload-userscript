import { injectStyle } from "./common/injectStyle";
import { Base64 } from "js-base64";
/**
 * @description: 主函数入口
 */
function app(): void {
  Base64.extendString();
  injectStyle();
}

// 广告拦截插件会导致脚本报错跳出, 网页卡死, 故加入异常处理
try {
  app();
} catch (error) {
  console.log(error);
}
