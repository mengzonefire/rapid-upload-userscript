import "./app.css"; // 加载自定义样式
import { loaderBaidu } from "./baidu/loader";
import { injectStyle } from "./common/injectStyle";
import { showAlert } from "./common/utils";
import {
  appError,
  Base64,
  SparkMD5,
  Swal,
} from "./common/const";

/**
 * @description: 主函数入口
 */
function app(): void {
  // 检查外部依赖是否加载完整
  if (Base64 && $ && SparkMD5 && Swal) {
    Base64.extendString();
    injectStyle();
    loaderBaidu();
  } else {
    showAlert(appError.missDepend); // 缺少依赖, 弹窗提示
  }
}

app();
