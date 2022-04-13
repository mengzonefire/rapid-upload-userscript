import { baiduErrno } from "@/baidu/common/const";
import { FileInfo, TAG } from "./const";
import DuParser from "./duParser";

/**
 * @description: 弹出一个文本提示框
 * @param {string} text
 */
export function showAlert(text: string): void {
  alert(`${TAG}:\n${text}`);
}

/**
 * @description: md5随机大小写
 * @param {string} string
 * @return {string}
 */
export function randomStringTransform(string: string): string {
  const tempString = [];
  for (let i of string) {
    if (!Math.round(Math.random())) {
      tempString.push(i.toLowerCase());
    } else {
      tempString.push(i.toUpperCase());
    }
  }
  return tempString.join("");
}

/**
 * @description: 解析文件信息, 返回转存结果列表html, 秒传链接, 失败文件个数, 成功的文件信息列表
 * @param {Array} fileInfoList
 */
export function parsefileInfo(fileInfoList: Array<FileInfo>) {
  let bdcode = "";
  let successInfo = "";
  let failedInfo = "";
  let failedCount = 0;
  let successList = [];
  fileInfoList.forEach((item) => {
    if (item.errno) {
      failedCount++;
      failedInfo += `<p>文件：${item.path}</p><p>失败原因：${baiduErrno(
        item.errno
      )}(#${item.errno})</p>`;
    } else {
      successInfo += `<p>文件：${item.path}</p>`;
      bdcode += `${item.md5}#${item.md5s}#${item.size}#${item.path}\n`;
      successList.push(item);
    }
  });
  if (failedInfo)
    failedInfo = `<details class="mzf_details"><summary><svg width="16" height="7"><polyline points="0,0 8,7 16,0"/></svg><b>失败文件列表(点击展开):</b></summary></details><div class="mzf_content">${failedInfo}</div>`;
  if (successInfo)
    successInfo = `<details class="mzf_details"><summary><svg width="16" height="7"><polyline points="0,0 8,7 16,0"/></svg><b>成功文件列表(点击展开):</b></summary></details><div class="mzf_content">${successInfo}</div>`;
  bdcode = bdcode.trim();
  return {
    htmlInfo:
      successInfo && failedInfo
        ? successInfo + "<p><br /></p>" + failedInfo
        : successInfo + failedInfo,
    failedCount: failedCount,
    bdcode: bdcode,
    successList: successList,
  };
}

/**
 * @description: 获取选择的文件列表(旧版界面)
 */
export function getSelectedFileListLegacy() {
  return unsafeWindow
    .require("system-core:context/context.js")
    .instanceForSystem.list.getSelected();
}

/**
 * @description: 获取选择的文件列表(新版界面)
 * 我从这里抄的, 谢谢你: https://greasyfork.org/zh-CN/scripts/436446
 */
export function getSelectedFileListNew() {
  return document.querySelector(".nd-main-list").__vue__.selectedList;
}

/**
 * @description: 将data键值对转换为query字符串
 * @param {any} data
 * @return {string} query string
 */
export function convertData(data: any): string {
  let query = "";
  for (let key in data) query += `&${key}=${encodeURIComponent(data[key])}`;
  return query;
}

export async function parseClipboard() {
  try {
    let bdlink = await navigator.clipboard.readText();
    if (!DuParser.parse(bdlink).length) return "";
    return bdlink;
  } catch (error) {
    showAlert('使用 "监听剪贴板" 功能需要允许剪贴板权限!');
    return "";
  }
}
