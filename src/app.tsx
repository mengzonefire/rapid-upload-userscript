import { injectStyle } from "./common/injectStyle";
import { showAlert } from "./common/utils";
import { appError } from "./common/const";

/**
 * @description: 主函数入口
 */
function app(): void {
  // 检查外部依赖是否加载完整
  if (
    [typeof Base64, typeof $, typeof SparkMD5, typeof Swal].indexOf(
      "undefined"
    ) !== -1
  )
    showAlert(appError.missDepend);
  // 缺少依赖, 弹窗提示
  else {
    Base64.extendString();
    injectStyle();
  }
}

// 广告拦截插件会导致脚本报错跳出, 网页卡死, 故加入异常处理
try {
  app();
} catch (error) {
  console.log(error);
}
