import { baiduErrno, bdstoken_url, setbdstoken } from "@/baidu/common/const";
import ajax from "./ajax";
import { FileInfo, TAG } from "./const";

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
  let failedInfo = "";
  let failedCount = 0;
  let successList = [];
  fileInfoList.forEach(function (item) {
    if (item.errno) {
      failedCount++;
      failedInfo += `<p>文件：${item.path}</p><p>失败原因：${baiduErrno(
        item.errno
      )}(#${item.errno})</p>`;
    } else {
      bdcode += `${item.md5}#${item.md5s}#${item.size}#${item.path}\n`;
      successList.push(item);
    }
  });
  if (failedInfo) failedInfo = "<p>失败文件列表:</p>" + failedInfo;
  bdcode = bdcode.trim();
  return {
    htmlInfo: failedInfo,
    failedCount: failedCount,
    bdcode: bdcode,
    successList: successList,
  };
}

/**
 * @description: 获取bdstoken
 */
export function getbdstoken() {
  ajax(
    {
      url: bdstoken_url,
      type: "POST",
      dataType: "json",
      data: {
        fields: JSON.stringify(["bdstoken"]),
      },
    },
    (data) => {
      if (!data.errno && data.result.bdstoken) setbdstoken(data.result.bdstoken);
      else
        showAlert(
          `获取bdstoken失败(${data.errno}), 可能导致转存失败(#2), 请尝试重新登录`
        );
    },
    (statusCode) => {
      showAlert(
        `获取bdstoken失败(${statusCode}), 可能导致转存失败(#2), 请尝试重新登录`
      );
    }
  );
}

/**
 * @description: 获取选择的文件列表(仅旧版界面可用)
 */
export function getSelectedFileList() {
  return unsafeWindow
    .require("system-core:context/context.js")
    .instanceForSystem.list.getSelected();
}
