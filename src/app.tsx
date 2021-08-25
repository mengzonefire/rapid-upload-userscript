import "./app.css"; // 加载自定义样式
import { loaderAliyun } from "./aliyun/loader";
import { loaderBaidu } from "./baidu/loader";
import { injectStyle } from "./common/injectStyle";
import { showAlert } from "./common/utils";
import {
  domain,
  baiduMatchList,
  aliyunMatchList,
  appError,
  Base64,
  SparkMD5,
  Swal,
} from "./common/const";
export var moduleName = "";

/**
 * @description: 根据域名返回对应的模块名
 * @param {string} domain 当前访问的域名
 * @return {string} 模块名
 */
function checkDomain(domain: string): string {
  if (baiduMatchList.includes(domain)) {
    moduleName = "baidu";
  } else if (aliyunMatchList.includes(domain)) {
    moduleName = "aliyun";
  }
  return moduleName;
}

/**
 * @description: 加载阿里/百度对应的Loader模块
 * @param {string} moduleName
 */
function loader(moduleName: string): void {
  let myLoader = (): void => {};
  if (moduleName === "baidu") {
    myLoader = loaderBaidu;
  } else if (moduleName === "aliyun") {
    myLoader = loaderAliyun;
  }
  myLoader();
  // window.addEventListener("DOMContentLoaded", myLoader);
}

/**
 * @description: 主函数入口
 */
function app(): void {
  // 检查外部依赖是否加载完整
  if (Base64 && $ && SparkMD5 && Swal) {
    Base64.extendString();
    injectStyle();
    loader(checkDomain(domain));
  } else {
    showAlert(appError.missDepend); // 缺少依赖, 弹窗提示
  }
}

app();
