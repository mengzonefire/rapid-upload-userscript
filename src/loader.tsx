import { loaderAliyun } from "./aliyun/loader";
import { loaderBaidu } from "./baidu/loader";

export function loader(appName: string) {
  let myLoader = null;
  if (appName === "baidu") {
    myLoader = loaderBaidu;
  } else if (appName === "aliyun") {
    myLoader = loaderAliyun;
  }
  window.addEventListener("DOMContentLoaded", myLoader);
}
