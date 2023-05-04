/*
 * @Author: mengzonefire
 * @Date: 2021-08-25 01:30:29
 * @LastEditTime: 2023-05-04 18:09:10
 * @LastEditors: mengzonefire
 * @Description: 百度网盘 秒传转存任务实现
 */

import ajax from "@/common/ajax";
import { convertData, suffixChange } from "@/common/utils";
import {
  retryMax_apiV2,
  create_url,
  getBdstoken,
  illegalPathPattern,
  testPath,
} from "./const";
export default class RapiduploadTask {
  savePath: string;
  isDefaultPath: boolean;
  fileInfoList: Array<FileInfo>;
  bdstoken: string;
  onFinish: (fileInfoList: Array<FileInfo>) => void;
  onProcess: (i: number, fileInfoList: Array<FileInfo>) => void;

  reset(): void {
    this.bdstoken = getBdstoken();
    console.log(`bdstoken状态: ${this.bdstoken ? "获取成功" : "获取失败"}`); // debug
    this.fileInfoList = [];
    this.savePath = "";
    this.isDefaultPath = false;
    this.onFinish = () => {};
    this.onProcess = () => {};
  }

  start(): void {
    this.saveFileV2(0);
  }

  /**
   * @description: 转存秒传 接口2
   * @param {number} i
   */
  saveFileV2(i: number): void {
    if (i >= this.fileInfoList.length) {
      this.onFinish(this.fileInfoList);
      return;
    }
    this.onProcess(i, this.fileInfoList);
    let file = this.fileInfoList[i];
    // 文件名为空
    if (file.path === "/") {
      file.errno = -7;
      this.saveFileV2(i + 1);
      return;
    }
    let onFailed = (statusCode: number) => {
      file.errno = statusCode;
      this.saveFileV2(i + 1);
    };
    createFileV2.call(
      this,
      file,
      (data: any) => {
        data = data.response;
        file.errno = 2 === data.errno ? 114 : data.errno;
        file.errno = 31190 === file.errno ? 404 : file.errno;
        this.saveFileV2(i + 1);
      },
      onFailed
    );
    // precreateFileV2.call(
    //   this,
    //   file,
    //   (data: any) => {
    //     data = data.response;
    //     if (0 === data.errno) {
    //       if (0 === data.block_list.length) {
    //         this.createFileV2(
    //           file,
    //           (data) => {
    //             data = data.response;
    //             file.errno = 2 === data.errno ? 114 : data.errno;
    //             file.errno = 31190 === file.errno ? 404 : file.errno;
    //             this.saveFileV2(i + 1);
    //           },
    //           onFailed
    //         );
    //       } else {
    //         file.errno = 404;
    //         this.saveFileV2(i + 1);
    //       }
    //     } else {
    //       file.errno = data.errno;
    //       this.saveFileV2(i + 1);
    //     }
    //   },
    //   onFailed
    // );
  }
}

// 此接口测试结果如下: 错误md5->返回"errno": 31190, 正确md5+错误size->返回"errno": 2
// 此外, 即使md5和size均正确, 连续请求时依旧有小概率返回"errno": 2, 故建议加入retry策略
export function createFileV2(
  file: FileInfo,
  onResponsed: (data: any) => void,
  onFailed: (statusCode: number) => void,
  retry: number = 0,
  isGen: boolean = false
): void {
  ajax(
    {
      url: `${create_url}${this.bdstoken ? "&bdstoken=" + this.bdstoken : ""}`, // bdstoken参数不能放在data里, 否则无效
      method: "POST",
      responseType: "json",
      data: convertData({
        block_list: JSON.stringify([
          isGen ? file.md5.toUpperCase() : file.md5.toLowerCase(),
        ]),
        path: isGen
          ? testPath
          : this.savePath + file.path.replace(illegalPathPattern, "_"),
        size: file.size,
        isdir: 0,
        rtype: isGen ? 3 : 0, // rtype=3覆盖文件, rtype=0则返回报错, 不覆盖文件, 默认为rtype=1 (自动重命名, 1和2是两种不同的重命名策略)
        is_revision: isGen ? 1 : 0, // is_revision=0时, rtype=3会不生效 (会依旧返回重名报错), is_revision=1时则等同rtype=3效果
      }),
    },
    (data) => {
      // console.log(data.response); // debug
      if (31039 === data.response.errno && 31039 != file.errno && !isGen) {
        file.errno = 31039;
        file.path = suffixChange(file.path);
        createFileV2.call(this, file, onResponsed, onFailed, retry, isGen);
      } else if (2 === data.response.errno && retry < retryMax_apiV2) {
        // console.log(`转存接口错误, 重试${retry + 1}次: ${file.path}`); // debug
        createFileV2.call(this, file, onResponsed, onFailed, ++retry, isGen);
      } else onResponsed(data);
    },
    onFailed
  );
}

// 此接口测试结果如下: 错误md5->返回block_list: [0], 正确md5+正确/错误size->返回block_list: []
// 23.4.24测试发现此接口也不稳定, 有效md5也有20-30%概率返回block_list: [0], 建议加入retry策略
// 23.4.25测试发现此接口反复横跳, 今天又全部返回block_list: [0], 垃圾, 我直接弃用
// export function precreateFileV2(
//   file: FileInfo,
//   onResponsed: (data: any) => void,
//   onFailed: (statusCode: number) => void,
//   retry: number = 0
// ): void {
//   ajax(
//     {
//       url: `${precreate_url}${this.bdstoken && "&bdstoken=" + this.bdstoken}`, // bdstoken参数不能放在data里, 否则无效
//       method: "POST",
//       responseType: "json",
//       data: convertData({
//         block_list: JSON.stringify([file.md5.toLowerCase()]),
//         path: this.savePath + file.path.replace(illegalPathPattern, "_"),
//         size: file.size,
//         isdir: 0,
//         autoinit: 1,
//       }),
//     },
//     (data) => {
//       let _data = data.response;
//       if (0 === _data.errno) {
//         if (0 != _data.block_list.length && retry < retryMax_apiV2)
//           precreateFileV2.call(this, file, onResponsed, onFailed, ++retry);
//         else onResponsed(data);
//       } else onResponsed(data);
//     },
//     onFailed
//   );
// }
