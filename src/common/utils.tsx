/*
 * @Author: mengzonefire
 * @Date: 2021-08-22 04:01:11
 * @LastEditTime: 2023-03-10 19:47:20
 * @LastEditors: mengzonefire
 * @Description: 存放工具函数
 */

import { baiduErrno, syncPathPrefix } from "@/baidu/common/const";
import {
  appError,
  copyFailBranchList,
  copyFailList,
  copySuccessList,
  TAG,
} from "./const";
import { DuParser } from "./duParser";

/**
 * @description: 弹出一个文本提示框
 * @param {string} text
 */
export function showAlert(text: string): void {
  alert(`${TAG}:\n${text}`);
}

/**
 * @description: 解析文件信息, 返回转存结果列表html, 秒传链接, 失败文件个数, 成功的文件信息列表, 失败的文件信息列表
 * @param {Array} fileInfoList 文件信息数据列表
 */
export function parsefileInfo(fileInfoList: Array<FileInfo>) {
  let bdcode = "";
  let successInfo = "";
  let failedInfo = "";
  let successList = [];
  let failList = [];
  let failCodeDic = {};
  fileInfoList.forEach((item) => {
    item.path = item.path.replace(syncPathPrefix, ""); // 移除同步页前缀
    // 成功文件
    if (0 === item.errno || undefined === item.errno) {
      successInfo += `<p>${item.path}</p>`;
      bdcode += `${item.md5}${item.md5s && "#" + item.md5s}#${item.size}#${
        item.path
      }\n`;
      successList.push(item);
    }
    // 失败文件
    else {
      failList.push(item);
      if (String(item.errno) in failCodeDic)
        failCodeDic[String(item.errno)].push(item);
      else failCodeDic[String(item.errno)] = [item];
    }
  });
  for (let failCode in failCodeDic) {
    let failBranchInfo = "";
    let failBranchList = failCodeDic[failCode];
    failBranchList.forEach((item: any) => {
      failBranchInfo += `<p>${item.path}</p>`;
    });
    failedInfo += `<details class="mzf_details mzf_details_branch"><summary><svg class="mzf_arrow" width="16" height="7"><polyline points="0,0 8,7 16,0"/></svg><b>${baiduErrno(
      Number(failCode)
    )}(#${Number(
      failCode
    )}):</b>${copyFailBranchList}</summary></details><div class="mzf_content">${failBranchInfo}</div>`;
  }
  if (failedInfo)
    failedInfo = `<details class="mzf_details"><summary><svg class="mzf_arrow" width="16" height="7"><polyline points="0,0 8,7 16,0"/></svg><b>失败文件列表(点这里看失败原因):</b>${copyFailList}</summary></details><div class="mzf_content">${failedInfo}</div>`;
  if (successInfo)
    successInfo = `<details class="mzf_details"><summary><svg class="mzf_arrow" width="16" height="7"><polyline points="0,0 8,7 16,0"/></svg><b>成功文件列表(点击展开):</b>${copySuccessList}</summary></details><div class="mzf_content">${successInfo}</div>`;
  bdcode = bdcode.trim();
  return {
    htmlInfo:
      successInfo && failedInfo
        ? successInfo + "<p><br /></p>" + failedInfo
        : successInfo + failedInfo,
    bdcode: bdcode,
    successList: successList,
    failList: failList,
  };
}

/**
 * @description: 获取分享页的文件列表
 */
export function getShareFileList() {
  const bdListInstance = unsafeWindow.require("system-core:context/context.js")
    .instanceForSystem.list;
  let selectList = bdListInstance.getSelected();
  if (!selectList.length) selectList = bdListInstance.getCurrentList();
  return selectList;
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
  return document.querySelector(".nd-main-list, .nd-new-main-list").__vue__
    .selectedList;
}

/**
 * @description: 将data键值对转换为query字符串
 * @param {any} data
 * @return {string} query
 */
export function convertData(data: any): string {
  let query = "";
  for (let key in data) query += `&${key}=${encodeURIComponent(data[key])}`;
  return query;
}

/**
 * @description: 从剪贴板获取字符串数据
 * @return {string} bdlink
 */
export async function parseClipboard(): Promise<string> {
  try {
    let bdlink = await navigator.clipboard.readText();
    if (!DuParser.parse(bdlink).length) return "";
    return bdlink;
  } catch (error) {
    showAlert(appError.ClipboardPremissionErr);
    return "";
  }
}

/**
 * @description: 解密已加密的md5
 * @param {string} md5 (加密)
 * @return {string} md5 (解密)
 */
export function decryptMd5(md5: string): string {
  if (
    !(
      (parseInt(md5[9]) >= 0 && parseInt(md5[9]) <= 9) ||
      (md5[9] >= "a" && md5[9] <= "f")
    )
  )
    return decrypt(md5);
  else return md5;

  function decrypt(encryptMd5: string): string {
    let key = (encryptMd5[9].charCodeAt(0) - "g".charCodeAt(0)).toString(16);
    let key2 = encryptMd5.slice(0, 9) + key + encryptMd5.slice(10);
    let key3 = "";
    for (let a = 0; a < key2.length; a++)
      key3 += (parseInt(key2[a], 16) ^ (15 & a)).toString(16);
    let md5 =
      key3.slice(8, 16) +
      key3.slice(0, 8) +
      key3.slice(24, 32) +
      key3.slice(16, 24);
    return md5;
  }
}

/**
 * @description: 用于解决#31039报错
 * @param {string} path 原文件路径
 * @return {string} 修改文件后缀的路径
 */
export function suffixChange(path: string): string {
  let suffix = path.substring(path.lastIndexOf(".") + 1); // 获取后缀
  return path.substring(0, path.length - suffix.length) + reverseStr(suffix);
}

/**
 * @description: 逆转字符串大小写
 * @param {string} str 输入字符串
 * @return {string} 处理后的字符串
 */
function reverseStr(str: string): string {
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    let reverseChar: string;
    if (str.charAt(i) >= "a") reverseChar = str.charAt(i).toUpperCase();
    else if (str.charAt(i) >= "A") reverseChar = str.charAt(i).toLowerCase();
    else reverseChar = str.charAt(i);
    newStr += reverseChar;
  }
  return newStr;
}

// 下方四个function用于分享页生成秒传
// 依旧是从这里抄的: https://greasyfork.org/zh-CN/scripts/436446
function getCookie(name: string) {
  let arr = document.cookie.replace(/\s/g, "").split(";");
  for (let i = 0, l = arr.length; i < l; i++) {
    let tempArr = arr[i].split("=");
    if (tempArr[0] === name) {
      return decodeURIComponent(tempArr[1]);
    }
  }
  return "";
}

export function getLogid() {
  let ut = unsafeWindow.require("system-core:context/context.js")
    .instanceForSystem.tools.baseService;
  return ut.base64Encode(getCookie("BAIDUID"));
}

export function getSurl() {
  let reg = /(s\/|surl=)([a-zA-Z0-9_-]+)/;
  if (reg.test(location.href)) {
    return location.href.match(reg)[2];
  }
  return "";
}

export function getExtra() {
  let seKey = decodeURIComponent(getCookie("BDCLND"));
  return "{" + '"sekey":"' + seKey + '"' + "}";
}
