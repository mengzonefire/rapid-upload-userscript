import { loaderAliyun } from "./aliyun/loader";
import { loaderBaidu } from "./baidu/loader";

export function loader(appName: string) {
  if (appName === "baidu") {
    loaderBaidu();
  } else if (appName === "aliyun") {
    loaderAliyun();
  }
}
