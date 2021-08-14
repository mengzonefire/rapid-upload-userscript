import { loaderAliyun } from "./aliyun/loader";
import { loaderBaidu } from "./baidu/loader";

export function load(appName: string) {
    if (!appName) { return; }
    else if (appName === 'baidu') { loaderBaidu(); }
    else if (appName === 'aliyun') { loaderAliyun(); }
}