import { load } from "./loader";
import { domain_baidu_list, domain, domain_aliyun_list, loc_baidu_blacklist, loc_url } from "./common/const";

function check_backlist(loc: string, blacklist: Array<string>) {
    for (let match_str of blacklist) {
        if (loc.match(new RegExp(match_str))) {
            // in black list
            return true;
        }
        // not in black list
        return false;
    }
}

function check_domain() {
    if (domain_baidu_list.includes(domain) && !check_backlist(loc_url, loc_baidu_blacklist)) { return 'baidu'; }
    else if (domain_aliyun_list.includes(domain)) { return 'aliyun'; }
    else { return null; }
}

load(check_domain());