import "./app.css";
import { loader } from "./loader";
import {
  domain,
  baiduMatchList,
  aliyunMatchList,
  dependAlert,
} from "./common/const";
import { injectStyle } from "./common/injectStyle";

// function check_backlist(loc: string, blacklist: Array<string>) {
//     for (let match_str of blacklist) {
//         if (loc.match(new RegExp(match_str))) {
//             // in black list
//             return true;
//         }
//         // not in black list
//         return false;
//     }
// }

// 检查外部依赖
function checkDepend(): boolean {
  if (Base64 && $ && SparkMD5 && Swal) {
    return true;
  }
  return false;
}

function checkDomain(domain: string): string {
  if (baiduMatchList.includes(domain)) {
    return "baidu";
  } else if (aliyunMatchList.includes(domain)) {
    return "aliyun";
  } else {
    return "";
  }
}

if (checkDepend()) {
  injectStyle();
  loader(checkDomain(domain));
} else {
  alert(dependAlert);
}
