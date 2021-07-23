import { loader_aliyun } from "./aliyun/loader";
import { loader_baidu } from "./baidu/loader";

export function load(app_name) {
    if (!app_name) { return; }
    else if (app_name === 'baidu') { loader_baidu(); }
    else if (app_name === 'aliyun') { loader_aliyun(); }
}