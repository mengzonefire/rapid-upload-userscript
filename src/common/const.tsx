export const updateInfoVer = "2.0.0"; // 更新信息的版本, 有些没必要提示的小更新就不加到更新提示里了
export const swalCssVer = "1.7.4"; // 由于其他主题的Css代码会缓存到本地, 故更新主题包版本(url)时, 需要同时更新该字串以刷新缓存
export const donateVer = "2.0.0"; // 用于检测可关闭的赞助提示的版本号
export const feedbackVer = "2.0.0"; // 用于检测可关闭的反馈提示的版本号
export const locUrl: string = location.href;
export const baiduNewPage = "pan.baidu.com/disk/main"; // 匹配新版度盘界面
export const TAG = "[秒传链接提取 by mengzonefire]";
export const homePage = "https://greasyfork.org/zh-CN/scripts/424574";
export const donatePage = "https://afdian.net/@mengzonefire";
export const Base64 = require("js-base64");
export const SparkMD5 = require("spark-md5");
export const Swal = require("sweetalert2");
export const ajaxError = 514; // 自定义ajax请求失败时的错误码(不能与http statusCode冲突)
export const extCssUrl = {
  Minimal:
    "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css",
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
  missDepend: "外部资源加载失败, 脚本无法运行, 请检查网络或更换DNS",
  SwalCssInvalid: `样式包加载错误, 请前往脚本页反馈F12控制台截图\n${homePage}`,
  SwalCssErrReq: "样式包加载失败, 弹出跨域访问窗口请选择允许",
  SwalCssBadReq: "样式包加载失败",
}; // 主程序异常
export const enum rapidTryflag {
  useUpperCaseMd5 = 0,
  useLowerCaseMd5 = 1,
  useRandomCaseMd5 = 2,
  useSaveFileV2 = 3,
} // 秒传转存 标识参数
export const enum genTryflag {
  useDlink1 = 0,
  useDlink2 = 1,
} // 秒传生成 标识参数
export interface FileInfo {
  path: string;
  isdir?: number;
  errno?: number;
  size?: number;
  md5?: string;
  md5s?: string;
  fs_id?: string;
  retry_996?: boolean;
} // 自定义文件信息数据结构
export const doc = {
  shareDoc: "https://shimo.im/docs/TZ1JJuEjOM0wnFDH",
  linkTypeDoc: "https://shimo.im/docs/hTCKJHPJRkp8PDR8",
}; // 各文档url
export const linkStyle =
  'class="mzf_link" rel="noopener noreferrer" target="_blank"';
export const btnStyle =
  'class="mzf_btn" rel="noopener noreferrer" target="_blank"';
export const bdlinkPattern = /[\?#]bdlink=([\da-zA-Z+/=]+)/; // b64可能出现的字符: 大小写字母a-zA-Z, 数字0-9, +, /, = (=用于末尾补位)
export const htmlCsdWarning =
  '<p>弹出跨域访问窗口时,请选择"<span style="color: red;">总是允许</span>"或"<span style="color: red;">总是允许全部</span>"</p><img style="max-width: 100%; height: auto" src="https://pic.rmb.bdstatic.com/bjh/763ff5014cca49237cb3ede92b5b7ac5.png">';
export const htmlCheckMd5 = `<p class="mzf_text">测试秒传, 可防止秒传失效<a id="check_md5_btn" class="mzf_btn"><span class="text" style="width: auto;">测试</span></a></p>`;
export const htmlDocument = `<p class="mzf_text">秒传无效/md5获取失败/防和谐等 可参考<a href="${doc.shareDoc}" ${linkStyle}><span class="text" style="width: auto;">分享教程</span></a></p>`;
export const htmlDonate = `<p id="mzf_donate" class="mzf_text">若喜欢该脚本, 可前往 <a href="${donatePage}" ${btnStyle}>赞助页</a> 支持作者<a id="kill_donate" class="mzf_btn">不再显示</a></p>`;
export const htmlFeedback = `<p id="mzf_feedback" class="mzf_text">若有任何疑问, 可前往 <a href="${homePage}" ${btnStyle}>脚本主页</a> 反馈<a id="kill_feedback" class="mzf_btn">不再显示</a></p>`;
