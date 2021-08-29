import { doc, linkStyle } from "@/common/const";
import Swalbase from "@/common/SwalBase";
import GeneratebdlinkTask from "./GeneratebdlinkTask";
import RapiduploadTask from "./RapiduploadTask";

export const rapid_url = "/api/rapidupload";
export const bdstoken_url = "/api/gettemplatevariable";
export const create_url = "/rest/2.0/xpan/file?method=create";
export const list_url =
  "/rest/2.0/xpan/multimedia?method=listall&order=name&limit=10000";
export const meta_url = "/rest/2.0/xpan/file?app_id=778750&method=meta&path=";
export const meta_url2 =
  "/rest/2.0/xpan/multimedia?method=filemetas&dlink=1&fsids=";
export const pcs_url =
  "https://pcs.baidu.com/rest/2.0/pcs/file?app_id=778750&method=download";
export const UA =
  "netdisk;2.2.51.6;netdisk;10.0.63;PC;android-android;QTP/1.0.32.2"; // 自定义User-Agent
export const illegalPathPattern = /[\\":*?<>|]/; // 匹配路径中的非法字符
export var bdstoken = "";
export function setbdstoken(mybdstoken: string) {
  bdstoken = mybdstoken;
}
export const swalInstance = new Swalbase(
  new RapiduploadTask(),
  new GeneratebdlinkTask()
);
export function baiduErrno(errno: number) {
  switch (errno) {
    case -7:
      return '文件名错误, 不能含有字符\\":*?<>|';
    case -8:
      return "路径下存在同名文件";
    case 400:
      return "请求错误(请尝试使用最新版Chrome浏览器+更新油猴插件)";
    case 403:
      return "接口被限制(请等待24h再试)";
    case 404:
      return `秒传未生效(请参考<a href="${doc.shareDoc} ${linkStyle}">分享教程</a>)`;
    case 2:
      return "转存失败(尝试重登网盘账号/修改文件名或转存路径)";
    case 2333:
      return '文件名错误, 不能含有字符\\":*?<>|, 且不能是"/"(空文件名)';
    case -10:
      return "网盘容量已满";
    case 514:
      return "接口调用失败(请重试/弹出跨域请求窗口请选择允许)";
    case 1919:
      return `文件已被和谐(请参考<a href="${doc.shareDoc} ${linkStyle}">分享教程</a>)`;
    case 996:
      return `md5获取失败(请参考<a href="${doc.shareDoc} ${linkStyle}">分享教程</a>)`;
    case 500:
      return `服务器错误(请参考<a href="${doc.shareDoc} ${linkStyle}">分享教程</a>)`;
    case 503:
      return `服务器不可用(请参考<a href="${doc.shareDoc} ${linkStyle}">分享教程</a>)`;
    case 909:
      return "路径不存在";
    case 900:
      return "路径为文件夹, 不支持生成秒传";
    case 901:
      return "包含的文件数量超出限制(1w个)";
    default:
      return "未知错误";
  }
} // 自定义百度api返回errno的报错
