/*
 * @Author: mengzonefire
 * @Date: 2021-07-23 17:41:28
 * @LastEditTime: 2023-05-15 16:53:31
 * @LastEditors: mengzonefire
 * @Description: 存放各种全局常量对象
 */

export const version = "2.7.8"; // 当前版本号
export const updateDate = "23.5.15"; // 更新弹窗显示的日期
export const updateInfoVer = "2.7.5"; // 更新弹窗的版本, 没必要提示的非功能性更新就不弹窗了
export const swalCssVer = "1.7.4"; // 由于其他主题的Css代码会缓存到本地, 故更新主题包版本(url)时, 需要同时更新该字段以刷新缓存
export const donateVer = "2.6.4"; // 用于检测可关闭的赞助提示的版本号
export const feedbackVer = "2.6.4"; // 用于检测可关闭的反馈提示的版本号
export const referralVer = "2.6.4"; // 用于检测可关闭的推广提示的版本号
export const locUrl: string = location.href;
export const baiduNewPage = "baidu.com/disk/main"; // 匹配新版度盘界面
export const baiduSyncPage = "baidu.com/disk/synchronization"; // 匹配同步空间
export const baiduSharePage = "baidu.com/s/"; // 匹配分享页
export const TAG = "[秒传链接提取 by mengzonefire]";
export const homePage = "https://greasyfork.org/zh-CN/scripts/424574";
export const donatePage = "https://afdian.net/@mengzonefire";
export const referralPage = "https://snsyun.baidu.com/sl/eQlxlz8";
export const ajaxError = 514; // 自定义ajax请求失败时的错误码(不能与http statusCode冲突)
export const bdlinkPrefix = "https://pan.baidu.com/#bdlink="; // 一键秒传链接的前缀
export const commandList = ["set", "gen", "info"]; // 转存输入框内支持输入的命令
export const UA = "netdisk;"; // 自定义User-Agent
export const extCssUrl = {
  Default: "",
  Dark: "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@5/dark.min.css",
  "WordPress Admin":
    "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-wordpress-admin@5/wordpress-admin.min.css",
  "Material UI":
    "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-material-ui@5/material-ui.min.css",
  Bulma:
    "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bulma@5/bulma.min.css",
  "Bootstrap 4":
    "https://cdn.jsdelivr.net/npm/@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css",
}; // 各主题包对应的url
export const appError = {
  SwalCssInvalid: `样式包数据错误, 自动使用内置样式 (请点确定)`,
  SwalCssErrReq: `样式包加载失败, 自动使用内置样式 (请点确定), 错误代码: `,
  ClipboardPremissionErr:
    '使用 "监听剪贴板" 功能需要允许剪贴板权限!\n该功能只支持Chrome系/Edge/Opera浏览器, 不支持Firefox, 同时注意使用https访问页面 (http访问会导致浏览器直接禁止剪贴板权限)',
}; // 主程序异常
export const appWarning = {
  fastGenerateWarn:
    '使用 "极速生成" 功能请注意:\n优点:\n1. 极大幅度提高秒传生成速度\n2. 有效避免 "md5获取失败(#996)" "接口限制访问(#403)"\n缺点:\n1. 生成和谐文件秒传时大概率正常生成 (非极速生成则会报错#1919)\n2. 生成的秒传格式为简化版, 只保证最新版的 秒传脚本 和 秒传网页版 支持转存\n\n* 若开启后出现问题请根据设置页内的 "说明文档" 进行反馈',
}; // 主程序各功能警告/提醒
export const enum genTryflag {
  useDlink1 = 0,
  useDlink2 = 1,
} // 秒传生成 标识参数
const docPrefix =
  "https://mengzonefire.code.misakanet.cn/rapid-upload-userscript-doc/document";
const docPrefix2 =
  "https://xtsat.github.io/rapid-upload-userscript-doc/document";
export const doc = {
  shareDoc: `${docPrefix}/FAQ/错误代码`,
  linkTypeDoc: `${docPrefix}/Info/秒传格式`,
  bdlinkDoc: `${docPrefix}/秒传链接生成/一键秒传`,
  fastGenDoc: `${docPrefix}/秒传链接生成/极速生成`,
}; // 文档载点1
export const doc2 = {
  shareDoc: `${docPrefix2}/FAQ/错误代码`,
  linkTypeDoc: `${docPrefix2}/Info/秒传格式`,
  bdlinkDoc: `${docPrefix2}/秒传链接生成/一键秒传`,
  fastGenDoc: `${docPrefix2}/秒传链接生成/极速生成`,
}; // 文档载点2
export const linkStyle =
  'class="mzf_link" rel="noopener noreferrer" target="_blank"';
export const btnStyle =
  'class="mzf_btn" rel="noopener noreferrer" target="_blank"';
export const bdlinkPattern = /#bdlink=([\da-zA-Z+/=]+)/; // b64可能出现的字符: 大小写字母a-zA-Z, 数字0-9, +, /, = (=用于末尾补位)
export const htmlDocument = `<p class="mzf_text">秒传无效,防和谐等 可参考秒传文档<a href="${doc.shareDoc}" ${btnStyle}><span class="text" style="width: auto;">载点1</span></a><a href="${doc2.shareDoc}" ${btnStyle}><span class="text" style="width: auto;">载点2</span></a></p>`;
export const htmlDonate = `<p id="mzf_donate" class="mzf_text">若喜欢该脚本, 可前往 <a href="${donatePage}" ${linkStyle}>赞助页</a> 支持作者<a id="mzf_kill_donate" class="mzf_btn">不再显示</a></p>`;
export const htmlFeedback = `<p id="mzf_feedback" class="mzf_text">若有任何疑问, 可前往 <a href="${homePage}" ${linkStyle}>脚本主页</a> 反馈<a id="mzf_kill_feedback" class="mzf_btn">不再显示</a></p>`;
export const htmlReferral = `<p id="mzf_referral" class="mzf_text">(百度官方推广) <a href="${referralPage}" ${linkStyle}>优惠开通网盘会员</a><a id="mzf_kill_referral" class="mzf_btn">不再显示</a></p>`;
export const htmlAboutBdlink = `什么是一键秒传?: <a href="${doc.bdlinkDoc}" ${linkStyle}>文档载点1</a> <a href="${doc2.bdlinkDoc}" ${linkStyle}>文档载点2</a>`;
export const copyFailList =
  '<a id="copy_fail_list" class="mzf_btn2">复制列表</a>';
export const copyFailBranchList =
  '<a id="copy_fail_branch_list" class="mzf_btn2">复制列表</a>';
export const copySuccessList =
  '<a id="copy_success_list" class="mzf_btn2">复制列表</a>';
