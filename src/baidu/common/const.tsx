import { doc, linkStyle } from "@/common/const";
import Swalbase from "@/common/swalBase";
import GeneratebdlinkTask from "./GeneratebdlinkTask";
import RapiduploadTask from "./RapiduploadTask";

const host = location.host;
export const rapid_url = `https://${host}/api/rapidupload`;
export const create_url = `https://${host}/rest/2.0/xpan/file?method=create`;
export const list_url = `https://${host}/rest/2.0/xpan/multimedia?method=listall&order=name&limit=10000`;
// 已知api有限制: limit字段(即获取的文件数)不能大于10000, 否则直接返回错误
export const meta_url2 = `https://${host}/rest/2.0/xpan/multimedia?method=filemetas&dlink=1&fsids=`;
export const pcs_url =
  "https://pcs.baidu.com/rest/2.0/pcs/file?app_id=778750&method=download";
export const UA =
  "netdisk;2.2.51.6;netdisk;10.0.63;PC;android-android;QTP/1.0.32.2"; // 自定义User-Agent
export const illegalPathPattern = /[\\":*?<>|]/; // 匹配路径中的非法字符
export var getBdstoken: () => string; // 获取bdstoken的实现
export function setGetBdstoken(func: () => string) {
  getBdstoken = func;
}
export var refreshList: () => void; // 刷新文件列表的实现
export function setRefreshList(func: () => void) {
  refreshList = func;
}
export var getSelectedFileList: () => any; // 获取选中的文件列表的实现
export function setGetSelectedFileList(func: () => any) {
  getSelectedFileList = func;
}
export const swalInstance = new Swalbase(
  new RapiduploadTask(),
  new GeneratebdlinkTask()
);

export const htmlTagNew = "div.nd-file-list-toolbar__actions"; // 新版界面秒传按钮的html父对象
export const htmlTagNew2 = "div.wp-s-agile-tool-bar__header"; // 22.5.24: 新版界面新增的一个父对象
export const htmlTagLegacy = "div.tcuLAu"; // 旧版界面秒传按钮的html父对象
export const htmlBtnRapidNew = // 新版界面秒传按钮的html元素
  '<button id="bdlink_btn" style="margin-left: 8px;" class="mzf_new_btn"></i><span>秒传</span></button>';
export const htmlBtnGenNew = // 新版界面秒传生成按钮的html元素
  '<button id="gen_bdlink_btn" style="margin-left: 8px;" class="mzf_new_btn"></i><span>生成秒传</span></button>';
export const htmlBtnRapidLegacy = // 旧版界面秒传按钮的html元素
  '<a class="g-button g-button-blue" id="bdlink_btn" title="秒传链接" style="display: inline-block;""><span class="g-button-right"><em class="icon icon-disk" title="秒传链接提取"></em><span class="text" style="width: auto;">秒传链接</span></span></a>';
export const htmlBtnGenLegacy = // 旧版界面秒传生成按钮的html元素
  '<a class="g-button" id="gen_bdlink_btn"><span class="g-button-right"><em class="icon icon-share"></em><span class="text" style="width: auto;">生成秒传</span></span></a>';

export function baiduErrno(errno: number) {
  switch (errno) {
    case -6:
      return "认证失败(尝试刷新页面/重新登录度盘账号)";
    case -7:
      return "秒传链接内的文件名/转存路径 包含非法字符, 请尝试更改";
    case -8:
      return "路径下存在同名文件";
    case 400:
      return "请求错误(尝试使用最新版Chrome浏览器/更新油猴插件)";
    case 403:
      return `接口限制访问(请参考<a href="${doc.shareDoc}" ${linkStyle}>分享教程</a>)`;
    case 31190:
    case 404:
      return `秒传未生效(请参考<a href="${doc.shareDoc}" ${linkStyle}>分享教程</a>)`;
    case 2:
      return "转存失败(尝试重新登录度盘账号/更换或重装浏览器)";
    case 2333:
      return '秒传链接内的文件名错误, 不能含有字符\\":*?<>|, 且不能是"/"(空文件名)';
    case -10:
      return "网盘容量已满";
    case 514:
      return `请求失败(请参考<a href="${doc.shareDoc}" ${linkStyle}>分享教程</a>)`;
    case 1919:
      return `文件已被和谐(请参考<a href="${doc.shareDoc}" ${linkStyle}>分享教程</a>)`;
    case 996:
      return `md5获取失败(请参考<a href="${doc.shareDoc}" ${linkStyle}>分享教程</a>)`;
    case 500:
    case 502:
    case 503:
      return `服务器错误(请参考<a href="${doc.shareDoc}" ${linkStyle}>分享教程</a>)`;
    case 909:
      return "路径不存在/文件已损坏";
    case 900:
      return "路径为文件夹, 不支持生成秒传";
    case 901:
      return "包含的文件数量超出限制(1w个)";
    default:
      return "未知错误";
  }
} // 自定义百度api返回errno的报错
