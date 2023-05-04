/*
 * @Author: mengzonefire
 * @Date: 2022-10-20 10:36:43
 * @LastEditTime: 2023-05-04 12:43:06
 * @LastEditors: mengzonefire
 * @Description: 存放各种全局常量对象
 */

import { doc, doc2, linkStyle } from "@/common/const";
import Swalbase from "@/common/swalBase";
import GeneratebdlinkTask from "./generatebdlinkTask";
import RapiduploadTask from "./rapiduploadTask";

const host = location.host;
export const listLimit = 10000;
export const syncPathPrefix = "/_pcs_.workspace";
export const retryMax_apiV2 = 4; // v2转存接口的最大重试次数
export const create_url = `https://${host}/api/create`;
export const precreate_url = `https://${host}/api/precreate`;
export const list_url = `https://${host}/rest/2.0/xpan/multimedia?method=listall&order=name&limit=${listLimit}&path=`;
export const meta_url = `https://pcs.baidu.com/rest/2.0/pcs/file?app_id=778750&method=meta&path=`;
export const meta_url2 = `https://${host}/api/filemetas?dlink=1&fsids=`;
export const tpl_url = `https://${host}/share/tplconfig?fields=sign,timestamp&channel=chunlei&web=1&app_id=250528&clienttype=0`;
export const sharedownload_url = `https://${host}/api/sharedownload?channel=chunlei&clienttype=12&web=1&app_id=250528`;
export const sharelist_url = `https://${host}/share/list?showempty=0&num=${listLimit}&channel=chunlei&web=1&app_id=250528&clienttype=0`;
export const syncdownload_url = `https://${host}/api/download`;
export const testPath = "/apps/生成秒传测试文件.mengzonefire";
export const pcs_url =
  "https://pcs.baidu.com/rest/2.0/pcs/file?app_id=778750&method=download";
export const illegalPathPattern = /[\\":*?<>|]/g; // 匹配路径中的非法字符
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

export function baiduErrno(errno: number) {
  switch (errno) {
    case 31045:
    case -6:
      return `认证失败(请看文档:<a href="${doc.shareDoc}#认证失败-6" ${linkStyle}>载点1</a> <a href="${doc2.shareDoc}#认证失败-6" ${linkStyle}>载点2</a>)`;
    case -7:
      return `转存路径含有非法字符(请看文档:<a href="${doc.shareDoc}#转存路径含有非法字符-7" ${linkStyle}>载点1</a> <a href="${doc2.shareDoc}#转存路径含有非法字符-7" ${linkStyle}>载点2</a>)`;
    case -8:
      return "路径下存在同名文件";
    case -9:
      return "验证已过期, 请刷新页面";
    case 400:
      return `请求错误(请看文档:<a href="${doc.shareDoc}#请求错误-400" ${linkStyle}>载点1</a> <a href="${doc2.shareDoc}#请求错误-400" ${linkStyle}>载点2</a>)`;
    case 9019:
    case 403:
      return `接口限制访问(请看文档:<a href="${doc.shareDoc}#接口限制访问-403" ${linkStyle}>载点1</a> <a href="${doc2.shareDoc}#接口限制访问-403" ${linkStyle}>载点2</a>)`;
    case 404:
      return `秒传未生效(请看文档:<a href="${doc.shareDoc}#秒传未生效-404" ${linkStyle}>载点1</a> <a href="${doc2.shareDoc}#秒传未生效-404" ${linkStyle}>载点2</a>)`;
    case 114:
      return `转存失败-v2接口(请看文档:<a href="${doc.shareDoc}#转存失败-v2接口-114" ${linkStyle}>载点1</a> <a href="${doc2.shareDoc}#转存失败-v2接口-114" ${linkStyle}>载点2</a>)`;
    case 514:
      return `请求失败(请看文档:<a href="${doc.shareDoc}#请求失败-514" ${linkStyle}>载点1</a> <a href="${doc2.shareDoc}#请求失败-514" ${linkStyle}>载点2</a>)`;
    case 1919:
      return `文件已被和谐(请看文档:<a href="${doc.shareDoc}#文件已被和谐-1919" ${linkStyle}>载点1</a> <a href="${doc2.shareDoc}#文件已被和谐-1919" ${linkStyle}>载点2</a>)`;
    case 996:
      return `md5获取失败(请看文档:<a href="${doc.shareDoc}#md5-获取失败-996" ${linkStyle}>载点1</a> <a href="${doc2.shareDoc}#md5-获取失败-996" ${linkStyle}>载点2</a>)`;
    case 2:
      return `转存失败-v1接口(请看文档:<a href="${doc.shareDoc}#转存失败-v1接口-2" ${linkStyle}>载点1</a> <a href="${doc2.shareDoc}#转存失败-v1接口-2" ${linkStyle}>载点2</a>)`;
    case -10:
      return "网盘容量已满";
    case 500:
    case 502:
    case 503:
      return `服务器错误(请看文档:<a href="${doc.shareDoc}#服务器错误-50x" ${linkStyle}>载点1</a> <a href="${doc2.shareDoc}#服务器错误-50x" ${linkStyle}>载点2</a>)`;
    case 31066:
    case 909:
      return "路径不存在/云端文件已损坏";
    case 900:
      return "路径为文件夹, 不支持生成秒传";
    case 31039:
      return `服务器错误(请看文档:<a href="${doc.shareDoc}#服务器错误-31039" ${linkStyle}>载点1</a> <a href="${doc2.shareDoc}#服务器错误-31039" ${linkStyle}>载点2</a>)`;
    case 110:
      return "请先登录百度账号";
    case 9013:
      return "账号被限制, 尝试 更换账号 或 等待一段时间再重试";
    default:
      return `未知错误(请看文档:<a href="${doc.shareDoc}#未知错误" ${linkStyle}>载点1</a> <a href="${doc2.shareDoc}#未知错误" ${linkStyle}>载点2</a>)`;
  }
} // 自定义百度api返回errno的报错
