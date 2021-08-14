import { load } from "./loader";
import { domain, baiduMatchList, aliyunMatchList } from "./common/const";

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

function check_domain(domain: string): string {
  if (baiduMatchList.includes(domain)) {
    return "baidu";
  } else if (aliyunMatchList.includes(domain)) {
    return "aliyun";
  } else {
    return "";
  }
}

load(check_domain(domain));
